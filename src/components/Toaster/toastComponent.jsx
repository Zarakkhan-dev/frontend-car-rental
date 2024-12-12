// src/ToastContainer.js
import React, { useState } from 'react';
import Toast from './toast';


const ToastContainer = () => {
  const [toasts, setToasts] = useState([]);

  const addToast = (message, type) => {
    const id = new Date().getTime();
    setToasts((prevToasts) => [
      ...prevToasts,
      { id, message, type },
    ]);
  };

  const removeToast = (id) => {
    setToasts((prevToasts) => prevToasts.filter((toast) => toast.id !== id));
  };

  return (
    <div>
      {toasts.map((toast) => (
        <Toast
          key={toast.id}
          message={toast.message}
          type={toast.type}
          removeToast={() => removeToast(toast.id)}
        />
      ))}
    </div>
  );
};

export default ToastContainer;
