// Fetch Data from TMDB API
export async function fetchAPIData(endpoint) {
  const API_KEY = import.meta.env.VITE_API_KEY;
  const API_URL = import.meta.env.VITE_API_URL;

  if (document.querySelector('.spinner')) {
    document.querySelector('.spinner').classList.add('show')
  }

  try {
    const response = await fetch(`${API_URL}${endpoint}?api_key=${API_KEY}&language=en-US`);
    if (!response.ok) {
      throw new Error(`Error fetching data from endpoint ${endpoint}: ${response.statusText}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('API fetch error:', error);
    throw error;
  } finally {
    if (document.querySelector('.spinner')) {
      document.querySelector('.spinner').classList.remove('show')
    }
  }
}