import React from 'react';
// import './LoadingSpinner.css'; // Optional: Add custom styling if needed

const LoadingSpinner = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-white z-50">
      <div className="flex space-x-2">
        <div className="w-3 h-3 bg-primary-500 rounded-full animate-pulse delay-[0ms]"></div>
        <div className="w-3 h-3 bg-primary-500 rounded-full animate-pulse delay-[200ms]"></div>
        <div className="w-3 h-3 bg-primary-500 rounded-full animate-pulse delay-[400ms]"></div>
      </div>
    </div>
  );
};

export default LoadingSpinner;
