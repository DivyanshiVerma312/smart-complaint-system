const mongoose = require('mongoose');

// Complaint Schema as defined in Q3 of the exam paper
const ComplaintSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    match: [/^\S+@\S+\.\S+$/, 'Please provide a valid email']
  },
  title: {
    type: String,
    required: [true, 'Complaint title is required'],
    trim: true
  },
  description: {
    type: String,
    required: [true, 'Complaint description is required']
  },
  category: {
    type: String,
    required: [true, 'Category is required'],
    enum: {
      values: ['Water Supply', 'Electricity', 'Sanitation', 'Roads', 'Public Safety', 'Other'],
      message: '{VALUE} is not a valid category'
    }
  },
  location: {
    type: String,
    required: [true, 'Location is required'],
    trim: true
  },
  status: {
    type: String,
    default: 'Pending',
    enum: ['Pending', 'In Progress', 'Resolved', 'Rejected']
  },
  aiAnalysis: {
    priority: { type: String, default: null },
    department: { type: String, default: null },
    summary: { type: String, default: null },
    response: { type: String, default: null }
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Complaint', ComplaintSchema);
