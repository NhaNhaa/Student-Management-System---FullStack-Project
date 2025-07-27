const bcrypt = require('bcryptjs');
const { User, Class, Grade, Subject } = require('../models/associations');

const adminController = {
  // Get admin profile
  getProfile: async (req, res) => {
    try {
      const admin = await User.findByPk(req.user.id, {
        attributes: ['id', 'first_name', 'last_name', 'email'],
      });

      res.json(admin);
    } catch (error) {
      console.error('Error getting admin profile:', error);
      res.status(500).json({ error: 'Server error' });
    }
  },

  // Get all users
  getUsers: async (req, res) => {
    try {
      const users = await User.findAll({
        attributes: ['id', 'first_name', 'last_name', 'email', 'role'],
      });

      res.json(users);
    } catch (error) {
      console.error('Error getting users:', error);
      res.status(500).json({ error: 'Server error' });
    }
  },

  // Create user
  createUser: async (req, res) => {
    try {
      const { first_name, last_name, email, password, role } = req.body;

      const hashedPassword = await bcrypt.hash(password, 10);

      const user = await User.create({
        first_name,
        last_name,
        email,
        password_hash: hashedPassword,
        role,
      });

      res.json({
        message: 'User created successfully',
        user: {
          id: user.id,
          first_name: user.first_name,
          last_name: user.last_name,
          email: user.email,
          role: user.role,
        },
      });
    } catch (error) {
      console.error('Error creating user:', error);
      res.status(500).json({ error: 'Server error' });
    }
  },

  // Update user
  updateUser: async (req, res) => {
    try {
      const { id } = req.params;
      const { first_name, last_name, email, role } = req.body;

      await User.update(
        { first_name, last_name, email, role },
        { where: { id } }
      );

      res.json({ message: 'User updated successfully' });
    } catch (error) {
      console.error('Error updating user:', error);
      res.status(500).json({ error: 'Server error' });
    }
  },

  // Delete user
  deleteUser: async (req, res) => {
    try {
      const { id } = req.params;

      await User.destroy({ where: { id } });

      res.json({ message: 'User deleted successfully' });
    } catch (error) {
      console.error('Error deleting user:', error);
      res.status(500).json({ error: 'Server error' });
    }
  },

  // Get dashboard stats
  getDashboard: async (req, res) => {
    try {
      const totalStudents = await User.count({ where: { role: 'student' } });
      const totalTeachers = await User.count({ where: { role: 'teacher' } });
      const totalClasses = await Class.count();

      const recentUsers = await User.findAll({
        where: { role: ['student', 'teacher'] },
        order: [['id', 'DESC']],
        limit: 5,
        attributes: ['id', 'first_name', 'last_name', 'email', 'role'],
      });

      res.json({
        totalStudents,
        totalTeachers,
        totalClasses,
        recentUsers,
      });
    } catch (error) {
      console.error('Error getting dashboard data:', error);
      res.status(500).json({ error: 'Server error' });
    }
  },

  // Get all classes
  getClasses: async (req, res) => {
    try {
      const classes = await Class.findAll({
        include: [Grade],
      });

      res.json(classes);
    } catch (error) {
      console.error('Error getting classes:', error);
      res.status(500).json({ error: 'Server error' });
    }
  },

  // Create class
  createClass: async (req, res) => {
    try {
      const { grade_id, class_name } = req.body;

      const newClass = await Class.create({
        grade_id,
        class_name,
      });

      res.json({
        message: 'Class created successfully',
        class: newClass,
      });
    } catch (error) {
      console.error('Error creating class:', error);
      res.status(500).json({ error: 'Server error' });
    }
  },

  // Get all subjects
  getSubjects: async (req, res) => {
    try {
      const subjects = await Subject.findAll();
      res.json(subjects);
    } catch (error) {
      console.error('Error getting subjects:', error);
      res.status(500).json({ error: 'Server error' });
    }
  },

  // Create subject
  createSubject: async (req, res) => {
    try {
      const { subject_name } = req.body;

      const subject = await Subject.create({
        subject_name,
      });

      res.json({
        message: 'Subject created successfully',
        subject,
      });
    } catch (error) {
      console.error('Error creating subject:', error);
      res.status(500).json({ error: 'Server error' });
    }
  }
};

module.exports = adminController;