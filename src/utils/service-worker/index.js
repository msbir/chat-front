import { subscribeUser } from './helpers'
import store from '../../store/index';

const serviceWorker = () => {

  if ("serviceWorker" in navigator && "PushManager" in window && location.port !== '9999') {

    navigator.serviceWorker.register("sw.js").then(function () {

      // wait for the service worker to be ready
      navigator.serviceWorker.ready.then(function (swReg) {

        // add onmessage event to receive messages from the service worker
        navigator.serviceWorker.addEventListener('message', function(event){
          // handle the message that sent when thw user if offline
          if(event.data === 'message sent to server'){
            store.dispatch('getRooms','offline')
          // handle the click new message notification
          }else if(event.data.message === 'messageNotificationClicked'){
            store.dispatch('setUserToReceiveChatRoom', event.data.data)
          }
          //event.ports[0].postMessage("Client 1 Says 'Hello back!'");
        });

        // check if user has already been subscribed
        swReg.pushManager.getSubscription().then(function (subscribe) {

          subscribeUser(subscribe, swReg);

        }).catch(function (err) {
          console.log("Failed to subscribe the user: ", err);
        })


      }).catch(function (err) {
        console.log("Service Worker not ready: ", err);
      })


    }).catch(function (error) {
      console.error("Service Worker Error", error);
    });


  } else {
    console.warn("Push messaging is not supported");
  }

}

export default serviceWorker;
