import User from './models/user.model.js';
import connectToDB from './configs/dbConn.js';

// Create admin user
async function createAdmin() {
  await connectToDB();
  
  const adminUser = await User.create({
    fullName: 'Admin User',
    email: 'admin@lms.com',
    password: 'admin123',
    role: 'ADMIN'
  });
  
  console.log('Admin created:', adminUser.email);
  process.exit(0);
}

createAdmin();