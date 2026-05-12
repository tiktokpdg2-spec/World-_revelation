const express = require('express');
const axios = require('axios');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static('.'));

// ══════════════════════════════════════════════════════════════════════════════════════════════════════
//  ENDPOINT: Agent Message Proxy
// ══════════════════════════════════════════════════════════════════════════════════════════════════════

app.post('/api/agent-message', async (req, res) => {
  try {
    const { agentKey, systemPrompt, userPrompt, conversationHistory } = req.body;

    const messages = [
      ...conversationHistory,
      { role: 'user', content: userPrompt }
    ];

    const response = await axios.post(
      'https://api.anthropic.com/v1/messages',
      {
        model: 'claude-sonnet-4-20250514',
        max_tokens: 200,
        system: systemPrompt,
        messages: messages
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': process.env.ANTHROPIC_API_KEY,
          'anthropic-version': '2023-06-01'
        }
      }
    );

    const reply = response.data.content?.[0]?.text || '...';
    res.json({ success: true, reply });
  } catch (err) {
    console.error('API Error:', err.message);
    res.status(500).json({ success: false, error: err.message });
  }
});

app.listen(port, () => {
  console.log(`🏛️  World Revelation server running on http://localhost:${port}`);
  console.log(`Ensure ANTHROPIC_API_KEY is set in your .env file`);
});