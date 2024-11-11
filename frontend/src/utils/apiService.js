// Fetch Data from TMDB API
export async function fetchAPIData(endpoint) {
  const API_KEY = import.meta.env.VITE_API_KEY;
  const API_URL = import.meta.env.VITE_API_URL;

  if (document.querySelector('.spinner')) {
    document.querySelector('.spinner').classList.add('show')
  }

  try {
    const response = await fetch(`${API_URL}${endpoint}?api_key=${API_KEY}&language=en-US&with_origin_country=US&with_original_language=en&sort_by=popularity.desc`);
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

// Fetch Data from TMDB API
export async function fetchCustomAPIData(endpoint, params) {
  const API_KEY = import.meta.env.VITE_API_KEY;
  const API_URL = import.meta.env.VITE_API_URL;

  if (document.querySelector('.spinner')) {
    document.querySelector('.spinner').classList.add('show')
  }
  console.log(`${API_URL}${endpoint}?api_key=${API_KEY}${params}`)
  try {
    const response = await fetch(`${API_URL}${endpoint}?api_key=${API_KEY}${params}`);
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

// Make request to search
export async function searchAPIData(global) {
  const API_KEY = import.meta.env.VITE_API_KEY;
  const API_URL = import.meta.env.VITE_API_URL;

  if (document.querySelector('.spinner')) {
    document.querySelector('.spinner').classList.add('show')
  }

  try {
    const response = await fetch(`${API_URL}search/${global.search.type}?api_key=${API_KEY}&language=en-US&query=${global.search.term}&page=${global.search.page}`);
    if (!response.ok) {
      throw new Error(`Error fetching data from endpoint /search: ${response.statusText}`);
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