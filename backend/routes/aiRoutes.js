const express = require('express');
const router = express.Router();
const { analyzeComplaintAI } = require('../controllers/aiController');
const auth = require('../middleware/auth');

// AI analysis route (protected)
router.post('/analyze', auth, analyzeComplaintAI);

module.exports = router;
