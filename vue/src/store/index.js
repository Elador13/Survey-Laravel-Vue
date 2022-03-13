import { createStore } from "vuex";
import axiosClient from '../axios'

const store = createStore({
  state: {
    user: {
      data: {
        name: null,
        email: null
      },
      token: localStorage.getItem("X-XSRF-TOKEN"),
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
      return axiosClient
        .get(`/survey/${id}`)
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
      return axiosClient
        .get(`/api/survey-by-slug/${slug}`)
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
      return axiosClient.post(`/api/survey/${surveyId}/answer`, {answers})
    },
    deleteSurvey({}, id) {
      return axiosClient.delete(`/api/survey/${id}`);
    },
    async register({ commit }, user) {
      await axiosClient.get('/sanctum/csrf-cookie')
      await axiosClient.post('/register', user)
        .then(({data})=> {
          commit('setUser', data);
          return data;
        })
    },
    async login({ commit, dispatch }, user) {
      await axiosClient.get('/sanctum/csrf-cookie')
      await axiosClient.post('/login', user)
        .then((res)=> {
          localStorage.setItem('X-XSRF-TOKEN', res.config.headers['X-XSRF-TOKEN'])
          commit('setToken', res.config.headers['X-XSRF-TOKEN']);
          return res;
        })
      await dispatch('getUser')
    },

    getUser({commit}) {
      axiosClient.get('/api/user')
        .then(({data}) => {
          commit('setUser', data)
        })
        .catch(err => {
            return err
        })
    },

    // autoLogin({commit}) {
    //   axiosClient.get('/api/user').then(r => {
    //     commit('setUser', )
    //   });
    //   // if (localStorage.getItem('X-XSRF-TOKEN')) {
    //   //   commit('setUser', )
    //   // }
    // },
    logout({commit}) {
      return axiosClient.post('/logout')
        .then(response => {
          commit('logout');
          return response;
        });
    }
  },
  mutations: {
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
    logout: (state) => {
      state.user.data = {};
      state.user.token = null;
      localStorage.removeItem('X-XSRF-TOKEN');
    },
    setUser: (state, user) => {
      state.user.data = user;
    },
    setToken: (state, token) => {
      state.user.token = token;
      localStorage.setItem('X-XSRF-TOKEN', token)
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
