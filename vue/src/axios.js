import axios from "axios";
import router from "./router";


const axiosClient = axios.create({
  baseURL: `${import.meta.env.VITE_API_BASE_URL}`,
  // withCredentials: true
});

// Інтерцептор - для того, щоб в кожен запрос додати заголовок з токеном
axiosClient.interceptors.request.use(
  config => {
    if (localStorage.getItem('access_token')) {
      config.headers.Authorization = `Bearer ${localStorage.getItem('access_token')}`;
    }
    return config
  });

axiosClient.interceptors.response.use(
  config => {
    if (localStorage.getItem('access_token')) {
      config.headers.Authorization = `Bearer ${localStorage.getItem('access_token')}`;
    }
    return config
  },
  error => {
    if (error.response.data.message === 'Token has expired') {
      return axios.post("http://localhost/api/auth/refresh", {}, {
        headers: {
          'authorization': `Bearer ${localStorage.getItem('access_token')}`
        }
      }).then(res => {
        localStorage.setItem('access_token', res.data.access_token)

        error.config.headers.authorization = `Bearer ${res.data.access_token}`;
        return axiosClient.request(error.config)
      });
    }
    else if (error.response.data.message === 'Token not provided') {
      router.push({name: 'Login'});
    }
    else if (error.response.status === 404) {
      router.push({name: 'Page404'});
      throw error
    }
    else throw error;
  });

export default axiosClient;
