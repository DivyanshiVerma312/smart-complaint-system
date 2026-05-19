const express = require('express');
const router = express.Router();
const {
  addComplaint,
  getComplaints,
  searchByLocation,
  getComplaint,
  updateComplaint,
  deleteComplaint
} = require('../controllers/complaintController');
const auth = require('../middleware/auth');

// All complaint routes are protected (Q6 requirement)

// Search must come before :id route to avoid conflict
router.get('/search', auth, searchByLocation);

// CRUD operations
router.route('/')
  .get(auth, getComplaints)
  .post(auth, addComplaint);

router.route('/:id')
  .get(auth, getComplaint)
  .put(auth, updateComplaint)
  .delete(auth, deleteComplaint);

module.exports = router;
