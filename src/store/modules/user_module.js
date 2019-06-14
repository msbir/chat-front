import Vue from "vue";
import VueCookie from "vue-cookie";
Vue.use(VueCookie);
import { UserService, AuthService } from "../services";

const state = {
  profile: {},
  socket_id: '',
  token: Vue.cookie.get('token') || '',
  is_notifiable: false,
  isLoading: false,
  hasError: false
}

const getters = {
  profile: state => state.profile,
  token: state => state.token,
  socket_id: state => state.socket_id,
  is_notifiable: state => state.is_notifiable,
  error: state => state.hasError
}

const actions = {
  // Auth routes
  async createGuestAuth({ commit }) {
    await AuthService.register()
      .then(result => {
        setUserData({ commit }, result.data);
      }).catch(error => commit('SET_ERROR', error));
  },

  login({ commit }, data) {
    return AuthService.login(data)
      .then(result => {
        setUserData({ commit }, result.data);
        return result
      })
      .catch(error => {
        return error
      });
  },

  async register({ commit }, data) {
    await AuthService.register(data)
      .then(result => {
        setUserData({ commit }, result.data);
      })
      .catch(error => commit('SET_ERROR', error));
  },

  async fetchCurrentUser({ commit }, data) {
    await UserService.fetchCurrentUser(data)
      .then(result => {
        let user = result;
        commit('SET_USER', user)
        commit('RESET_ERROR')
      })
      .catch(error => {
        commit('SET_ERROR', error);
      });
  },

  // User routes
  registerGuestUser({ commit }, data) {
    return UserService.registerGuestUser(data)
      .then(result => {
        let user = result.data;
        user.is_guest = false;
        commit('SET_USER', user)
        return result
      })
      .catch(error => {
        return error
      });
  },

  registerInfo({ commit }, data) {
    return UserService.registerInfo(data)
      .then(result => {
        return result
      })
      .catch(error => {
        return error
      });

  },

  async logout({ commit, dispatch }) {
    Vue.cookie.delete('token');
    localStorage.chatkit_user_id = ''
    dispatch('clearStorage');
  },

  async clearStorage({ commit }) {
    window.indexedDB.deleteDatabase('localforage');
    window.indexedDB.deleteDatabase('workbox-background-sync');
    window.location.href = '/';
  }

}

function checkGuestUser(user) {
  return !!user.username.includes("Guest");
}

function setUserData({ commit }, data) {
  Vue.cookie.set('token', data.token, { expires: `${data.expires_in}m` })
  commit('SET_TOKEN', data.token)
  localStorage.chatkit_user_id = data.user.chat_id
  commit('SET_USER', data.user)
  commit('RESET_ERROR')
}

const mutations = {
  SET_USER(state, data) {
    state.profile = data;
  },
  SET_TOKEN(state, token) {
    state.token = token
  },
  SET_ERROR(state, data) {
    state.hasError = data
  },
  RESET_ERROR(state) {
    state.hasError = ''
  },
  USER_NOTIFABLE(state, data) {
    state.is_notifiable = data;
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}

