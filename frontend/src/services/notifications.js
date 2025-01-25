import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

export const sendNotification = async (data) => {
  const response = await axios.post(`${API_URL}/notifications/send`, data);
  return response.data;
};