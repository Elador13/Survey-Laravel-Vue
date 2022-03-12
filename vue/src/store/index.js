import { createStore } from "vuex";
import axiosClient from '../axios'

const store = createStore({
  state: {
    user: {
      data: {
        name: null,
        email: null
      },
      token: sessionStorage.getItem("TOKEN"),
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
      console.log('test')
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
      url = url || '/survey'
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
        .get(`/survey-by-slug/${slug}`)
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
          .put(`/survey/${survey.id}`, survey)
          .then((res) => {
            commit('setCurrentSurvey', res.data)
            return res;
          });
      //Create new survey
      } else {
        response = axiosClient.post('/survey', survey).then((res)=>{
          commit('setCurrentSurvey', res.data);
          return res;
        })
      }
      return response;
    },
    saveSurveyAnswer({commit}, {surveyId, answers}) {
      return axiosClient.post(`/survey/${surveyId}/answer`, {answers})
    },
    deleteSurvey({}, id) {
      return axiosClient.delete(`/survey/${id}`);
    },
    async register({ commit }, user) {
      await axiosClient.get('/sanctum/csrf-cookie')
      await axiosClient.post('/register', user)
        .then(({data})=> {
          commit('setUser', data);
          return data;
        })
    },
    async login({ commit }, user) {
      await axiosClient.get('/sanctum/csrf-cookie')
      await axiosClient.post('/login', user)
        .then(({data})=> {
          commit('setUser', data);
          return data;
        })
    },
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
      sessionStorage.removeItem('TOKEN');
    },
    setUser: (state, userData) => {
      state.user.token = userData.token;
      state.user.data = userData.user;
      sessionStorage.setItem("TOKEN", userData.token);
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
