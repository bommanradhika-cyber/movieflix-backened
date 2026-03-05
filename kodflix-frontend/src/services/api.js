// API Configuration
const API_BASE_URL = 'https://movieflix-backened-35vl-byt8ivcqy-bommanradhika-8910s-projects.vercel.app'

// Helper function for API calls
async function apiCall(endpoint, options = {}) {
  const url = `${API_BASE_URL}${endpoint}`
  const config = {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers
    },
    credentials: 'include',
    ...options
  }
  
  try {
    const response = await fetch(url, config)
    
    // Check if response is ok
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))
      throw new Error(errorData.message || `HTTP error! status: ${response.status}`)
    }
    
    const data = await response.json()
    return data
  } catch (error) {
    console.error('API Error:', error)
    if (error.message === 'Failed to fetch') {
      throw new Error('Failed to connect to backend. Error: ' + error.message)
    }
    throw error
  }
}

// Authentication API functions
export const authAPI = {
  // Register new user
  register: async (userData) => {
    return apiCall('/api/auth/register', {
      method: 'POST',
      body: JSON.stringify(userData)
    })
  },
  
  // Login user
  login: async (username, password) => {
    return apiCall('/api/auth/login', {
      method: 'POST',
      body: JSON.stringify({ username, password })
    })
  },
  
  // Logout user
  logout: async () => {
    return apiCall('/api/auth/logout', {
      method: 'POST'
    })
  },
  
  // Get user profile
  getProfile: async () => {
    return apiCall('/api/auth/profile', {
      method: 'GET'
    })
  }
}

export default authAPI
