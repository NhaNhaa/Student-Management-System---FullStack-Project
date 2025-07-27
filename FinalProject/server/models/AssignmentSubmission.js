const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const AssignmentSubmission = sequelize.define('AssignmentSubmission', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  assignment_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  student_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  submission_date: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  submission_status: {
    type: DataTypes.ENUM('pending', 'submitted', 'graded'),
    allowNull: false,
    defaultValue: 'pending',
  },
  assignment_score: {
    type: DataTypes.INTEGER,
    allowNull: true,
    validate: {
      min: 0,
      max: 100,
    },
  },
}, {
  tableName: 'assignment_submissions',
  timestamps: false,
});

module.exports = AssignmentSubmission;