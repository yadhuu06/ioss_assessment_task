import React from 'react';
import './Loading.css';

const Loading = () => {
  return (
    <div className="loader">
      <div className="loader-circle"></div>
      <span className="loader-text">Shortening...</span>
    </div>
  );
};

export default Loading;