import React, { useState } from 'react';
import Loading from './Loading';

const Home = () => {
  const [originalUrl, setOriginalUrl] = useState('');
  const [shortUrl, setShortUrl] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setShortUrl('');
    setIsLoading(true);

    try {
      const response = await fetch('http://localhost:8000/shorten/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ original_url: originalUrl }),
      });
      const data = await response.json();
      setIsLoading(false);
      if (response.ok) {
        setShortUrl(data.short_url);
      } else {
        setError('Failed to shorten URL. Please try again.');
      }
    } catch (err) {
      setIsLoading(false);
      setError('An error occurred. Please try again.');
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(shortUrl);
    alert('URL copied to clipboard!');
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-xl shadow-md p-8">
        <h1 className="text-3xl font-bold text-center text-blue-600 mb-2 font-sans">
          URL Shortener
        </h1>
        <p className="text-center text-gray-600 mb-6 font-sans">
          Shorten your long URLs quickly and easily
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="url"
            value={originalUrl}
            onChange={(e) => setOriginalUrl(e.target.value)}
            placeholder="Enter your URL"
            className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
            required
          />
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 disabled:bg-blue-400 transition-all duration-200 font-sans font-medium"
          >
            {isLoading ? 'Shortening...' : 'Shorten URL'}
          </button>
        </form>

        {isLoading && (
          <div className="mt-6 flex justify-center">
            <Loading />
          </div>
        )}

        {shortUrl && !isLoading && (
          <div className="mt-6 text-center">
            <p className="text-green-600 font-medium mb-2">Shortened URL:</p>
            <div className="flex items-center justify-center space-x-2">
              <a
                href={shortUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 underline truncate max-w-xs"
              >
                {shortUrl}
              </a>
              <button
                onClick={handleCopy}
                className="bg-blue-100 text-blue-600 px-3 py-1 rounded-lg hover:bg-blue-200 transition-all duration-200 transform hover:scale-105"
              >
                Copy
              </button>
            </div>
          </div>
        )}

        {error && !isLoading && (
          <p className="mt-4 text-red-600 text-center font-sans">{error}</p>
        )}
      </div>
    </div>
  );
};

export default Home;