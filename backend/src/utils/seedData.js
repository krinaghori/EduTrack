const User = require('../models/User');
const Student = require('../models/Student');
const Advice = require('../models/Advice');
const Doubt = require('../models/Doubt');
const ThresholdSetting = require('../models/ThresholdSetting');

const runSeed = async () => {
  console.log('🌱 Starting database seed operation...');

  // 1. Thresholds
  await ThresholdSetting.findOneAndUpdate(
    { key: 'global_thresholds' },
    { excellent: 75, average: 40 },
    { upsert: true, new: true }
  );

  // 2. Demo Users
  const users = [
    {
      name: 'Mrs. Anjali Sharma',
      email: 'teacher@edutrack.edu',
      password: 'teach123',
      role: 'teacher',
      assignedClass: 'Class 4'
    },
    {
      name: 'Dr. Vikram Joshi',
      email: 'principal@edutrack.edu',
      password: 'admin123',
      role: 'principal',
      assignedClass: 'All'
    },
    {
      name: 'Shri R.K. Mehta (BRC Coordinator)',
      email: 'brc@edutrack.edu',
      password: 'brc123',
      role: 'coordinator',
      assignedClass: 'Class 4, Class 5, Class 6'
    },
    {
      name: 'Kishorbhai Patel',
      email: 'parent@edutrack.edu',
      password: 'parent123',
      role: 'parent',
      linkedStudentIds: ['ET-2026-401', 'ET-2026-501']
    },
    {
      name: process.env.ADMIN_INITIAL_NAME || 'EduTrack System Administrator',
      email: (process.env.ADMIN_INITIAL_EMAIL || 'admin@edutrack.edu').toLowerCase(),
      password: process.env.ADMIN_INITIAL_PASSWORD || 'AdminSecurePass@2026',
      role: 'admin'
    }
  ];

  for (const u of users) {
    const existing = await User.findOne({ email: u.email });
    if (!existing) {
      await User.create(u);
      console.log(`  👤 Created user: ${u.email} (${u.role})`);
    } else {
      // update password/role to guarantee login
      existing.name = u.name;
      existing.password = u.password;
      existing.role = u.role;
      existing.assignedClass = u.assignedClass;
      existing.linkedStudentIds = u.linkedStudentIds || [];
      await existing.save();
    }
  }

  // 3. Students Cohort
  const students = [
    {
      studentId: 'ET-2026-401',
      name: 'Aarav Patel',
      class: 'Class 4',
      section: 'A',
      rollNo: '01',
      parentName: 'Kishorbhai Patel',
      parentEmail: 'parent@edutrack.edu',
      attendance: 94,
      avatar: 'https://images.unsplash.com/photo-1544717305-2782549b5136?w=150&auto=format&fit=crop&q=80',
      remarks: 'Good curiosity in class activities. Extra daily practice required in multiplication tables.',
      subjects: {
        Mathematics: {
          total: 100,
          marks: 58,
          topics: {
            'Fractions & Decimals': 65,
            'Multiplication & Tables': 38,
            'Division & Remainders': 42,
            'Geometry & Shapes': 78,
            'Word Problems & Logic': 67
          }
        },
        English: {
          total: 100,
          marks: 72,
          topics: {
            'Grammar & Tenses': 68,
            'Vocabulary & Synonyms': 80,
            'Reading Comprehension': 75,
            'Spelling & Phonics': 70,
            'Sentence Formation': 67
          }
        },
        Gujarati: {
          total: 100,
          marks: 64,
          topics: {
            'Kakko & Barakhadi': 80,
            'Matra Identification & Usage': 48,
            'Sentence Reading (વાક્ય વાચન)': 68,
            'Vocabulary & Opposites (શબ્દ ભંડોળ)': 62,
            'Paragraph Comprehension (પરિચ્છેદ સમજ)': 62
          }
        },
        Hindi: {
          total: 100,
          marks: 66,
          topics: {
            'Varnamala (स्वर एवं व्यंजन)': 78,
            'Matra Application (मात्रा ज्ञान)': 52,
            'Word Formation (शब्द निर्माण)': 70,
            'Poem Recitation & Meaning': 75,
            'Sentence Completion (वाक्य पूर्ति)': 55
          }
        },
        'EVS (Environmental Studies)': {
          total: 100,
          marks: 84,
          topics: {
            'Plant Parts & Photosynthesis': 88,
            'Water Cycle & Conservation': 82,
            'Living vs Non-Living': 90,
            'Community Helpers & Roles': 85,
            'Food, Nutrition & Healthy Habits': 75
          }
        }
      }
    },
    {
      studentId: 'ET-2026-403',
      name: 'Jayesh Parmar',
      class: 'Class 4',
      section: 'A',
      rollNo: '03',
      parentName: 'Sureshbhai Parmar',
      parentEmail: 'suresh.parmar@example.com',
      attendance: 88,
      avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&auto=format&fit=crop&q=80',
      remarks: 'Good effort in physical and oral activities. Struggles with division and sentence formation.',
      subjects: {
        Mathematics: {
          total: 100,
          marks: 52,
          topics: {
            'Fractions & Decimals': 45,
            'Multiplication & Tables': 50,
            'Division & Remainders': 32,
            'Geometry & Shapes': 75,
            'Word Problems & Logic': 58
          }
        },
        English: {
          total: 100,
          marks: 58,
          topics: {
            'Grammar & Tenses': 48,
            'Vocabulary & Synonyms': 65,
            'Reading Comprehension': 55,
            'Spelling & Phonics': 70,
            'Sentence Formation': 52
          }
        },
        Gujarati: {
          total: 100,
          marks: 68,
          topics: {
            'Kakko & Barakhadi': 82,
            'Matra Identification & Usage': 64,
            'Sentence Reading (વાક્ય વાચન)': 72,
            'Vocabulary & Opposites (શબ્દ ભંડોળ)': 65,
            'Paragraph Comprehension (પરિચ્છેદ સમજ)': 57
          }
        },
        Hindi: {
          total: 100,
          marks: 62,
          topics: {
            'Varnamala (स्वर एवं व्यंजन)': 75,
            'Matra Application (मात्रा ज्ञान)': 54,
            'Word Formation (शब्द निर्माण)': 66,
            'Poem Recitation & Meaning': 70,
            'Sentence Completion (वाक्य पूर्ति)': 45
          }
        },
        'EVS (Environmental Studies)': {
          total: 100,
          marks: 70,
          topics: {
            'Plant Parts & Photosynthesis': 74,
            'Water Cycle & Conservation': 68,
            'Living vs Non-Living': 78,
            'Community Helpers & Roles': 72,
            'Food, Nutrition & Healthy Habits': 58
          }
        }
      }
    },
    {
      studentId: 'ET-2026-404',
      name: 'Meera Solanki',
      class: 'Class 4',
      section: 'A',
      rollNo: '04',
      parentName: 'Dineshbhai Solanki',
      parentEmail: 'dinesh.solanki@example.com',
      attendance: 92,
      avatar: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=150&auto=format&fit=crop&q=80',
      remarks: 'Progressing well. Shows high interest in Environmental Studies and creative writing.',
      subjects: {
        Mathematics: {
          total: 100,
          marks: 74,
          topics: {
            'Fractions & Decimals': 72,
            'Multiplication & Tables': 78,
            'Division & Remainders': 68,
            'Geometry & Shapes': 82,
            'Word Problems & Logic': 70
          }
        },
        English: {
          total: 100,
          marks: 78,
          topics: {
            'Grammar & Tenses': 74,
            'Vocabulary & Synonyms': 82,
            'Reading Comprehension': 78,
            'Spelling & Phonics': 80,
            'Sentence Formation': 76
          }
        },
        Gujarati: {
          total: 100,
          marks: 72,
          topics: {
            'Kakko & Barakhadi': 84,
            'Matra Identification & Usage': 70,
            'Sentence Reading (વાક્ય વાચન)': 75,
            'Vocabulary & Opposites (શબ્દ ભંડોળ)': 68,
            'Paragraph Comprehension (પરિચ્છેદ સમજ)': 63
          }
        },
        Hindi: {
          total: 100,
          marks: 70,
          topics: {
            'Varnamala (स्वर एवं व्यंजन)': 80,
            'Matra Application (मात्रा ज्ञान)': 65,
            'Word Formation (शब्द निर्माण)': 72,
            'Poem Recitation & Meaning': 75,
            'Sentence Completion (वाक्य पूर्ति)': 58
          }
        },
        'EVS (Environmental Studies)': {
          total: 100,
          marks: 86,
          topics: {
            'Plant Parts & Photosynthesis': 90,
            'Water Cycle & Conservation': 84,
            'Living vs Non-Living': 88,
            'Community Helpers & Roles': 88,
            'Food, Nutrition & Healthy Habits': 80
          }
        }
      }
    },
    {
      studentId: 'ET-2026-405',
      name: 'Rohan Vaghela',
      class: 'Class 4',
      section: 'A',
      rollNo: '05',
      parentName: 'Bharatbhai Vaghela',
      parentEmail: 'bharat.vaghela@example.com',
      attendance: 84,
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
      remarks: 'Urgent remedial attention needed in foundational numeracy and Hindi matras.',
      subjects: {
        Mathematics: {
          total: 100,
          marks: 36,
          topics: {
            'Fractions & Decimals': 30,
            'Multiplication & Tables': 28,
            'Division & Remainders': 32,
            'Geometry & Shapes': 52,
            'Word Problems & Logic': 38
          }
        },
        English: {
          total: 100,
          marks: 52,
          topics: {
            'Grammar & Tenses': 42,
            'Vocabulary & Synonyms': 60,
            'Reading Comprehension': 48,
            'Spelling & Phonics': 56,
            'Sentence Formation': 54
          }
        },
        Gujarati: {
          total: 100,
          marks: 48,
          topics: {
            'Kakko & Barakhadi': 62,
            'Matra Identification & Usage': 38,
            'Sentence Reading (વાક્ય વાચન)': 50,
            'Vocabulary & Opposites (શબ્દ ભંડોળ)': 48,
            'Paragraph Comprehension (પરિચ્છેદ સમજ)': 42
          }
        },
        Hindi: {
          total: 100,
          marks: 38,
          topics: {
            'Varnamala (स्वर एवं व्यंजन)': 55,
            'Matra Application (मात्रा ज्ञान)': 28,
            'Word Formation (शब्द निर्माण)': 34,
            'Poem Recitation & Meaning': 45,
            'Sentence Completion (वाक्य पूर्ति)': 28
          }
        },
        'EVS (Environmental Studies)': {
          total: 100,
          marks: 62,
          topics: {
            'Plant Parts & Photosynthesis': 65,
            'Water Cycle & Conservation': 58,
            'Living vs Non-Living': 66,
            'Community Helpers & Roles': 64,
            'Food, Nutrition & Healthy Habits': 57
          }
        }
      }
    },
    {
      studentId: 'ET-2026-406',
      name: 'Priya Sharma',
      class: 'Class 4',
      section: 'A',
      rollNo: '06',
      parentName: 'Rameshbhai Sharma',
      parentEmail: 'ramesh.sharma@example.com',
      attendance: 94,
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
      remarks: 'Consistent high performer. Helps peers in group learning exercises.',
      subjects: {
        Mathematics: {
          total: 100,
          marks: 75,
          topics: {
            'Fractions & Decimals': 76,
            'Multiplication & Tables': 78,
            'Division & Remainders': 72,
            'Geometry & Shapes': 76,
            'Word Problems & Logic': 73
          }
        },
        English: {
          total: 100,
          marks: 78,
          topics: {
            'Grammar & Tenses': 76,
            'Vocabulary & Synonyms': 80,
            'Reading Comprehension': 78,
            'Spelling & Phonics': 82,
            'Sentence Formation': 74
          }
        },
        Gujarati: {
          total: 100,
          marks: 74,
          topics: {
            'Kakko & Barakhadi': 82,
            'Matra Identification & Usage': 72,
            'Sentence Reading (વાક્ય વાચન)': 75,
            'Vocabulary & Opposites (શબ્દ ભંડોળ)': 74,
            'Paragraph Comprehension (પરિચ્છેદ સમજ)': 67
          }
        },
        Hindi: {
          total: 100,
          marks: 72,
          topics: {
            'Varnamala (स्वर एवं व्यंजन)': 78,
            'Matra Application (मात्रा ज्ञान)': 70,
            'Word Formation (शब्द निर्माण)': 74,
            'Poem Recitation & Meaning': 76,
            'Sentence Completion (वाक्य पूर्ति)': 62
          }
        },
        'EVS (Environmental Studies)': {
          total: 100,
          marks: 76,
          topics: {
            'Plant Parts & Photosynthesis': 80,
            'Water Cycle & Conservation': 75,
            'Living vs Non-Living': 78,
            'Community Helpers & Roles': 76,
            'Food, Nutrition & Healthy Habits': 71
          }
        }
      }
    },
    {
      studentId: 'ET-2026-501',
      name: 'Pooja Patel',
      class: 'Class 5',
      section: 'A',
      rollNo: '01',
      parentName: 'Kishorbhai Patel',
      parentEmail: 'parent@edutrack.edu',
      attendance: 96,
      avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80',
      remarks: 'Diligent student with strong language comprehension. Shows great focus in science projects.',
      subjects: {
        Mathematics: {
          total: 100,
          marks: 78,
          topics: {
            'Fractions & Decimals': 75,
            'Multiplication & Tables': 82,
            'Division & Remainders': 70,
            'Geometry & Shapes': 86,
            'Word Problems & Logic': 77
          }
        },
        English: {
          total: 100,
          marks: 84,
          topics: {
            'Grammar & Tenses': 80,
            'Vocabulary & Synonyms': 86,
            'Reading Comprehension': 85,
            'Spelling & Phonics': 88,
            'Sentence Formation': 81
          }
        },
        Gujarati: {
          total: 100,
          marks: 80,
          topics: {
            'Kakko & Barakhadi': 88,
            'Matra Identification & Usage': 78,
            'Sentence Reading (વાક્ય વાચન)': 84,
            'Vocabulary & Opposites (શબ્દ ભંડોળ)': 78,
            'Paragraph Comprehension (પરિચ્છેદ સમજ)': 72
          }
        },
        Hindi: {
          total: 100,
          marks: 76,
          topics: {
            'Varnamala (स्वर एवं व्यंजन)': 84,
            'Matra Application (मात्रा ज्ञान)': 72,
            'Word Formation (शब्द निर्माण)': 78,
            'Poem Recitation & Meaning': 80,
            'Sentence Completion (वाक्य पूर्ति)': 66
          }
        },
        'EVS (Environmental Studies)': {
          total: 100,
          marks: 88,
          topics: {
            'Plant Parts & Photosynthesis': 92,
            'Water Cycle & Conservation': 86,
            'Living vs Non-Living': 90,
            'Community Helpers & Roles': 88,
            'Food, Nutrition & Healthy Habits': 84
          }
        }
      }
    },
    {
      studentId: 'ET-2026-601',
      name: 'Tirth Dave',
      class: 'Class 6',
      section: 'B',
      rollNo: '07',
      parentName: 'Jigneshbhai Dave',
      parentEmail: 'jignesh.dave@example.com',
      attendance: 89,
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
      remarks: 'Good grasp of spatial geometry. Work on word problems needed.',
      subjects: {
        Mathematics: {
          total: 100,
          marks: 66,
          topics: {
            'Fractions & Decimals': 62,
            'Multiplication & Tables': 74,
            'Division & Remainders': 60,
            'Geometry & Shapes': 78,
            'Word Problems & Logic': 56
          }
        },
        English: {
          total: 100,
          marks: 70,
          topics: {
            'Grammar & Tenses': 68,
            'Vocabulary & Synonyms': 74,
            'Reading Comprehension': 70,
            'Spelling & Phonics': 72,
            'Sentence Formation': 66
          }
        },
        Gujarati: {
          total: 100,
          marks: 74,
          topics: {
            'Kakko & Barakhadi': 82,
            'Matra Identification & Usage': 70,
            'Sentence Reading (વાક્ય વાચન)': 76,
            'Vocabulary & Opposites (શબ્દ ભંડોળ)': 72,
            'Paragraph Comprehension (પરિચ્છેદ સમજ)': 70
          }
        },
        Hindi: {
          total: 100,
          marks: 68,
          topics: {
            'Varnamala (स्वर एवं व्यंजन)': 76,
            'Matra Application (मात्रा ज्ञान)': 64,
            'Word Formation (शब्द निर्माण)': 70,
            'Poem Recitation & Meaning': 72,
            'Sentence Completion (वाक्य पूर्ति)': 58
          }
        },
        'EVS (Environmental Studies)': {
          total: 100,
          marks: 80,
          topics: {
            'Plant Parts & Photosynthesis': 84,
            'Water Cycle & Conservation': 78,
            'Living vs Non-Living': 85,
            'Community Helpers & Roles': 80,
            'Food, Nutrition & Healthy Habits': 73
          }
        }
      }
    }
  ];

  for (const s of students) {
    if (s.subjects) {
      const marks = Object.values(s.subjects)
        .map((sub) => sub.marks)
        .filter((m) => typeof m === 'number');
      s.overallAvg = marks.length > 0 ? Math.round(marks.reduce((a, b) => a + b, 0) / marks.length) : 0;
    }
    await Student.findOneAndUpdate({ studentId: s.studentId }, { $set: s }, { upsert: true, new: true });
  }
  console.log(`  🎓 Seeded ${students.length} student records.`);

  // 4. Coordinator Advice
  const adviceItems = [
    {
      adviceId: 'ADV-01',
      class: 'Class 4',
      coordinatorName: 'Shri R.K. Mehta (BRC Coordinator)',
      date: '12-Oct-2026',
      advice:
        'Conduct 15-minute daily abacus bead and base-10 block sessions for students scoring below 40% in Mathematics multiplication and division. Focus on peer-assisted learning.',
      status: 'Implemented'
    },
    {
      adviceId: 'ADV-02',
      class: 'Class 4',
      coordinatorName: 'Shri R.K. Mehta (BRC Coordinator)',
      date: '06-Oct-2026',
      advice:
        'Organize visual Barakhadi audio rhyme drills during morning language assembly to assist Gujarati matra recognition.',
      status: 'In Progress'
    },
    {
      adviceId: 'ADV-03',
      class: 'Class 5',
      coordinatorName: 'Shri R.K. Mehta (BRC Coordinator)',
      date: '28-Sep-2026',
      advice:
        'Implement CUBES problem-solving strategy cards for multi-step word problems in Class 5 Mathematics.',
      status: 'Reviewed'
    }
  ];

  for (const a of adviceItems) {
    await Advice.findOneAndUpdate({ adviceId: a.adviceId }, { $set: a }, { upsert: true, new: true });
  }

  // 5. Parent Doubts
  const doubts = [
    {
      doubtId: 'DOUBT-101',
      studentId: 'ET-2026-401',
      studentName: 'Aarav Patel',
      parentName: 'Kishorbhai Patel',
      parentEmail: 'parent@edutrack.edu',
      subject: 'Mathematics',
      category: 'Marks Clarification',
      question: 'Aarav scored 38% in multiplication tables quiz. How can we support his table practice at home?',
      status: 'Replied',
      reply:
        'Dear Parent, please practice skip counting by 3s and 4s using daily objects. He has also been assigned 10-minute abacus sessions in school.',
      date: '14-Oct-2026 10:30 AM'
    },
    {
      doubtId: 'DOUBT-102',
      studentId: 'ET-2026-401',
      studentName: 'Aarav Patel',
      parentName: 'Kishorbhai Patel',
      parentEmail: 'parent@edutrack.edu',
      subject: 'Gujarati',
      category: 'Academic Doubt',
      question: "He confuses short and long 'i' matras (હ્રસ્વ vs દીર્ઘ). Can teacher recommend extra storybooks?",
      status: 'Pending',
      reply: null,
      date: '15-Oct-2026 09:15 AM'
    }
  ];

  for (const d of doubts) {
    await Doubt.findOneAndUpdate({ doubtId: d.doubtId }, { $set: d }, { upsert: true, new: true });
  }

  console.log('✅ Database seed complete!');
  return {
    usersCount: users.length,
    studentsCount: students.length,
    adviceCount: adviceItems.length,
    doubtsCount: doubts.length
  };
};

module.exports = { runSeed };
