// utils/api.js
import axios from 'axios';

const API_URL = 'https://api.openai.com/v1/chat/completions';
const API_KEY = process.env.REACT_APP_OPENAI_API_KEY;

// First, transform the user input into kind/rude prompts
async function transformUserInput(originalPrompt, tone) {
  const headers = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${process.env.REACT_APP_OPENAI_API_KEY}`
  };

  const promptForTransformation = tone === 'kind'
    ? "Convert this request into a polite, respectful, and kind way of asking: "
    : "Convert this request into a rude, entitled, and aggressive way of asking: ";

  try {
    const response = await axios.post(API_URL, {
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "user",
          content: `${promptForTransformation}${originalPrompt}`
        }
      ],
      temperature: 0.7,
      max_tokens: 150
    }, { headers });

    return response.data.choices[0].message.content.trim();
  } catch (error) {
    throw new Error(`Failed to transform prompt: ${error.message}`);
  }
}

// Then use the transformed prompts to get the final response
export async function generateResponse(prompt, tone) {
  if (!API_KEY) {
    throw new Error('OpenAI API key is not configured');
  }

  const headers = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${process.env.REACT_APP_OPENAI_API_KEY}`
  };

  try {
    // First, transform the user's input into a kind/rude prompt
    const transformedPrompt = await transformUserInput(prompt, tone);
    console.log('Transformed prompt:', { originalPrompt: prompt, transformedPrompt, tone });

    // Then use that transformed prompt to get the response
    const response = await axios.post(API_URL, {
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "user",
          content: transformedPrompt
        }
      ],
      temperature: 0.7,
      max_tokens: 150
    }, { headers });

    const responseText = response.data.choices[0].message.content.trim();
    console.log('Final Response:', { transformedPrompt, responseText, tone });

    return {
      transformedPrompt,
      responseText,
      type: tone
    };
  } catch (error) {
    console.error('API Error:', error);
    throw new Error(`Failed to generate response: ${error.message}`);
  }
}


