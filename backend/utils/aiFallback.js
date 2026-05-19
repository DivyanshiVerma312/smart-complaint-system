/**
 * Local Deterministic AI Fallback (Q5)
 * 
 * This module provides a keyword-based fallback for AI analysis
 * when the OpenRouter API is unavailable (rate limits, expired keys, etc.)
 * Ensures the demo always works perfectly during presentations.
 */

// Priority detection based on keywords in title + description
function detectPriority(title, description) {
  const text = `${title} ${description}`.toLowerCase();

  const highKeywords = [
    'urgent', 'emergency', 'danger', 'dangerous', 'fire', 'flood',
    'leakage', 'leak', 'collapse', 'accident', 'injury', 'death',
    'hazard', 'toxic', 'explosion', 'critical', 'severe', 'immediate',
    'broken main', 'electrocution', 'short circuit', 'gas leak'
  ];

  const mediumKeywords = [
    'broken', 'damaged', 'not working', 'malfunction', 'faulty',
    'delay', 'irregular', 'poor', 'bad', 'complaint', 'issue',
    'problem', 'disruption', 'outage', 'overflow', 'blocked',
    'cracked', 'worn out', 'deteriorated'
  ];

  if (highKeywords.some(kw => text.includes(kw))) return 'High';
  if (mediumKeywords.some(kw => text.includes(kw))) return 'Medium';
  return 'Low';
}

// Department recommendation based on category
function recommendDepartment(category) {
  const departmentMap = {
    'Water Supply': 'Water & Sewage Department',
    'Electricity': 'Power & Energy Department',
    'Sanitation': 'Sanitation & Waste Management Department',
    'Roads': 'Public Works & Road Department',
    'Public Safety': 'Law Enforcement & Public Safety Department',
    'Other': 'General Administration Department'
  };

  return departmentMap[category] || 'General Administration Department';
}

// Generate a concise summary from the description
function generateSummary(title, description) {
  const sentences = description.split(/[.!?]+/).filter(s => s.trim().length > 0);

  if (sentences.length <= 2) {
    return `Complaint regarding "${title}": ${description.trim()}`;
  }

  // Take the first two meaningful sentences
  const summary = sentences.slice(0, 2).map(s => s.trim()).join('. ');
  return `Complaint regarding "${title}": ${summary}.`;
}

// Generate an automatic response message
function generateResponse(title, priority, department) {
  const timelines = {
    'High': '24 hours',
    'Medium': '3-5 business days',
    'Low': '7-10 business days'
  };

  return `Dear Citizen,\n\nThank you for submitting your complaint regarding "${title}". Your complaint has been received and registered successfully.\n\nAfter analysis, your complaint has been classified as ${priority} Priority and has been forwarded to the ${department} for immediate attention.\n\nExpected resolution timeline: ${timelines[priority]}.\n\nYou can track your complaint status through our portal. We appreciate your patience and cooperation.\n\nRegards,\nSmart Complaint Management System`;
}

// Main fallback analysis function
function analyzeComplaint(title, description, category) {
  const priority = detectPriority(title, description);
  const department = recommendDepartment(category);
  const summary = generateSummary(title, description);
  const response = generateResponse(title, priority, department);

  return {
    priority,
    department,
    summary,
    response,
    source: 'local-fallback'
  };
}

module.exports = { analyzeComplaint };
