const { analyzeComplaint } = require('../utils/aiFallback');

// @desc    AI Complaint Analyzer - Analyze complaint using AI
// @route   POST /api/ai/analyze
// @access  Private
exports.analyzeComplaintAI = async (req, res, next) => {
  try {
    const { title, description, category } = req.body;

    // Validate input
    if (!title || !description || !category) {
      return res.status(400).json({
        success: false,
        message: 'Please provide title, description, and category for analysis'
      });
    }

    // Try OpenRouter API first, fallback to local algorithm
    let analysis;
    let source = 'local-fallback';

    if (process.env.OPENROUTER_API_KEY && process.env.OPENROUTER_API_KEY !== 'your_openrouter_api_key_here') {
      try {
        analysis = await callOpenRouterAPI(title, description, category);
        source = 'openrouter-ai';
      } catch (apiError) {
        console.warn('⚠️ OpenRouter API failed, using local fallback:', apiError.message);
        analysis = analyzeComplaint(title, description, category);
      }
    } else {
      // No API key configured, use local fallback
      analysis = analyzeComplaint(title, description, category);
    }

    res.status(200).json({
      success: true,
      message: 'Complaint analyzed successfully',
      source,
      data: {
        priority: analysis.priority,
        department: analysis.department,
        summary: analysis.summary,
        response: analysis.response
      }
    });
  } catch (error) {
    next(error);
  }
};

// Call OpenRouter API for AI analysis
async function callOpenRouterAPI(title, description, category) {
  const prompt = `You are a Smart Complaint Management System AI. Analyze the following complaint and provide a JSON response.

Complaint Title: ${title}
Complaint Description: ${description}
Complaint Category: ${category}

Respond with ONLY a valid JSON object (no markdown, no code blocks) with these exact keys:
{
  "priority": "High" or "Medium" or "Low",
  "department": "Recommended department name",
  "summary": "A brief 1-2 sentence summary of the complaint",
  "response": "A formal response message to the citizen acknowledging their complaint, including the priority level and expected timeline"
}`;

  const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${process.env.OPENROUTER_API_KEY}`,
      'HTTP-Referer': 'http://localhost:5000',
      'X-Title': 'Smart Complaint Management System'
    },
    body: JSON.stringify({
      model: 'openai/gpt-4o-mini',
      messages: [{ role: 'user', content: prompt }],
      temperature: 0.3,
      max_tokens: 500
    }),
    signal: AbortSignal.timeout(15000) // 15 second timeout
  });

  if (!response.ok) {
    throw new Error(`OpenRouter API error: ${response.status} ${response.statusText}`);
  }

  const data = await response.json();
  const content = data.choices[0]?.message?.content;

  if (!content) {
    throw new Error('Empty response from OpenRouter API');
  }

  // Parse the JSON response
  try {
    const parsed = JSON.parse(content.trim());
    return {
      priority: parsed.priority || 'Medium',
      department: parsed.department || 'General Administration Department',
      summary: parsed.summary || `Complaint regarding ${title}`,
      response: parsed.response || `Your complaint "${title}" has been received.`
    };
  } catch (parseError) {
    throw new Error('Failed to parse AI response as JSON');
  }
}
