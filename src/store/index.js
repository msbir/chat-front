import Vue from 'vue'
import Vuex from 'vuex'
import VuexPersistence from 'vuex-persist';
import localForage from "localforage";
// modules
import Room from './modules/room_module'
import User from './modules/user_module'
import Contacts from './modules/contacts_module'



const vuexPersist = new VuexPersistence({
  strictMode: true, // This **MUST** be set to true
  storage: localForage,
  saveState: (key, state, storage) => Promise.resolve(storage.setItem(key, JSON.stringify(state))),
  restoreState: (key, storage) => Promise.resolve(storage.getItem(key)).then((value) => {
    if (value != '' && value != null) {
      return JSON.parse(value);
    }
    else {
      return value;
    }
  })
})

Vue.use(Vuex)

export default new Vuex.Store({


  state: {
    onlineStatus: true,
  },
  getters: {
    getOnlineStatus(state) {
      return state.onlineStatus;
    }
  },
  mutations: {
    getOnlineStatus(state, payload) {
      state.onlineStatus = payload.payload;
    },
    RESTORE_MUTATION: vuexPersist.RESTORE_MUTATION // this mutation **MUST** be named "RESTORE_MUTATION"
  },
  actions: {
    getOnlineStatus(context, payload) {
      context.commit({
        type: 'getOnlineStatus',
        payload
      });
    }
  },
  modules: {
    Room,
    User,
    Contacts,
  },
  plugins: [vuexPersist.plugin]
})
