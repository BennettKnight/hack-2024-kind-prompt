// components/PromptInput.js
import React from 'react';

const PromptInput = ({ prompt, setPrompt, onSubmit, loading }) => {
  const handleTextAreaChange = (e) => {
    setPrompt(e.target.value);
    // Auto-adjust height
    e.target.style.height = 'auto';
    e.target.style.height = e.target.scrollHeight + 'px';
  };

  return (
    <form onSubmit={onSubmit} className="prompt-form">
      <textarea
        className="input-field auto-resize"
        value={prompt}
        onChange={handleTextAreaChange}
        placeholder="Enter a prompt to test (e.g., 'Ask my boss for tomorrow off')"
        disabled={loading}
        rows={1}
        style={{
          resize: 'none',
          minHeight: '50px',
          overflow: 'hidden'
        }}
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