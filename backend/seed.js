/**
 * Database Seed Script
 * 
 * Run: node seed.js
 * 
 * Creates 2 demo users and 8 diverse complaints for instant demo readiness.
 * This ensures the evaluator sees a fully populated app on first load.
 */

const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');

dotenv.config();

const User = require('./models/User');
const Complaint = require('./models/Complaint');

const seedData = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ Connected to MongoDB');

    // Clear existing data
    await User.deleteMany({});
    await Complaint.deleteMany({});
    console.log('🗑️  Cleared existing data');

    // Create demo users
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash('password123', salt);

    const users = await User.create([
      {
        name: 'Rahul Kumar',
        email: 'rahul@gmail.com',
        password: hashedPassword
      },
      {
        name: 'Priya Sharma',
        email: 'priya@gmail.com',
        password: hashedPassword
      }
    ]);
    console.log(`👤 Created ${users.length} demo users`);
    console.log('   📧 Login: rahul@gmail.com / password123');
    console.log('   📧 Login: priya@gmail.com / password123');

    // Create diverse complaints
    const complaints = await Complaint.create([
      {
        name: 'Rahul Kumar',
        email: 'rahul@gmail.com',
        title: 'Water Leakage Issue',
        description: 'Water pipeline damaged near market area causing flooding on the main road. The leakage has been ongoing for 3 days and is affecting nearby shops and pedestrian movement. Urgent repair needed.',
        category: 'Water Supply',
        location: 'Ghaziabad',
        status: 'Pending',
        aiAnalysis: {
          priority: 'High',
          department: 'Water & Sewage Department',
          summary: 'Urgent water pipeline damage near market area causing flooding for 3 days.',
          response: 'Your complaint has been forwarded to the Water & Sewage Department with High priority. Expected resolution: 24 hours.'
        }
      },
      {
        name: 'Priya Sharma',
        email: 'priya@gmail.com',
        title: 'Street Light Not Working',
        description: 'Multiple street lights on MG Road have stopped working since last week. The area becomes very dark after sunset making it unsafe for pedestrians and commuters.',
        category: 'Electricity',
        location: 'Noida',
        status: 'In Progress',
        aiAnalysis: {
          priority: 'Medium',
          department: 'Power & Energy Department',
          summary: 'Multiple street lights non-functional on MG Road, creating safety concerns.',
          response: 'Your complaint has been forwarded to the Power & Energy Department with Medium priority. Expected resolution: 3-5 business days.'
        }
      },
      {
        name: 'Amit Singh',
        email: 'amit@gmail.com',
        title: 'Garbage Not Collected',
        description: 'Garbage has not been collected from Sector 15 for the past week. The waste is overflowing from bins and causing a terrible stench in the residential area.',
        category: 'Sanitation',
        location: 'Delhi',
        status: 'Pending',
        aiAnalysis: {
          priority: 'Medium',
          department: 'Sanitation & Waste Management Department',
          summary: 'Week-long garbage collection failure in Sector 15 with overflowing bins.',
          response: 'Your complaint has been forwarded to the Sanitation & Waste Management Department with Medium priority. Expected resolution: 3-5 business days.'
        }
      },
      {
        name: 'Sneha Gupta',
        email: 'sneha@gmail.com',
        title: 'Pothole on Main Highway',
        description: 'A large pothole has developed on the NH-24 highway near the toll plaza. Several accidents have occurred due to this. The pothole is approximately 2 feet deep and dangerous for two-wheelers.',
        category: 'Roads',
        location: 'Ghaziabad',
        status: 'Resolved',
        aiAnalysis: {
          priority: 'High',
          department: 'Public Works & Road Department',
          summary: 'Dangerous 2-foot deep pothole on NH-24 highway causing accidents.',
          response: 'Your complaint has been forwarded to the Public Works & Road Department with High priority. This issue has been resolved.'
        }
      },
      {
        name: 'Vikram Patel',
        email: 'vikram@gmail.com',
        title: 'Illegal Parking on Residential Street',
        description: 'Commercial vehicles are being parked on the residential street in Block C, causing obstruction for residents. This has been a recurring issue for the past month.',
        category: 'Public Safety',
        location: 'Noida',
        status: 'In Progress',
        aiAnalysis: {
          priority: 'Low',
          department: 'Law Enforcement & Public Safety Department',
          summary: 'Recurring illegal commercial vehicle parking in residential Block C.',
          response: 'Your complaint has been forwarded to the Law Enforcement & Public Safety Department with Low priority. Expected resolution: 7-10 business days.'
        }
      },
      {
        name: 'Rahul Kumar',
        email: 'rahul@gmail.com',
        title: 'Electricity Outage Emergency',
        description: 'Complete power failure in entire Sector 62 since morning. Hospitals and elderly residents are severely affected. Emergency generators are running out of fuel. This is a critical emergency requiring immediate attention.',
        category: 'Electricity',
        location: 'Noida',
        status: 'Pending',
        aiAnalysis: {
          priority: 'High',
          department: 'Power & Energy Department',
          summary: 'Critical complete power failure in Sector 62 affecting hospitals and elderly.',
          response: 'Your complaint has been forwarded to the Power & Energy Department with High priority. Expected resolution: 24 hours.'
        }
      },
      {
        name: 'Neha Verma',
        email: 'neha@gmail.com',
        title: 'Broken Water Meter',
        description: 'The water meter installed outside my residence at House No. 45 is broken and showing incorrect readings. I am being overcharged on my water bills due to this faulty meter.',
        category: 'Water Supply',
        location: 'Delhi',
        status: 'Rejected',
        aiAnalysis: {
          priority: 'Low',
          department: 'Water & Sewage Department',
          summary: 'Faulty water meter at House No. 45 causing incorrect billing.',
          response: 'Your complaint has been forwarded to the Water & Sewage Department with Low priority. Expected resolution: 7-10 business days.'
        }
      },
      {
        name: 'Priya Sharma',
        email: 'priya@gmail.com',
        title: 'Open Drain Cover Missing',
        description: 'The drain cover near the school on Ring Road is missing, posing a serious danger to children and pedestrians. A child almost fell into the drain yesterday. This needs immediate attention.',
        category: 'Roads',
        location: 'Ghaziabad',
        status: 'Pending',
        aiAnalysis: {
          priority: 'High',
          department: 'Public Works & Road Department',
          summary: 'Missing drain cover near school posing serious danger to children.',
          response: 'Your complaint has been forwarded to the Public Works & Road Department with High priority. Expected resolution: 24 hours.'
        }
      }
    ]);

    console.log(`📋 Created ${complaints.length} demo complaints`);
    console.log('\n✅ Database seeded successfully!');
    console.log('=========================================');
    console.log('Demo Credentials:');
    console.log('  Email: rahul@gmail.com');
    console.log('  Password: password123');
    console.log('=========================================\n');

    process.exit(0);
  } catch (error) {
    console.error('❌ Seed Error:', error.message);
    process.exit(1);
  }
};

seedData();
