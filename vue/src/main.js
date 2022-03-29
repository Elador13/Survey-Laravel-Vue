import { createApp } from 'vue'
import App from './App.vue'
import store from "./store";
import router from "./router";
import './index.css'

let app = createApp(App).use(store).use(router)

store.dispatch('user/getUserFromJWT')
  .then(() => {
    app.mount('#app');
  });
//
// createApp(App)
//   .use(store)
//   .use(router)
//   .mount('#app')
