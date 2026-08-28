require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('./src/models/User');

const seedAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/fullstack-advanced');
    const existingAdmin = await User.findOne({ email: 'admin@example.com' });
    if (existingAdmin) {
      console.log('Admin already exists.');
      process.exit(0);
    }

    const hash = await bcrypt.hash('admin123', 10);
    await User.create({
      name: 'System Admin',
      email: 'admin@example.com',
      password: hash,
      role: 'admin'
    });
    console.log('Admin created successfully (admin@example.com / admin123)');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding admin:', error);
    process.exit(1);
  }
};

seedAdmin();
