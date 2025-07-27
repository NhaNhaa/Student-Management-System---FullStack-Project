// Simple script to check if everything is set up correctly
console.log('🔍 Checking server setup...\n');

// Check Node.js version
console.log('Node.js version:', process.version);

// Check if required modules can be loaded
const modules = ['express', 'cors', 'dotenv', 'bcryptjs', 'jsonwebtoken', 'mysql2', 'sequelize'];

modules.forEach(module => {
  try {
    require(module);
    console.log(`✅ ${module} - OK`);
  } catch (error) {
    console.log(`❌ ${module} - MISSING`);
  }
});

// Check environment variables
console.log('\n🔧 Environment Variables:');
require('dotenv').config();

const envVars = ['DB_HOST', 'DB_USER', 'DB_NAME', 'JWT_SECRET'];
envVars.forEach(envVar => {
  const value = process.env[envVar];
  if (value) {
    console.log(`✅ ${envVar} - SET`);
  } else {
    console.log(`❌ ${envVar} - MISSING`);
  }
});

console.log('\n🚀 Setup check complete!');