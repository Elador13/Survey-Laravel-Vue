import user from "./modules/user";
import survey from "./modules/survey";
import {createStore} from "vuex";

const store = createStore({
  modules: {
    user,
    survey
  }
})

export default store;
