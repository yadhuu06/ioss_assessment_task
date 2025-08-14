export const shortenUrl = async (originalUrl, setIsLoading, setShortUrl, setError, setShowForm) => {
  setError('');
  setIsLoading(true);

  try {
    const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}shorten/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ original_url: originalUrl }),
    });
    const data = await response.json();

    setTimeout(() => {
      setIsLoading(false);
      if (response.ok) {
        setShortUrl(data.short_url);
        setShowForm(false);
      } else {
        setError('Failed to shorten URL. Please try again.');
      }
    }, 2000);
  } catch (err) {
    setTimeout(() => {
      setIsLoading(false);
      setError('An error occurred. Please try again.');
    }, 2000);
  }
};