const Student = require('../models/Student');
const { logAction } = require('../middleware/auditLogger');

// @desc    Get all students (with filtering, search & pagination)
// @route   GET /api/v1/students and /api/students
// @access  Public / Authenticated
exports.getStudents = async (req, res, next) => {
  try {
    const { className, class: cClass, section, search, parentEmail, page, limit } = req.query;

    const query = {};

    const targetClass = className || cClass;
    if (targetClass && targetClass !== 'All') {
      query.class = targetClass;
    }

    if (section) {
      query.section = section;
    }

    if (parentEmail) {
      query.parentEmail = parentEmail.toLowerCase().trim();
    }

    if (search) {
      const regex = new RegExp(search.trim(), 'i');
      query.$or = [{ name: regex }, { rollNo: regex }, { studentId: regex }, { parentName: regex }];
    }

    // Role-based scoping for parents if authenticated
    if (req.user && req.user.role === 'parent' && req.user.linkedStudentIds && req.user.linkedStudentIds.length > 0) {
      query.$or = [
        { studentId: { $in: req.user.linkedStudentIds } },
        { parentEmail: req.user.email.toLowerCase() }
      ];
    }

    // Coordinator restriction to assigned classes
    if (req.user && req.user.role === 'coordinator' && req.user.assignedClass) {
      const assigned = req.user.assignedClass.split(',').map((c) => c.trim());
      if (assigned.length > 0 && !targetClass) {
        query.class = { $in: assigned };
      }
    }

    let studentsQuery = Student.find(query).sort({ rollNo: 1, name: 1 });

    if (page && limit) {
      const p = parseInt(page, 10) || 1;
      const l = parseInt(limit, 10) || 20;
      studentsQuery = studentsQuery.skip((p - 1) * l).limit(l);
    }

    const students = await studentsQuery;
    const total = await Student.countDocuments(query);

    res.status(200).json({
      success: true,
      count: students.length,
      total,
      data: students
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Get single student by studentId or _id
// @route   GET /api/v1/students/:id
// @access  Public / Authenticated
exports.getStudentById = async (req, res, next) => {
  try {
    const { id } = req.params;

    let student = null;
    if (id.match(/^[0-9a-fA-F]{24}$/)) {
      student = await Student.findById(id);
    }
    if (!student) {
      student = await Student.findOne({ studentId: id });
    }

    if (!student) {
      return res.status(404).json({
        success: false,
        message: `Student with identifier '${id}' was not found.`
      });
    }

    res.status(200).json({
      success: true,
      data: student
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Create a new student
// @route   POST /api/v1/students
// @access  Authenticated (Teacher / Admin)
exports.createStudent = async (req, res, next) => {
  try {
    const studentData = req.body;

    if (!studentData.name) {
      return res.status(400).json({
        success: false,
        message: 'Student name is required.'
      });
    }

    // Auto-generate studentId if not provided
    if (!studentData.studentId) {
      const count = await Student.countDocuments();
      studentData.studentId = `ET-${new Date().getFullYear()}-${400 + count + 1}`;
    }

    // Check for duplicate studentId
    const existing = await Student.findOne({ studentId: studentData.studentId });
    if (existing) {
      return res.status(409).json({
        success: false,
        message: `A student with ID '${studentData.studentId}' already exists.`
      });
    }

    const student = await Student.create(studentData);
    await logAction(req, 'STUDENT_CREATED', { studentId: student.studentId, name: student.name });

    res.status(201).json({
      success: true,
      message: `Student ${student.name} created successfully.`,
      student,
      data: student
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Update student record, marks, or remarks
// @route   PUT /api/v1/students/:id
// @access  Authenticated (Teacher / Admin)
exports.updateStudent = async (req, res, next) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    let student = null;
    if (id.match(/^[0-9a-fA-F]{24}$/)) {
      student = await Student.findById(id);
    }
    if (!student) {
      student = await Student.findOne({ studentId: id });
    }

    if (!student) {
      return res.status(404).json({
        success: false,
        message: `Student '${id}' not found.`
      });
    }

    // Update allowed fields
    const allowed = ['name', 'rollNo', 'class', 'section', 'parentName', 'parentEmail', 'attendance', 'remarks', 'avatar'];
    allowed.forEach((field) => {
      if (updates[field] !== undefined) {
        student[field] = updates[field];
      }
    });

    // Update subjects if passed
    if (updates.subjects) {
      Object.keys(updates.subjects).forEach((subj) => {
        student.subjects.set(subj, updates.subjects[subj]);
      });
    }

    await student.save();
    await logAction(req, 'STUDENT_UPDATED', { studentId: student.studentId, name: student.name });

    res.status(200).json({
      success: true,
      message: `Student ${student.name} updated successfully.`,
      data: student
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Delete a student record
// @route   DELETE /api/v1/students/:id
// @access  Authenticated (Admin / Teacher)
exports.deleteStudent = async (req, res, next) => {
  try {
    const { id } = req.params;

    let student = null;
    if (id.match(/^[0-9a-fA-F]{24}$/)) {
      student = await Student.findById(id);
    }
    if (!student) {
      student = await Student.findOne({ studentId: id });
    }

    if (!student) {
      return res.status(404).json({
        success: false,
        message: `Student '${id}' not found.`
      });
    }

    await student.deleteOne();
    await logAction(req, 'STUDENT_DELETED', { studentId: student.studentId, name: student.name });

    res.status(200).json({
      success: true,
      message: `Student record '${student.name}' (${student.studentId}) deleted successfully.`
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Bulk import students (from Excel / CSV)
// @route   POST /api/v1/students/bulk
// @access  Authenticated (Teacher / Admin)
exports.bulkImportStudents = async (req, res, next) => {
  try {
    const studentsList = Array.isArray(req.body) ? req.body : req.body.students;

    if (!Array.isArray(studentsList) || studentsList.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'Please provide a valid non-empty array of students for bulk import.'
      });
    }

    const imported = [];
    let count = await Student.countDocuments();

    for (let i = 0; i < studentsList.length; i++) {
      const item = studentsList[i];
      if (!item.name) continue;

      if (!item.studentId) {
        count++;
        item.studentId = `ET-${new Date().getFullYear()}-${400 + count}`;
      }

      const updated = await Student.findOneAndUpdate(
        { studentId: item.studentId },
        { $set: item },
        { upsert: true, new: true, runValidators: true }
      );
      imported.push(updated);
    }

    await logAction(req, 'BULK_STUDENT_IMPORT', { count: imported.length });

    res.status(200).json({
      success: true,
      message: `Successfully processed ${imported.length} student records.`,
      count: imported.length,
      data: imported
    });
  } catch (err) {
    next(err);
  }
};
