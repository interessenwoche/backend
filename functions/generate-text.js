const openAI = require('openai');

const API_KEY = process.env.CHATGPT_API_KEY;
const prompt = "what is the capital of switzerland";

exports.handler = async function (event, context) {

  const openai = new openAI({
    apiKey: API_KEY,
  });

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: prompt}],
      temperature: 0,
      max_tokens: 1000,
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
  } catch (err) {
    console.error(error);
    return {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST",
        "Access-Control-Allow-Headers": "Content-Type"
      },
      body: JSON.stringify({ err: 'Failed to generate text' }),
    };
  }
};
