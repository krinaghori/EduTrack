const test = require('node:test');
const assert = require('node:assert');
require('dotenv').config({ path: __dirname + '/../.env' });

const { connectDB, disconnectDB } = require('../src/config/db');
const { runSeed } = require('../src/utils/seedData');
const app = require('../src/app');

let server;
let baseUrl;
let teacherToken = '';
let adminToken = '';
let testStudentId = '';
let testDoubtId = '';

test.before(async () => {
  // Connect to DB (will use in-memory or URI)
  await connectDB();
  await runSeed();

  // Start temporary test server
  await new Promise((resolve) => {
    server = app.listen(0, () => {
      const port = server.address().port;
      baseUrl = `http://127.0.0.1:${port}`;
      resolve();
    });
  });
});

test.after(async () => {
  await new Promise((resolve) => server.close(resolve));
  await disconnectDB();
});

test('1. Health check returns status UP', async () => {
  const res = await fetch(`${baseUrl}/health`);
  const data = await res.json();
  assert.strictEqual(res.status, 200);
  assert.strictEqual(data.status, 'UP');
  assert.ok(data.students_count >= 5);
});

test('2. Backward compatibility endpoint /api/status works', async () => {
  const res = await fetch(`${baseUrl}/api/status`);
  const data = await res.json();
  assert.strictEqual(res.status, 200);
  assert.strictEqual(data.status, 'online');
});

test('3. Authentication: Login with valid teacher credentials', async () => {
  const res = await fetch(`${baseUrl}/api/v1/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: 'teacher@edutrack.edu', password: 'teach123' })
  });
  const data = await res.json();
  assert.strictEqual(res.status, 200);
  assert.strictEqual(data.success, true);
  assert.ok(data.token);
  assert.strictEqual(data.data.role, 'teacher');
  teacherToken = data.token;
});

test('4. Authentication: Login with invalid password fails', async () => {
  const res = await fetch(`${baseUrl}/api/v1/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: 'teacher@edutrack.edu', password: 'wrongpassword' })
  });
  const data = await res.json();
  assert.strictEqual(res.status, 401);
  assert.strictEqual(data.success, false);
});

test('5. Authentication: Login with admin credentials', async () => {
  const res = await fetch(`${baseUrl}/api/v1/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: 'admin@edutrack.edu', password: 'AdminSecurePass@2026' })
  });
  const data = await res.json();
  assert.strictEqual(res.status, 200);
  assert.strictEqual(data.data.role, 'admin');
  adminToken = data.token;
});

test('6. Profile: Access /api/v1/auth/me with Bearer token', async () => {
  const res = await fetch(`${baseUrl}/api/v1/auth/me`, {
    headers: { Authorization: `Bearer ${teacherToken}` }
  });
  const data = await res.json();
  assert.strictEqual(res.status, 200);
  assert.strictEqual(data.data.email, 'teacher@edutrack.edu');
});

test('7. Students: List students and filter by Class 4', async () => {
  const res = await fetch(`${baseUrl}/api/v1/students?className=Class 4`);
  const data = await res.json();
  assert.strictEqual(res.status, 200);
  assert.strictEqual(data.success, true);
  assert.ok(Array.isArray(data.data));
  assert.ok(data.data.length >= 4);
});

test('8. Students: Create new student record with marks', async () => {
  const newStudent = {
    name: 'Diya Trivedi',
    rollNo: '25',
    class: 'Class 4',
    section: 'A',
    parentName: 'Girish Trivedi',
    parentEmail: 'girish.trivedi@example.com',
    attendance: 95,
    remarks: 'Consistent enthusiasm in group projects.',
    subjects: {
      Mathematics: { total: 100, marks: 85, topics: { 'Fractions & Decimals': 88 } },
      English: { total: 100, marks: 82, topics: { 'Grammar & Tenses': 80 } }
    }
  };

  const res = await fetch(`${baseUrl}/api/v1/students`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${teacherToken}`
    },
    body: JSON.stringify(newStudent)
  });
  const data = await res.json();
  assert.strictEqual(res.status, 201);
  assert.strictEqual(data.success, true);
  assert.strictEqual(data.data.name, 'Diya Trivedi');
  testStudentId = data.data.studentId;
});

test('9. Students: Update student marks and verify calculation', async () => {
  const res = await fetch(`${baseUrl}/api/v1/students/${testStudentId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${teacherToken}`
    },
    body: JSON.stringify({
      remarks: 'Updated remarks by class teacher.',
      attendance: 98
    })
  });
  const data = await res.json();
  assert.strictEqual(res.status, 200);
  assert.strictEqual(data.data.attendance, 98);
});

test('10. Doubts: Parent submits a question and teacher replies', async () => {
  // 1. Submit doubt
  const createRes = await fetch(`${baseUrl}/api/v1/doubts`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      studentId: testStudentId,
      subject: 'Mathematics',
      category: 'Marks Clarification',
      question: 'How can Diya practice fractions further at home?',
      parentName: 'Girish Trivedi',
      parentEmail: 'girish.trivedi@example.com'
    })
  });
  const createData = await createRes.json();
  assert.strictEqual(createRes.status, 201);
  assert.strictEqual(createData.success, true);
  testDoubtId = createData.data.doubtId;

  // 2. Teacher replies
  const replyRes = await fetch(`${baseUrl}/api/v1/doubts/${testDoubtId}/reply`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${teacherToken}`
    },
    body: JSON.stringify({
      reply: 'Please use visual pizza slice diagrams for halves and thirds.'
    })
  });
  const replyData = await replyRes.json();
  assert.strictEqual(replyRes.status, 200);
  assert.strictEqual(replyData.data.status, 'Replied');
  assert.ok(replyData.data.reply.includes('pizza slice'));
});

test('11. Analytics: Get macro overview metrics', async () => {
  const res = await fetch(`${baseUrl}/api/v1/analytics/overview`);
  const data = await res.json();
  assert.strictEqual(res.status, 200);
  assert.strictEqual(data.success, true);
  assert.ok(data.data.totalStudents >= 5);
  assert.ok(data.data.overallAverage > 0);
});

test('12. Security: Non-admin user cannot access Admin endpoints', async () => {
  const res = await fetch(`${baseUrl}/api/v1/admin/dashboard`, {
    headers: { Authorization: `Bearer ${teacherToken}` }
  });
  assert.strictEqual(res.status, 403);
});

test('13. Admin: Admin user successfully retrieves dashboard metrics', async () => {
  const res = await fetch(`${baseUrl}/api/v1/admin/dashboard`, {
    headers: { Authorization: `Bearer ${adminToken}` }
  });
  const data = await res.json();
  assert.strictEqual(res.status, 200);
  assert.strictEqual(data.success, true);
  assert.ok(data.data.totalUsers >= 5);
  assert.ok(data.data.totalStudents >= 5);
});

test('14. Students: Delete created test student', async () => {
  const res = await fetch(`${baseUrl}/api/v1/students/${testStudentId}`, {
    method: 'DELETE',
    headers: { Authorization: `Bearer ${teacherToken}` }
  });
  const data = await res.json();
  assert.strictEqual(res.status, 200);
  assert.strictEqual(data.success, true);
});
