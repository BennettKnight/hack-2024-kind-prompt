// App.js
import React from 'react';
import ToneComparisonApp from './components/ToneComparisonApp';
import './reset.css';

function App() {
  return (
    <div className="min-h-screen w-full" style={{ background: '#090919' }}>
      <div className="container mx-auto px-4 py-8">
        <ToneComparisonApp />
      </div>
    </div>
  );
}

export default App;