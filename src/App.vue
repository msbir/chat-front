<template>
  <div id="app">
    <transition name="slide-fade" mode="out-in">
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
import Store from './store/index';
import Router from './router/index';
import BusService from './utils/eventBusService';

export default {
  name: 'app',

  created() {
    //signing to online/offline event
    window.addEventListener('load', function() {
      function updateOnlineStatus(event) {
        var condition = navigator.onLine;
        Store.dispatch('getOnlineStatus', condition)
      }
      window.addEventListener('online', updateOnlineStatus);
      window.addEventListener('offline', updateOnlineStatus);
    });
    // listening if user change url
    /*function HashHandler() {
      if (Router.history.current.name === 'chat') {
        bootbox.alert('Can not change URL address');
        Router.push('/unauthorized');
      }
    }

    window.addEventListener('hashchange', HashHandler, false);*/

    window.addEventListener('beforeinstallprompt', e => {
      e.preventDefault();
      BusService.pwaInstall(e, 'beforeinstallprompt fired, preventing default');
      //BusService.$emit(PWA_INSTALL, e);
    });

    window.addEventListener('appinstalled', evt => {
      BusService.pwaInstall('', 'appinstalled fired');
      //BusService.$emit(PWA_INSTALL, '');
    });
  },

  methods: {}
};
</script>

<style scoped>
</style>
