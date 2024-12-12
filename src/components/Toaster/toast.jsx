// src/Toast.js
import React, { useEffect } from 'react';

const Toast = ({ message, type, removeToast }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      removeToast();
    }, 3000); // Toast disappears after 3 seconds

    return () => clearTimeout(timer);
  }, [removeToast]);

  const toastClasses = `fixed top-4 right-4 p-4 rounded-md text-white ${
    type === 'success' ? 'bg-green-500' : 'bg-red-500'
  }`;

  return (
    <div className={toastClasses}>
      <p>{message}</p>
    </div>
  );
};

export default Toast;
