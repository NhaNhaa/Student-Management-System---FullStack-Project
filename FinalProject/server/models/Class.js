const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Class = sequelize.define('Class', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  grade_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  class_name: {
    type: DataTypes.STRING(10),
    allowNull: false,
  },
}, {
  tableName: 'classes',
  timestamps: false,
});

module.exports = Class;