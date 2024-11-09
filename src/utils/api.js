// utils/api.js
import axios from 'axios';

const OPENAI_API_URL = 'https://api.openai.com/v1/chat/completions';
const CLAUDE_API_URL = 'https://api.anthropic.com/v1/messages';

// First, transform the user input into kind/rude prompts
async function transformUserInput(originalPrompt, tone, model) {
  const headers = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${process.env.REACT_APP_OPENAI_API_KEY}`
  };

  const promptForTransformation = tone === 'kind'
    ? "Convert this request into a polite, respectful, and kind way of asking: "
    : "Convert this request into a rude, entitled, and aggressive way of asking: ";

  try {
    const response = await axios.post(OPENAI_API_URL, {
      model: model === 'claude-3.5' ? 'claude-3-sonnet-20240229' : model === 'gpt-4' ? 'gpt-4' : 'gpt-3.5-turbo',
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
export async function generateResponse(prompt, tone, model) {
  if (!process.env.REACT_APP_OPENAI_API_KEY && !process.env.REACT_APP_ANTHROPIC_API_KEY) {
    throw new Error('API key is not configured');
  }

  const isClaudeModel = model.includes('claude');
  const apiUrl = isClaudeModel ? CLAUDE_API_URL : OPENAI_API_URL;
  
  try {
    // Add timeout for Mobile Safari
    const axiosConfig = {
      headers: isClaudeModel ? {
        'Content-Type': 'application/json',
        'x-api-key': process.env.REACT_APP_ANTHROPIC_API_KEY,
        'anthropic-version': '2023-06-01'
      } : {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.REACT_APP_OPENAI_API_KEY}`
      },
      timeout: 30000, // 30 second timeout
    };

    const transformedPrompt = await transformUserInput(prompt, tone, model);
    
    const requestBody = isClaudeModel ? {
      model: 'claude-3-sonnet-20240229',
      max_tokens: 150,
      messages: [{
        role: 'user',
        content: transformedPrompt
      }]
    } : {
      model: model === 'gpt-4' ? 'gpt-4' : 'gpt-3.5-turbo',
      messages: [{
        role: 'user',
        content: transformedPrompt
      }],
      temperature: 0.7,
      max_tokens: 150
    };

    const response = await axios.post(apiUrl, requestBody, axiosConfig);

    return {
      transformedPrompt,
      responseText: isClaudeModel ? response.data.content[0].text : response.data.choices[0].message.content.trim(),
      type: tone
    };
  } catch (error) {
    // Enhanced error logging for Mobile Safari
    console.error('API Error Details:', {
      message: error.message,
      stack: error.stack,
      response: error.response?.data,
      status: error.response?.status,
      headers: error.response?.headers,
      userAgent: window.navigator.userAgent
    });

    // Specific error messages for common Mobile Safari issues
    if (error.code === 'ECONNABORTED') {
      throw new Error('Request timed out. Please check your connection and try again.');
    }
    
    if (error.response?.status === 403) {
      throw new Error('Access denied. Please check your API credentials.');
    }

    throw new Error(`Request failed: ${error.message}`);
  }
}


