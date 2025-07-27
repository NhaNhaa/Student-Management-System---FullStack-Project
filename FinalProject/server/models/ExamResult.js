const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const ExamResult = sequelize.define('ExamResult', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  exam_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  student_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  exam_score: {
    type: DataTypes.INTEGER,
    allowNull: true,
    validate: {
      min: 0,
      max: 100,
    },
  },
}, {
  tableName: 'exam_results',
  timestamps: false,
});

module.exports = ExamResult;