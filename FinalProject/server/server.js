const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Basic test route
app.get('/test', (req, res) => {
  res.json({ message: 'Server is working!' });
});

// Import routes
let authRoutes, studentRoutes, teacherRoutes, adminRoutes;
let sequelize;

try {
  sequelize = require('./config/database');
  authRoutes = require('./routes/auth');
  studentRoutes = require('./routes/student');
  teacherRoutes = require('./routes/teacher');
  adminRoutes = require('./routes/admin');
  
  // Use routes
  app.use('/api/auth', authRoutes);
  app.use('/api/student', studentRoutes);
  app.use('/api/teacher', teacherRoutes);
  app.use('/api/admin', adminRoutes);
} catch (error) {
  console.error('Error loading routes or database:', error.message);
  console.log('Starting server without database connection...');
}

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Server Error:', err);
  res.status(500).json({ 
    error: 'Internal server error',
    message: err.message 
  });
});

// Database connection and server start
const startServer = async () => {
  try {
    if (sequelize) {
      console.log('🔍 Attempting to connect to database...');
      await sequelize.authenticate();
      console.log('✅ Database connected successfully');
      
      // Don't sync - use existing database structure
      console.log('✅ Using existing database structure');
    }
    
    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
      console.log(`📊 Test the server: http://localhost:${PORT}/test`);
      if (!sequelize) {
        console.log('⚠️  Database not connected - check your MySQL setup');
      }
    });
  } catch (error) {
    console.error('❌ Database connection failed:', error.message);
    console.log('Starting server without database...');
    
    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT} (without database)`);
      console.log(`📊 Test the server: http://localhost:${PORT}/test`);
      console.log('⚠️  Fix database connection to use full functionality');
    });
  }
};

startServer();