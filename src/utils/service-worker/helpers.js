import axios from "axios";
import store from "../../store";

let isSubscribed = false;
const applicationServerPublicKey = process.env.APP_SERVER_KEY;

export function urlB64ToUint8Array(base64String) {

  const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding)
    .replace(/\-/g, "+")
    .replace(/_/g, "/");

  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}

export function updateSubscriptionOnServer(subscription) {

  const subscribeData = JSON.parse(subscription);

  let data = {
    'endpoint': subscribeData.endpoint,
    'public_key': subscribeData.keys.p256dh,
    'auth_token': subscribeData.keys.auth,
  }

  let url = `${process.env.API_URL}subscription/`;

  axios.post(url, data, {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${store.getters.token}`
    }
  }).then(() => {
    store.commit('USER_NOTIFABLE', true);
  }).catch(() => {
    console.log('Could not update subscription on server')
  });
}

export function subscribeUser(subscribe, swReg) {

  isSubscribed = !(subscribe === null);

  if (isSubscribed) {
    updateSubscriptionOnServer(JSON.stringify(subscribe));
  } else {
    store.commit('USER_NOTIFABLE', false);
    swReg.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: urlB64ToUint8Array(applicationServerPublicKey)
    })
      .then(function (subscription) {
        updateSubscriptionOnServer(JSON.stringify(subscription));
      });
  }
}
