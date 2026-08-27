const getApiBaseUrl = () => {
  if (import.meta.env.VITE_API_URL) {
    return import.meta.env.VITE_API_URL.replace(/\/+$/, '');
  }
  if (import.meta.env.VITE_BACKEND_URL) {
    const baseUrl = import.meta.env.VITE_BACKEND_URL.replace(/\/+$/, '');
    return baseUrl.endsWith('/api') ? baseUrl : `${baseUrl}/api`;
  }
  return 'http://localhost:3001/api';
};

const API_BASE_URL = getApiBaseUrl();

export async function fetchRecipes(category = 'all', search = '') {
  try {
    const params = new URLSearchParams();
    if (category && category !== 'all') params.append('category', category);
    if (search) params.append('search', search);

    const res = await fetch(`${API_BASE_URL}/recipes?${params.toString()}`);
    if (!res.ok) throw new Error('Failed to fetch recipes');
    return await res.json();
  } catch (error) {
    console.error('API error fetching recipes:', error);
    throw error;
  }
}

export async function fetchRecipeById(id) {
  try {
    const res = await fetch(`${API_BASE_URL}/recipes/${id}`);
    if (!res.ok) throw new Error('Recipe not found');
    return await res.json();
  } catch (error) {
    console.error('API error fetching recipe by id:', error);
    throw error;
  }
}

export async function addRecipe(recipeData) {
  try {
    const res = await fetch(`${API_BASE_URL}/recipes`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(recipeData)
    });

    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Failed to create recipe');
    return data;
  } catch (error) {
    console.error('API error adding recipe:', error);
    throw error;
  }
}

export async function signupUser(userData) {
  try {
    const res = await fetch(`${API_BASE_URL}/auth/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(userData)
    });

    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Signup failed');
    return data;
  } catch (error) {
    console.error('API error signing up:', error);
    throw error;
  }
}

export async function loginUser(credentials) {
  try {
    const res = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(credentials)
    });

    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Login failed');
    return data;
  } catch (error) {
    console.error('API error logging in:', error);
    throw error;
  }
}
