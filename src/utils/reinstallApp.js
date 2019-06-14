import store from '../store/index'

export function reinstallApp(withLogout = true, newVersion = null) {

  localStorage.removeItem('rooms');
  localStorage.removeItem('vuex');


  if (navigator.onLine) {
    navigator.serviceWorker.getRegistrations().then(
      function (registrations) {
        if (navigator.onLine) {
          for (let registration of registrations) {
            registration.unregister();
          }
        }
      }).then(() => {
        if (withLogout) {
          store.dispatch('logout').then(() => {
            localStorage.setItem('appVersion', newVersion || process.env.VERSION_TIMESTAMP);
          });
        } else {
          bootbox.hideAll();
          store.dispatch('clearStorage').then(() => {
            localStorage.setItem('appVersion', newVersion || process.env.VERSION_TIMESTAMP);
          });
        }
      })
  } else {
    localStorage.setItem('appVersion', newVersion || process.env.VERSION_TIMESTAMP);
    window.location.href = '/';
  }

}
