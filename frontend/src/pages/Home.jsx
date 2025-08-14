import React, { useState } from 'react';
import { shortenUrl } from '../services/UrlService';
import Loading from '../components/loading/Loading';


const Home = () => {
  const [originalUrl, setOriginalUrl] = useState('');
  const [shortUrl, setShortUrl] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showForm, setShowForm] = useState(true);

  const handleSubmit = async (e) => {
    e.preventDefault();
    shortenUrl(originalUrl, setIsLoading, setShortUrl, setError, setShowForm);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(shortUrl);
    alert('URL copied to clipboard!');
  };

  const handleGenerateNew = () => {
    setOriginalUrl('');
    setShortUrl('');
    setError('');
    setShowForm(true);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white font-mono flex flex-col items-center justify-center px-4 relative overflow-hidden">
      {/* Matrix Background Effect */}
      {Array.from({ length: 50 }, (_, i) => (
        <span
          key={i}
          className="absolute text-xs text-blue-500 opacity-20"
          style={{
            left: `${Math.random() * 100}vw`,
            top: `${Math.random() * 100}vh`,
            animation: `pulse ${Math.random() * 4 + 1}s infinite ${Math.random() * 2}s`,
            fontSize: `${Math.random() * 12 + 8}px`,
          }}
        >
          {Math.random() > 0.5 ? '0' : '1'}
        </span>
      ))}
      <style>
        {`
          @keyframes pulse {
            0%, 100% { opacity: 0.1; }
            50% { opacity: 0.5; }
          }
        `}
      </style>

      {/* Header */}
      <div className="fixed top-4 left-4 z-20">
        <h2 className="text-xl font-semibold text-white">
          <span className="text-blue-500">{'<'}</span>
          URL Shortener
          <span className="text-blue-500">{'>'}</span>
        </h2>
      </div>

      <div className="w-full max-w-sm z-10">
        <h3 className="text-lg text-gray-300 mb-6 text-center">
          Shorten your URLs with ease
        </h3>

        {showForm ? (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex items-center space-x-2">
              <span className="text-blue-500 slide-in-left">{' >'}</span>
              <input
                type="url"
                value={originalUrl}
                onChange={(e) => setOriginalUrl(e.target.value)}
                placeholder="Enter your URL"
                className="flex-1 bg-transparent text-white border-b border-gray-500/50 focus:border-blue-500 outline-none py-2 transition-colors duration-300 placeholder-gray-400 slide-in-left"
                required
                aria-label="Enter your URL"
              />
            </div>
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-white text-black font-bold py-2 rounded-lg hover:bg-blue-500 hover:text-white transition-colors duration-200 disabled:bg-gray-500 slide-in-right"
            >
              {isLoading ? 'Shortening...' : 'Shorten URL'}
            </button>
          </form>
        ) : (
          <div className="space-y-4 text-center slide-in-left">
            <p className="text-green-500 font-medium">Shortened URL:</p>
            <a
              href={shortUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 underline truncate max-w-xs block mx-auto"
            >
              {shortUrl}
            </a>
            <p className="text-gray-400 text-sm">
              Click the link to visit or copy it to share. Generate a new URL anytime.
            </p>
            <button
              onClick={handleCopy}
              className="bg-blue-100 text-blue-600 px-4 py-2 rounded-lg hover:bg-blue-200 transition-all duration-200 transform hover:scale-105"
            >
              Copy URL
            </button>
            <button
              onClick={handleGenerateNew}
              className="w-full bg-white text-black font-bold py-2 rounded-lg hover:bg-blue-500 hover:text-white transition-colors duration-200 slide-in-right"
            >
              Generate New
            </button>
          </div>
        )}

        {isLoading && (
          <div className="mt-6 flex justify-center">
            <Loading />
          </div>
        )}

        {error && !isLoading && (
          <p className="mt-4 text-red-500 text-center">{error}</p>
        )}
      </div>
    </div>
  );
};

export default Home;