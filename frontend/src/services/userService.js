import axios from "axios";

export const getUser = () => {
  const user = localStorage.getItem('user');
  return user ? JSON.parse(user) : null;
};

export const login = async (email, password) => {
  const response = await axios.post('/api/users/login', { email, password });
  const user = response.data;
  localStorage.setItem('user', JSON.stringify(user));
  return user;
};

export const logout = () => {
  localStorage.removeItem('user');
};
