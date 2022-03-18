import { createStore } from "vuex";
import axiosClient from '../axios'

const store = createStore({
  state: {
    user: {
      data: {},
      token: localStorage.getItem('access_token'),
    },
    dashboard: {
      loading: false,
      data: {}
    },
    currentSurvey:
      {
        loading: false,
        data: {}
      },
    surveys: {
      loading: false,
      data: [],
      links: []
    },
    questionTypes: ['text', 'select', 'radio', 'checkbox', 'textarea'],
    notification: {
      show: false,
      message: null,
      type: null
    }
  },
  getters: {},
  actions: {
    getUserFromJWT({commit}) {
      commit('userFromJWT')
    },
    getDashboardData({commit}) {
      commit('dashboardLoading', true)
      return axiosClient.get('/api/dashboard')
        .then((res) => {
          commit('dashboardLoading', false)
          commit('setDashboardData', res.data)
          return res
        })
        .catch(error => {
          commit('dashboardLoading', false)
          return error
        });
    },
    getSurveys({commit}, {url = null} = {}) {
      url = url || '/api/survey'
      commit('setSurveysLoading', true);
      return axiosClient.get(url).then((res) => {
        commit('setSurveysLoading', false);
        commit('setSurveys', res.data);
        return res;
      })
    },
    getSurvey({commit}, id) {
      commit('setCurrentSurveyLoading', true);
      return axiosClient.get(`/api/survey/${id}`)
        .then((res) => {
          commit('setCurrentSurvey', res.data);
          commit('setCurrentSurveyLoading', false);
          return res;
        })
        .catch((err) => {
          commit('setCurrentSurveyLoading', false);
          throw err;
        })
    },
    getSurveyBySlug({ commit }, slug) {
      commit('setCurrentSurveyLoading', true);
      return axiosClient.get(`/api/survey-by-slug/${slug}`)
        .then((res) => {
          commit('setCurrentSurvey', res.data);
          commit('setCurrentSurveyLoading', false);
          return res;
        })
        .catch((err) => {
          commit('setCurrentSurveyLoading', false);
          throw err;
        })
    },
    saveSurvey({commit}, survey) {
      delete survey.image_url;
      let response
      //Update survey
      if (survey.id) {
        response = axiosClient
          .put(`/api/survey/${survey.id}`, survey)
          .then((res) => {
            commit('setCurrentSurvey', res.data)
            return res;
          });
      //Create new survey
      } else {
        response = axiosClient.post('/api/survey', survey).then((res)=>{
          commit('setCurrentSurvey', res.data);
          return res;
        })
      }
      return response;
    },
    saveSurveyAnswer({commit}, {surveyId, answers}) {
      return axiosClient.post(`/api/survey/${surveyId}/response`, {answers})
    },
    deleteSurvey({}, id) {
      return axiosClient.delete(`/api/survey/${id}`);
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
  },
  mutations: {
    userFromJWT(state) {
      try {
        const {email, name} = JSON.parse(atob(state.user.token.split('.')[1]));
        store.state.user.data = {
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
    dashboardLoading: (state, loading) => {
      state.dashboard.loading = loading;
    },
    setDashboardData: (state, data) => {
      state.dashboard.data = data
    },
    setCurrentSurveyLoading: (state, loading) => {
      state.currentSurvey.loading = loading
    },
    setCurrentSurvey: (state, survey) => {
      state.currentSurvey.data = survey.data
    },
    setSurveysLoading: (state, loading) => {
      state.surveys.loading = loading
    },
    setSurveys: (state, surveys) => {
      state.surveys.links = surveys.meta.links;
      state.surveys.data = surveys.data;
    },
    notify(state, {message, type}) {
      state.notification.show = true;
      state.notification.type = type;
      state.notification.message = message;
      setTimeout(() => {
        state.notification.show = false;
      }, 3000);
    },
  },
  modules: {},
});

export default store;
