

const getHeaders = () => ({
  'Content-Type': 'application/json',
  Authorization: `Bearer ${localStorage.getItem('token')}`,
});

export const createShortUrl = async (originalUrl, customAlias, expiryDate) => {
  const res = await fetch(`https://cuts-j78n.onrender.com/api/url/shorten`, {
    method: 'POST',
    headers: getHeaders(),
    body: JSON.stringify({ originalUrl, customAlias, expiryDate }),
  });

  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.error || 'Failed to create short URL');
  }

  return res.json();
};

export const fetchUserUrls = async () => {
  const res = await fetch(`https://cuts-j78n.onrender.com/api/url/user`, {
    method: 'GET',
    headers: getHeaders(),
  });

  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.error || 'Failed to fetch user URLs');
  }

  return res.json();
};

export const getUrlAnalytics = async (shortId) => {
  const res = await fetch(`https://cuts-j78n.onrender.com/api/url/analytics/${shortId}`, {
    method: 'GET',
    headers: getHeaders(),
  });

  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.error || 'Failed to fetch analytics');
  }

  return res.json();
};
