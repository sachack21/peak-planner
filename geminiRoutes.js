// geminiRoutes.js

const express = require('express');
const axios = require('axios');

const router = express.Router();

// Route to handle generating an article from Gemini
router.post('/generate-article', async (req, res) => {
  const { query } = req.body;

  try {
    // Replace this URL with the actual Gemini API endpoint
    const response = await axios.post('https://api.gemini.com/generate-article', {
      prompt: `Generate an article on ${query} in India.`,
      model: 'Gemini', // Specify the model if needed
      max_tokens: 500,
    });

    res.status(200).json({ article: response.data });
  } catch (error) {
    console.error('Error fetching article from Gemini:', error);
    res.status(500).json({ error: 'Failed to generate article' });
  }
});

module.exports = router;
