const { Sequelize } = require('sequelize');

// Check if environment variables are loaded
if (!process.env.DB_NAME) {
  console.error('❌ Environment variables not loaded. Make sure .env file exists.');
}

const sequelize = new Sequelize({
  dialect: 'mysql',
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT || 3306,
  username: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || 'Nha27092006@',
  database: process.env.DB_NAME || 'student_system',
  logging: false, // Set to console.log to see SQL queries
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  },
  define: {
    timestamps: false, // Disable automatic timestamps since your schema doesn't have them
    freezeTableName: true // Use table name as-is, don't pluralize
  }
});

module.exports = sequelize;