const express = require('express');
const { authenticateToken, authorizeRoles } = require('../middleware/auth');
const studentController = require('../controllers/studentController');

const router = express.Router();

// Get student profile
router.get('/profile', authenticateToken, authorizeRoles('student'), studentController.getProfile);

// Get attendance data
router.get('/attendance', authenticateToken, authorizeRoles('student'), studentController.getAttendance);

// Get assignment submissions
router.get('/assignments', authenticateToken, authorizeRoles('student'), studentController.getAssignments);

// Get subject scores
router.get('/scores', authenticateToken, authorizeRoles('student'), studentController.getScores);

// Get subjects with assignments
router.get('/subjects', authenticateToken, authorizeRoles('student'), studentController.getSubjects);

// Submit assignment
router.post('/submit-assignment', authenticateToken, authorizeRoles('student'), studentController.submitAssignment);

// Get exams
router.get('/exams', authenticateToken, authorizeRoles('student'), studentController.getExams);

module.exports = router;