const API_URL = 'http://localhost:3000';

export const fetchData = async (endpoint: string) => {
  try {
    const response = await fetch(`${API_URL}/${endpoint}`);
    if (!response.ok) {
      throw new Error(`Error: ${response.statusText}`);
    }
    return await response.json();
  } catch (error) {
    console.error('API fetch error:', error);
    throw error;
  }
};