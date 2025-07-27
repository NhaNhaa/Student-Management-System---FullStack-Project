const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Enrollment = sequelize.define('Enrollment', {
  student_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
  },
  class_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
  },
}, {
  tableName: 'enrollment',
  timestamps: false,
});

module.exports = Enrollment;