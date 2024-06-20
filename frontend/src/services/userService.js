import axios from "axios";

export const getUser = () => {
  const user = localStorage.getItem("user");
  return user ? JSON.parse(user) : null;
};

export const login = async (email, password) => {
  const response = await axios.post("/api/users/login", { email, password });
  const user = response.data;
  localStorage.setItem("user", JSON.stringify(user));
  return user;
};

export const register = async (registerData) => {
  const { data } = await axios.post("/api/users/register", registerData);
  localStorage.setItem("user", JSON.stringify(data));
  return data;
};

export const logout = () => {
  localStorage.removeItem("user");
};

export const updateProfile = async (user) => {
  const {data} = await axios.put('/api/users/updateProfile', user);
  localStorage.setItem('user', JSON.stringify(data));
  return data;
};
