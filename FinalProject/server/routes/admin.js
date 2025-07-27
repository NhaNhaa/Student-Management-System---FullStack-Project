const express = require('express');
const { authenticateToken, authorizeRoles } = require('../middleware/auth');
const adminController = require('../controllers/adminController');

const router = express.Router();

// Get admin profile
router.get('/profile', authenticateToken, authorizeRoles('admin'), adminController.getProfile);

// Get all users
router.get('/users', authenticateToken, authorizeRoles('admin'), adminController.getUsers);

// Create user
router.post('/users', authenticateToken, authorizeRoles('admin'), adminController.createUser);

// Update user
router.put('/users/:id', authenticateToken, authorizeRoles('admin'), adminController.updateUser);

// Delete user
router.delete('/users/:id', authenticateToken, authorizeRoles('admin'), adminController.deleteUser);

// Get dashboard stats
router.get('/dashboard', authenticateToken, authorizeRoles('admin'), adminController.getDashboard);

// Get all classes
router.get('/classes', authenticateToken, authorizeRoles('admin'), adminController.getClasses);

// Create class
router.post('/classes', authenticateToken, authorizeRoles('admin'), adminController.createClass);

// Get all subjects
router.get('/subjects', authenticateToken, authorizeRoles('admin'), adminController.getSubjects);

// Create subject
router.post('/subjects', authenticateToken, authorizeRoles('admin'), adminController.createSubject);

module.exports = router;