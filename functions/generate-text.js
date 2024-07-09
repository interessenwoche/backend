const axios = require('axios');

const API_KEY = process.env.CHATGPT_API_KEY;
const API_URL = 'https://api.openai.com/v1/engines/davinci-codex/completions';

exports.handler = async function (event, context) {
  const query = event.queryStringParameters.query;

  try {
    const response = await axios.post(API_URL, {
      prompt: query,
      max_tokens: 100,
      stop: ['\n', '.', ',', '!', '?']
    }, {
      headers: {
        'Authorization': `Bearer ${API_KEY}`,
        'Content-Type': 'application/json',
      },
    });

    return {
      statusCode: 200,
      body: JSON.stringify(response.data),
    };
  } catch (error) {
    console.error(error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to generate text' }),
    };
  }
};
