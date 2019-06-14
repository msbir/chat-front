require('workbox-sw');

const staticAssets = [
  './',
  './styles.css',
  './app.js'
];


const wb = new WorkBoxSw();

wb.precache(staticAssets);

/**
 * Network Falling Back to Cache
 * For requests that are updating frequently, the network first strategy is the ideal solution.
 * By default it will try and fetch the latest request from the network. If the request is successful,
 * it’ll put the response in the cache. If the network fails to return a response, the caches response will be used.
 */
wb.router.registerRoute('https://dev001.yoho.eu/(.*)', wb.strategies.networkFirst());


/**
 * If there is a Response in the cache, the Request will be fulfilled using the cached response,
 * the network will not be used at all. If there isn't a cached response, the Request will be fulfilled by a
 * a network request and the response will be cached so that the next request is served directly from the cache.
 */
wb.router.registerRoute(/.*\.(png|jpg|jpeg|gif)/, w.strategies.cacheFirst({
  cacheName: 'images',
  cacheExpiration: {maxEntries: 100, maxAgeSeconds: 12 * 60 * 60},
  cacheableResponse: { statuses: [0, 200]}
}));

/**
 The stale-while-revalidate pattern allows you to respond the request as quickly as possible with a
 cached response if available,
 falling back to the network request if it’s not cached. The network request is then used to update the cache.
 This is a fairly common strategy where having the most up-to-date resource is not vital to the application.
 */
wb.router.registerRoute(
  new RegExp('/images/avatars/'),
  workbox.strategies.staleWhileRevalidate()
);


/////////////////////////////////// QUES EXMP AVIV
/**
 * This will automatically Queue up failed requests and retry them when future sync events are fired.
 * @type {workbox.backgroundSync.Plugin}
 */
//Msgs Que
const bgSyncPlugin = new workbox.backgroundSync.Plugin('messagesQue', {
  maxRetentionTime: 24 * 60 * 60 // Retry for max of 60 days
});

wb.router.registerRoute(
  'https://dev001.yoho.eu/sendMessagesGateway(.*)',
  wb.strategies.networkOnly({
    plugins: [bgSyncPlugin]
  }),
  'POST'
);

//@todo, implement https://developers.google.com/web/tools/workbox/modules/workbox-broadcast-cache-update
