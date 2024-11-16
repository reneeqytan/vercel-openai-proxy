// api/chatgpt.js
import axios from 'axios';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { prompt } = req.body;

    // Access the OpenAI API key from the environment variable
    const apiKey = process.env.OPENAI_API_KEY;

    if (!apiKey) {
      return res.status(500).json({ error: 'API Key is not set in environment variables' });
    }

    try {
      const response = await axios.post('https://api.openai.com/v1/chat/completions', {
        model: 'gpt-3.5-turbo',
        messages: [{ "role": "user", "content": prompt }],
      }, {
        headers: {
          'Authorization': `Bearer ${apiKey}`,  // Use the environment variable here
          'Content-Type': 'application/json',
        },
      });

      // Return the response from ChatGPT
      res.status(200).json(response.data);
    } catch (error) {
      res.status(500).json({ error: 'Failed to communicate with OpenAI API' });
    }
  } else {
    res.status(405).json({ error: 'Method Not Allowed' });
  }
}
