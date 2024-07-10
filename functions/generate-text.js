const axios = require('axios');

const API_KEY = process.env.CHATGPT_API_KEY;
const API_URL = 'https://api.openai.com/v1/engines/davinci-codex/completions';

exports.handler = async function (event, context) {
  const prompt = event.queryStringParameters.message;

  try {
    const response = await axios.post(API_URL, {
      prompt: "prompt",
      max_tokens: 1000
    },
    {
      headers: {
        'Authorization': `Bearer ${API_KEY}`,
        'Content-Type': 'application/json',
      }
    });

    return {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST",
        "Access-Control-Allow-Headers": "Content-Type"
      },
      body: JSON.stringify(response.data),
    };
  } catch (error) {
    console.error(error);
    return {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST",
        "Access-Control-Allow-Headers": "Content-Type"
      },
      body: JSON.stringify({ error: 'Failed to generate text' }),
    };
  }
};
