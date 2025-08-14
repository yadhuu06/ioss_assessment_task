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
    alert('Copied to clipboard!');
  };

  const handleGenerateNew = () => {
    setOriginalUrl('');
    setShortUrl('');
    setError('');
    setShowForm(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-indigo-950 text-white font-mono flex flex-col items-center justify-center px-4 relative overflow-hidden">
      {/* Subtle Matrix Background Effect */}
      {Array.from({ length: 30 }, (_, i) => (
        <span
          key={i}
          className="absolute text-xs text-cyan-600/20"
          style={{
            left: `${Math.random() * 100}vw`,
            top: `${Math.random() * 100}vh`,
            animation: `pulse ${Math.random() * 5 + 2}s infinite ${Math.random() * 3}s`,
            fontSize: `${Math.random() * 10 + 6}px`,
          }}
        >
          {Math.random() > 0.5 ? '0' : '1'}
        </span>
      ))}
      <style>
        {`
          @keyframes pulse {
            0%, 100% { opacity: 0.05; }
            50% { opacity: 0.15; }
          }
          @keyframes slideInLeft {
            from { transform: translateX(-50px); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
          }
          @keyframes slideInRight {
            from { transform: translateX(50px); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
          }
        `}
      </style>

      {/* Header */}
      <div className="fixed top-6 left-6 z-20">
        <h2 className="text-2xl font-bold text-white tracking-tight">
          <span className="text-cyan-400">{'<'}</span>
          URL Shortener
          <span className="text-cyan-400">{'>'}</span>
        </h2>
      </div>

      <div className="w-full max-w-md z-10 bg-gray-900/70 backdrop-blur-md rounded-2xl p-8 border border-purple-600/40 shadow-lg">
        <h3 className="text-xl text-gray-200 mb-8 text-center font-semibold tracking-wide">
          Transform Long URLs into Short Links
        </h3>

        {showForm ? (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="flex items-center space-x-3">
              <span
                className="text-cyan-400 text-lg"
                style={{ animation: 'slideInLeft 0.4s ease-out' }}
              >
                {' >'}
              </span>
              <input
                type="url"
                value={originalUrl}
                onChange={(e) => setOriginalUrl(e.target.value)}
                placeholder="Enter your URL"
                className="flex-1 bg-transparent text-white border-b-2 border-purple-600 focus:border-cyan-400 outline-none py-3 text-lg placeholder-gray-500 transition-all duration-300"
                style={{ animation: 'slideInLeft 0.4s ease-out' }}
                required
                aria-label="Enter your URL"
              />
            </div>
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-cyan-400 text-black font-bold py-3 rounded-lg hover:bg-purple-500 disabled:bg-gray-600 transition-all duration-300 transform hover:scale-105"
              style={{ animation: 'slideInRight 0.4s ease-out' }}
            >
              {isLoading ? 'Shortening...' : 'Shorten URL'}
            </button>
          </form>
        ) : (
          <div className="space-y-6 text-center">
            <p
              className="text-green-400 font-medium text-lg"
              style={{ animation: 'slideInLeft 0.4s ease-out' }}
            >
              Shortened URL:
            </p>
            <a
              href={shortUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-cyan-400 underline text-lg truncate max-w-xs block mx-auto hover:text-cyan-200 transition-colors duration-200"
              style={{ animation: 'slideInLeft 0.4s ease-out' }}
            >
              {shortUrl}
            </a>
            <p
              className="text-gray-400 text-sm leading-relaxed"
              style={{ animation: 'slideInLeft 0.4s ease-out' }}
            >
              Click to visit or copy it to share. Create a new short URL anytime.
            </p>
            <button
              onClick={handleCopy}
              className="bg-cyan-400/20 text-cyan-400 px-6 py-2 rounded-lg hover:bg-cyan-500/30 transition-all duration-200 transform hover:scale-105"
              style={{ animation: 'slideInLeft 0.4s ease-out' }}
            >
              Copy URL
            </button>
            <button
              onClick={handleGenerateNew}
              className="w-full bg-purple-500 text-white font-bold py-3 rounded-lg hover:bg-purple-400 transition-all duration-300 transform hover:scale-105"
              style={{ animation: 'slideInRight 0.4s ease-out' }}
            >
              Generate New
            </button>
          </div>
        )}

        {isLoading && (
          <div className="mt-8 flex justify-center">
            <Loading />
          </div>
        )}

        {error && !isLoading && (
          <p
            className="mt-6 text-red-500 text-center text-sm"
            style={{ animation: 'slideInLeft 0.4s ease-out' }}
          >
            {error}
          </p>
        )}
      </div>
    </div>
  );
};

export default Home;
