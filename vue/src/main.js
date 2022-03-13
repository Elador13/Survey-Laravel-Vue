import { createApp } from 'vue'
import store from "./store";
import router from "./router";
import './index.css'
import App from './App.vue'

let app = createApp(App).use(store).use(router);

if (store.state.user.token) {
  store.dispatch('getUser').then(() => {
    app.mount('#app')
  });
} else {
  app.mount('#app');
}
