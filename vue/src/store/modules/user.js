import axiosClient from "../../axios";
import store from "../index";

const state = {
  user: {
    data: {},
    token: localStorage.getItem('access_token'),
  },
}

const actions = {
  getUserFromJWT({commit}) {
    commit('userFromJWT')
  },
  register({ commit }, user) {
    return axiosClient.post('/api/register', user)
      .then(({data})=> {
        commit('setToken', data.token);
        commit('setUser', data.user);
        return data;
      })
  },
  login({ commit }, user) {
    return axiosClient.post('/api/auth/login', user)
      .then((res) => {
        commit('setToken', res.data['access_token']);
        commit('setUser', res.data['user']);
        return res;
      }).catch(err => {
        throw err
      });
  },
  logout({commit}) {
    return axiosClient.post('/api/auth/logout')
      .then(response => {
        commit('logout');
        return response;
      });
  }
}

const mutations = {
  userFromJWT(state) {
    try {
      const {email, name} = JSON.parse(atob(state.user.token.split('.')[1]));
      store.state.user.user.data = {
        email,
        name
      }
    } catch (e) {
      return {};
    }
  },
  setUser: (state, user) => {
    state.user.data = user;
  },
  setToken: (state, token) => {
    localStorage.setItem('access_token', token)
    state.user.token = token;
  },
  logout: (state) => {
    state.user.data = {};
    state.user.token = null;
    localStorage.removeItem('access_token');
  },
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
