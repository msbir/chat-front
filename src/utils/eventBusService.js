import Vue from 'vue';

//@todo are you sure we are still using NEW_MSG_SENT ?
export const NEW_MSG_SENT = 'new-msg-sent';
//export const PWA_INSTALL = 'pwa-install';
export const bus = new Vue({

  data: {
    PWA_INSTALL : 'pwa-install',
  },

  methods: {
    pwaInstall(e, description = '') {
      console.log(description);
      bus.$emit('pwa-install', e);
    }
  }
});

export default bus;
