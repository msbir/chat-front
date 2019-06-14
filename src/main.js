// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
// files
import App from './App'
import router from './router'
import store from './store/index'

// packages
import VueCookie from 'vue-cookie';
import moment from 'moment';
import { EmojiPickerPlugin } from 'vue-emoji-picker';
import VueCarousel from 'vue-carousel';
import _ from 'lodash';

// utils
import { isLoggedIn, isAppWindowOpen } from './utils/Auth';
import { subscribeToPrivateChannelAndListenToEvents } from './utils/Pusher/Subscribe';
import initUser from './utils/Initialize_user'
import initPusher from './utils/Pusher/Instance'
import serviceWorker from './utils/service-worker/index';
import city from './utils/google/map_key';

// css
import './assets/appMain.css';



Vue.config.productionTip = false

Vue.use(VueCarousel);
Vue.use(VueCookie);
Vue.use(EmojiPickerPlugin);

Object.defineProperty(Vue.prototype, '$_', { value: _ });
Vue.prototype.moment = moment;

// making these methods public to all
Vue.mixin({
  methods: {
    initPusher: initPusher,
    initUser: initUser,
  },
  data() {
    return {
      deferredPrompt: ''
    }
  }
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App },
  async created() {

    isAppWindowOpen();
    city();
    if (isLoggedIn()) {
      // initialize service worker
      // create pusher var globally
      this.initPusher();
      serviceWorker();

      // fetch the registered user
      await this.$store.dispatch('fetchCurrentUser').then(() => {
        // get user rooms
        this.$store.dispatch('getRooms').then(() => {
          this.$store.dispatch('getUsers').then(() => { });
          this.initUser(this.$pusher)
        })
      })
    } else {
      // Handle guest user registration
      // create pusher var globally
      this.$store.dispatch('createGuestAuth').then(() => {
        // initialize service worker
        serviceWorker();
        this.$store.dispatch('getUsers').then(() => { });
        this.initPusher();
        // subscribe to the channels
        subscribeToPrivateChannelAndListenToEvents(this.$pusher);
      })
    }
  }
})

