import { ContactsService } from "../services";
import usersImgsutils from '../../views/Users/usersImgsutils.js'
import Vue from 'vue'

const state = {
  all: {},
  favorites: {}
};

const getters = {
  contacts: state => state.all,
  favorites: state => state.favorites
}

const actions = {
  getUsers({ commit }) {
    ContactsService.getUsers()
      .then(result => {
        let users = result.data.users;
        var myContacts = users.reduce(function (map, obj) {
          map[obj.chat_id] = obj;
          return map;
        }, {});
        Object.keys(myContacts).map(function (objectKey, index) {
          var value = myContacts[objectKey];
          myContacts[objectKey].avatarUrl = usersImgsutils.rollPhoto(objectKey);
        });
        commit('SET_CONTACTS', myContacts)
      })
      .catch(error => {
        commit('SET_ERROR', error);
      })
  },
  getFavorites({ commit }) {
    ContactsService.getFavorites().then(result => {
      let users = result.data.favorites;
      var myFavContacts = users.reduce(function (map, obj) {
        map[obj.chat_id] = obj;
        return map;
      }, {});
      commit('SET_FAVORITES', myFavContacts)
    })
      .catch(error => {
        commit('SET_ERROR', error);
      })
  },
  addRemoveFavorites({ commit }, user) {
    let data = {
      chat_id: user.chat_id,
    }
    return ContactsService.careateFavorites(data)
      .then(result => {
        commit('ADD_REMOVE_FAVORITE_USER', user);
        return result
      })
      .catch(error => {
        commit('SET_ERROR', error);
        return error;
      })
  }
}

const mutations = {
  SET_CONTACTS(state, users) {
    state.all = users;
  },
  SET_FAVORITES(state, users) {
    state.favorites = users;
  },
  ADD_REMOVE_FAVORITE_USER(state, user) {

    let userExist = _.has(state.favorites, user.chat_id);

    if (!userExist) {
      Vue.set(state.favorites, user.chat_id, user);
    } else {
      Vue.delete(state.favorites, user.chat_id);
    }

  },
  SET_CONTACT_USER_DATA(state, data) {
    let user = data.message.user;

    let userExist = _.has(state.all, user.chat_id);

    if (!userExist) {
      user.avatarUrl = usersImgsutils.rollPhoto(user.chat_id);
      Vue.set(state.all, user.chat_id, user);
    }

  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
