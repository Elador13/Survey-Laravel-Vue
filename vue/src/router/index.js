import {createRouter, createWebHistory} from "vue-router";
import Dashboard from "../views/Dashboard.vue";
import Surveys from "../views/Surveys.vue";
import ResponsesView from "../views/ResponsesView.vue";
import SurveyView from "../views/SurveyView.vue";
import Login from "../views/Login.vue";
import Register from "../views/Register.vue";
import Page404 from "../views/Page404.vue"
import DefaultLayout from "../components/DefaultLayout.vue";
import AuthLayout from "../components/AuthLayout.vue";
import SurveyPublicView from "../views/SurveyPublicView.vue";
import SurveyResponsesView from "../views/SurveyResponsesView.vue";
import SurveyResponseView from "../views/SurveyResponseView.vue";
import store from "../store";

const routes = [
  {
    path: '/view/survey/:slug',
    name: 'SurveyPublicView',
    component: SurveyPublicView
  },
  {
    path: '/',
    redirect: '/dashboard',
    component: DefaultLayout,
    //Вимагає авторизації користувача
    meta: {requiresAuth: true},
    children: [
      {path: '/dashboard', name: 'Dashboard', component: Dashboard},
      {path: '/surveys', name: 'Surveys', component: Surveys},
      {path: '/surveys/create', name: 'SurveyCreate', component: SurveyView},
      {path: '/surveys/:id', name: 'SurveyView', component: SurveyView},
      {path: '/surveys/:id/responses', name: 'SurveyResponsesView', component: SurveyResponsesView},
      {path: '/surveys/:id/responses/:respId', name: 'SurveyResponseView', component: SurveyResponseView},
      {path: '/responses', name: 'AllResponses', component: ResponsesView},
    ]
  },
  {
    path: '/auth',
    redirect: '/login',
    name: 'Auth',
    component: AuthLayout,
    meta: {isGuest: true},
    children: [
      {
        path: '/login',
        name: 'Login',
        component: Login
      },
      {
        path: '/register',
        name: 'Register',
        component: Register
      },
    ]
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'Page404',
    component: Page404
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  let token = localStorage.getItem('access_token');
  if (to.meta.requiresAuth && !token) {
    next({name: 'Login'});
  } else if (token && to.meta.isGuest) {
    next({name: 'Dashboard'});
  } else {
    next();
  }
})

export default router
