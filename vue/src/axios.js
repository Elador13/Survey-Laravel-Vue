import axios from "axios";
import store from "./store"

const axiosClient = axios.create({
  baseURL: "http://laravel-survey/api",
});

// Інтерцептор - для того, щоб в кожен запрос додати заголовок з токеном
axiosClient.interceptors.request.use(config => {
  config.headers.Authorization = `Bearer ${store.state.user.token}`;
  return config
});

export default axiosClient;
