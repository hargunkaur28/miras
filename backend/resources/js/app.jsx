import '../css/app.css';
import React from 'react';
import ReactDOM from 'react-dom/client';

// Simple placeholder component
function App() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">MSIRMS</h1>
        <p className="text-gray-600">Frontend is loading...</p>
      </div>
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
