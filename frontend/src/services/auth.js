import axios from 'axios';

const API_URL = 'http://localhost:5000/api/auth';

export const login = async (email, password) => {
  try {
    const response = await axios.post(`${API_URL}/login`, { email, password });
    
    return response.data;  // { token, user }
  } catch (error) {
    throw error.response ? error.response.data : 'An error occurred while logging in.';
  }
};

export const register = async (name, email, password, phoneNumber, role) => {
  try {
    const response = await axios.post(`${API_URL}/register`, { name, email, password, phoneNumber, role });
    
    return response.data;  // { message, user }
  } catch (error) {
    throw error.response ? error.response.data : 'An error occurred while registering.';
  }
};
