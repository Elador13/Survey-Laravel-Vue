import axios from "axios";
import store from "./store"
import router from "./router";

const axiosClient = axios.create({
  withCredentials: true,
  baseURL: `${import.meta.env.VITE_API_BASE_URL}`,
});

// Інтерцептор - для того, щоб в кожен запрос додати заголовок з токеном
// axiosClient.interceptors.response.use({}, err => {
//   if (err.response.status === 401 || err.response.status === 419) {
//     if (store.state.user.token) {
//       store.dispatch('logout').then(r => {
//         router.push({name: 'Login'})
//       })
//     }
//   }
// });

// axiosClient.defaults.withCredentials = true;
export default axiosClient;
