const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Grade = sequelize.define('Grade', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  grade_level: {
    type: DataTypes.INTEGER,
    allowNull: false,
    unique: true,
  },
}, {
  tableName: 'grades',
  timestamps: false,
});

module.exports = Grade;