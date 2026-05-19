const Complaint = require('../models/Complaint');

// @desc    Add a new complaint
// @route   POST /api/complaints
// @access  Private
exports.addComplaint = async (req, res, next) => {
  try {
    const { name, email, title, description, category, location } = req.body;

    const complaint = await Complaint.create({
      name,
      email,
      title,
      description,
      category,
      location
    });

    res.status(201).json({
      success: true,
      message: 'Complaint stored successfully',
      data: complaint
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get all complaints (with optional category filter)
// @route   GET /api/complaints?category=Water Supply
// @access  Private
exports.getComplaints = async (req, res, next) => {
  try {
    const { category } = req.query;
    let filter = {};

    if (category) {
      filter.category = category;
    }

    const complaints = await Complaint.find(filter).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: complaints.length,
      data: complaints
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Search complaints by location
// @route   GET /api/complaints/search?location=Ghaziabad
// @access  Private
exports.searchByLocation = async (req, res, next) => {
  try {
    const { location } = req.query;

    if (!location) {
      return res.status(400).json({
        success: false,
        message: 'Please provide a location to search'
      });
    }

    // Case-insensitive partial match
    const complaints = await Complaint.find({
      location: { $regex: location, $options: 'i' }
    }).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: complaints.length,
      data: complaints
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get single complaint by ID
// @route   GET /api/complaints/:id
// @access  Private
exports.getComplaint = async (req, res, next) => {
  try {
    const complaint = await Complaint.findById(req.params.id);

    if (!complaint) {
      return res.status(404).json({
        success: false,
        message: 'Complaint not found'
      });
    }

    res.status(200).json({
      success: true,
      data: complaint
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update complaint status
// @route   PUT /api/complaints/:id
// @access  Private
exports.updateComplaint = async (req, res, next) => {
  try {
    const { status } = req.body;

    const complaint = await Complaint.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true, runValidators: true }
    );

    if (!complaint) {
      return res.status(404).json({
        success: false,
        message: 'Complaint not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Updated status shown',
      data: complaint
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete complaint
// @route   DELETE /api/complaints/:id
// @access  Private
exports.deleteComplaint = async (req, res, next) => {
  try {
    const complaint = await Complaint.findByIdAndDelete(req.params.id);

    if (!complaint) {
      return res.status(404).json({
        success: false,
        message: 'Complaint not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Complaint removed',
      data: {}
    });
  } catch (error) {
    next(error);
  }
};
