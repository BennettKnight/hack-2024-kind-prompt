// components/PromptInput.js
import React from 'react';

const PromptInput = ({ prompt, setPrompt, onSubmit, loading, selectedModel, setSelectedModel }) => {
  const handleTextAreaChange = (e) => {
    setPrompt(e.target.value);
    // Auto-adjust height
    e.target.style.height = 'auto';
    e.target.style.height = e.target.scrollHeight + 'px';
  };

  const models = [
    { id: 'gpt-3.5', name: 'ChatGPT 3.5' },
    { id: 'gpt-4', name: 'ChatGPT 4.0' },
    { id: 'claude-3.5', name: 'Claude 3.5 Sonnet' }
  ];

  return (
    <form onSubmit={onSubmit} className="prompt-form">
      <textarea
        className="input-field auto-resize"
        value={prompt}
        onChange={handleTextAreaChange}
        placeholder="Enter your prompt to see kind and unkind versions"
        disabled={loading}
        rows={1}
        style={{
          resize: 'none',
          minHeight: '50px',
          overflow: 'hidden'
        }}
      />
      <div className="model-selector-container">
        <select
          value={selectedModel}
          onChange={(e) => setSelectedModel(e.target.value)}
          className="model-selector"
          disabled={loading}
        >
          {models.map(model => (
            <option key={model.id} value={model.id}>
              {model.name}
            </option>
          ))}
        </select>
      </div>
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