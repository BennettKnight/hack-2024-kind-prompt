// App.js
import React from 'react';
import ToneComparisonApp from './components/ToneComparisonApp';
import './reset.css';

function App() {
  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="container mx-auto px-4">
        <ToneComparisonApp />
      </div>
    </div>
  );
}

export default App;