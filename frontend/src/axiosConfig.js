import axios from "axios";

axios.defaults.baseURL =
  process.env.NODE_ENV !== "production" ? "https://urban-eats.onrender.com" : "/";
