import axios from 'axios';

// Create an instance of axios with the base URL of your backend
const api = axios.create({
  baseURL: 'http://localhost:5000/api', // Adjusted to include /api
  headers: {
    'Content-Type': 'application/json',
  },
});

export const fetchUsers = async () => {
  try {
    const response = await api.get('/users'); // Matches the backend route
    return response.data;
  } catch (error) {
    console.error('Error fetching users:', error);
    return [];
  }
};
