const express = require('express');
const { authenticateToken, authorizeRoles } = require('../middleware/auth');
const teacherController = require('../controllers/teacherController');

const router = express.Router();

// Get teacher profile
router.get('/profile', authenticateToken, authorizeRoles('teacher'), teacherController.getProfile);

// Get teacher's classes
router.get('/classes', authenticateToken, authorizeRoles('teacher'), teacherController.getClasses);

// Get students in a class
router.get('/students/:classId', authenticateToken, authorizeRoles('teacher'), teacherController.getStudents);

// Create assignment
router.post('/assignments', authenticateToken, authorizeRoles('teacher'), teacherController.createAssignment);

// Grade assignment
router.put('/grade-assignment', authenticateToken, authorizeRoles('teacher'), teacherController.gradeAssignment);

// Get student analysis
router.get('/student-analysis/:studentId', authenticateToken, authorizeRoles('teacher'), teacherController.getStudentAnalysis);

// Create exam
router.post('/exams', authenticateToken, authorizeRoles('teacher'), teacherController.createExam);

// Grade exam
router.put('/grade-exam', authenticateToken, authorizeRoles('teacher'), teacherController.gradeExam);

module.exports = router;