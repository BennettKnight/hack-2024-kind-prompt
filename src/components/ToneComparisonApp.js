// components/ToneComparisonApp.js
import React, { useState } from 'react';
import PromptInput from './PromptInput';
import ResponseSection from './ResponseSection';
import './ToneComparisonApp.css';
import { generateResponse } from '../utils/api';

function ToneComparisonApp() {
  const [input, setInput] = useState('');
  const [responses, setResponses] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedModel, setSelectedModel] = useState('gpt-3.5');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    if (!input.trim()) {
      setError('Please enter some text to transform');
      setIsLoading(false);
      return;
    }

    try {
      const [kindResponse, rudeResponse] = await Promise.all([
        generateResponse(input, 'kind', selectedModel),
        generateResponse(input, 'rude', selectedModel)
      ]);

      const formattedResponses = [
        {
          originalPrompt: input,
          transformedPrompt: kindResponse.transformedPrompt,
          responseText: kindResponse.responseText,
          type: 'kind',
          emoji: '😊',
          label: 'Respectful Version'
        },
        {
          originalPrompt: input,
          transformedPrompt: rudeResponse.transformedPrompt,
          responseText: rudeResponse.responseText,
          type: 'rude',
          emoji: '😠',
          label: 'Rude Version'
        }
      ];

      setResponses(formattedResponses);
    } catch (error) {
      console.error('Error details:', error);
      setError(error.message || 'Failed to generate responses. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  // Update schema markup
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "Kind Prompting",
    "description": "Transform your messages to discover the impact of kind communication.",
    // ... rest of schema ...
  };

  return (
    <div className="app-container">
      <div className="content-wrapper">
        <img 
          src={process.env.PUBLIC_URL + '/assets/logos/kind-prompting-logo.png'}
          alt="Kind Prompting Logo"
          className="app-logo"
          width="92"
          height="92"
        />
        
        <div className="hero-section">
          <h1>Kind Prompting</h1>
          <div className="hero-content">
            <p>
              Did you know nearly <a href="https://www.lifewire.com/speak-politely-to-ai-8714470" target="_blank" rel="noopener noreferrer">48% of Americans</a> believe politeness matters when interacting with AI? In fact, <a href="https://www.lifewire.com/speak-politely-to-ai-8714470" target="_blank" rel="noopener noreferrer">39% worry</a> that their behavior toward AI might be remembered or used against them. Discussions on platforms like <a href="https://direct.mit.edu/dint/article/6/2/344/120373/Public-Opinions-on-ChatGPT-An-Analysis-of-Reddit" target="_blank" rel="noopener noreferrer">Reddit</a> also reveal that users are actively exploring how tone impacts AI responses.
            </p>
            <p>
              With Kind Prompting, you can see the difference tone makes. Compare kind and unkind versions of your message to uncover how tone transforms interactions—whether with machines or people.
            </p>
          </div>
        </div>

        <div className="input-container">
          <PromptInput
            prompt={input}
            setPrompt={setInput}
            onSubmit={handleSubmit}
            loading={isLoading}
            selectedModel={selectedModel}
            setSelectedModel={setSelectedModel}
          />
        </div>

        {error && (
          <div className="error-message">
            {error}
          </div>
        )}
        
        <div className="responses-container">
          {responses.length > 0 && responses.map((response, index) => (
            <div key={index} className="response-column">
              <ResponseSection {...response} />
            </div>
          ))}
        </div>
      </div>

      <a 
        href="https://ae.studio/" 
        target="_blank" 
        rel="noopener noreferrer" 
        className="footer"
      >
        <p className="footer-text">Made with ❤️ by AE Studio</p>
      </a>
    </div>
  );
}

export default ToneComparisonApp;