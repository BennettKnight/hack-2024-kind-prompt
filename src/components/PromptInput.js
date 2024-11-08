// components/PromptInput.js
import React from 'react';

const PromptInput = ({ prompt, setPrompt, onSubmit, loading }) => {
  return (
    <form onSubmit={onSubmit} className="prompt-form">
      <input
        type="text"
        className="input-field"
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        placeholder="Enter a prompt to test (e.g., 'Ask my boss for tomorrow off')"
        disabled={loading}
      />
      <button 
        type="submit" 
        className="generate-button"
        disabled={loading}
      >
        {loading ? (
          <div className="loading-spinner" />
        ) : (
          'Generate'
        )}
      </button>
    </form>
  );
};

export default PromptInput;