const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Exam = sequelize.define('Exam', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  class_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  subject_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  exam_name: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  exam_date: {
    type: DataTypes.DATE,
    allowNull: false,
  },
}, {
  tableName: 'exams',
  timestamps: false,
});

module.exports = Exam;