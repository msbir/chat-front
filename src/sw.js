workbox.skipWaiting();
workbox.clientsClaim();

const staticAssets = ["./", "./styles.css", "./app.js"];

const app_url = url();

/*
* open message channel with the client
* handle the onmessage event
* posting the message to the client
*/
function send_message_to_client(client, msg){
  return new Promise(function(resolve, reject){
    var msg_chan = new MessageChannel();

    msg_chan.port1.onmessage = function(event){
      if(event.data.error){
        reject(event.data.error);
      }else{
        resolve(event.data);
      }
    };
    client.postMessage(msg, [msg_chan.port2]);
  });
}

/*
* match all clients that register to the sw
* and fire a message to the client
*/
function send_message_to_all_clients(msg){
  clients.matchAll().then(clients => {
    clients.forEach(client => {
      send_message_to_client(client, msg).then(m => console.log("SW Received Message: "+m));
    })
  })
}

workbox.routing.registerRoute(
  /.*\.(png|jpg|jpeg|gif)/,
  workbox.strategies.cacheFirst({
    cacheName: "images",
    cacheExpiration: { maxEntries: 100, maxAgeSeconds: 12 * 60 * 60 },
    cacheableResponse: { statuses: [0, 200] }
  })
);

// create queue messages when offline
// when the app going online the message event will be fired
const bgSyncPlugin = new workbox.backgroundSync.Plugin("messagesQue", {
  // callbacks for the queue
  callbacks: {
    // trigger when queue start
    requestWillEnqueue: (storableRequest) => {
      console.log('requestWillEnqueue');
    },
    // trigger before queue replay
    requestWillReplay: (storableRequest) => {
      console.log('requestWillReplay');
    },
    // trigger after queue replay
    queueDidReplay: (storableRequestArray) => {
      send_message_to_all_clients('message sent to server');
    },
  },
  maxRetentionTime: 24 * 60 * 60 // Retry for max of 60 days
});

workbox.routing.registerRoute(
  app_url + "message/sendWhenOffline",
  workbox.strategies.networkOnly({
    plugins: [bgSyncPlugin]
  }),
  "POST"
);


// create push event notification
self.addEventListener("push", event => {
  const promiseChain = isClientFocused().then(clientIsFocused => {
    if (clientIsFocused) {
      console.log("Don't need to show a notification.");
      return;
    }
    const body = JSON.parse(event.data.text());
    //check if user is guest to render name or username
    const senderName = body.senderIsGuest ? body.senderfirstName + ' ' + body.senderLastName : body.senderUsername
    const title = "New message from " + senderName;
    const options = {
      body: body.data,
      icon: './static/img/logo.png',
      vibrate: [200, 100, 200, 100, 200, 100, 200],
      tag: body.tag,
      //sound:"URL string",
      renotify: true,
      data: {
        dateOfArrival: Date.now(),
        primaryKey: body.roomId
      },
      actions: [
        {
          action: "open",
          title: "View",
          icon: "images/checkmark.png"
        },
        {
          action: "close",
          title: "Close",
          icon: "images/xmark.png"
        }
      ]
    };

    return self.registration.showNotification(title, options, body.tag);
  });

  event.waitUntil(promiseChain);
});

self.addEventListener("notificationclick", event => {
  const notification = event.notification;
  const primaryKey = notification.data.primaryKey;
  const action = event.action;

  if (action === "close") {
    notification.close();
  } else {
    notification.close();

    // This looks to see if the current is already open and
    // focuses if it is
    event.waitUntil(clients.matchAll({
      type: 'window'
    }).then(function(clientList) {
      for (var i = 0; i < clientList.length; i++) {
        var client = clientList[i];
        // if the client IS in the app
        if(client){
          send_message_to_client(client, {message:'messageNotificationClicked', data:primaryKey});
          return client.focus();
        }
      }
        // if the client in NOT in the app
        return clients.openWindow(self.registration.scope + "#/chat/" + primaryKey);
    }));
  }
});

function isClientFocused() {
  return clients
    .matchAll({
      type: "window",
      includeUncontrolled: true
    })
    .then(windowClients => {
      let clientIsFocused = false;

      for (let i = 0; i < windowClients.length; i++) {
        const windowClient = windowClients[i];

        if (windowClient.focused) {
          clientIsFocused = true;
          break;
        }
      }

      return clientIsFocused;
    });
}



workbox.precaching.precacheAndRoute(self.__precacheManifest);
