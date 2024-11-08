// components/ResponseSection.js
import React from 'react';
import './ResponseSection.css';

const ResponseSection = ({ originalPrompt, transformedPrompt, responseText, type, emoji, label }) => {
  return (
    <div className={`response-container ${type}-container`}>
      <div className="prompt-section">
        <div className="prompt-header">
          <span className="emoji">{emoji}</span>
          <span className="prompt-label">{label}</span>
        </div>
        
        <div className="user-prompt">
          <span className="emoji">💭</span>
          <p>Original Request: "{originalPrompt}"</p>
        </div>

        <div className="ai-prompt">
          <span className="emoji">🎭</span>
          <div className="ai-prompt-content">
            <p className="ai-prompt-label">How we asked:</p>
            <pre>{transformedPrompt}</pre>
          </div>
        </div>
        
        <div className="response-content">
          <div className="email-content">
            <p className="response-label">AI Response:</p>
            {responseText.split('\n').map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResponseSection;