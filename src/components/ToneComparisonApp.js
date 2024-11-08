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

  return (
    <div className="app-container">
      <div className="content-wrapper">
        <h1 className="app-title">Does it pay off to be kind?</h1>
        <p className="subtitle">
          Transform your message into different tones and see the impact of your words.
          Experiment with kind and not-so-kind versions of the same message.
        </p>
        
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
        <p className="footer-text">Made with kindness by</p>
        <img 
          src="/assets/logos/ae-studio.svg" 
          alt="AE.STUDIO" 
          className="footer-logo"
        />
      </a>
    </div>
  );
}

export default ToneComparisonApp;