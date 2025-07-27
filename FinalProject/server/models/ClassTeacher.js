const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const ClassTeacher = sequelize.define('ClassTeacher', {
  class_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
  },
  teacher_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
  },
}, {
  tableName: 'class_teachers',
  timestamps: false,
});

module.exports = ClassTeacher;