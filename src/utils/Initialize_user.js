import { subscribeToPrivateChannelAndListenToEvents, subscribeToRoom } from "./Pusher/Subscribe";
import store from "../store";


const initializeUser = (pusher) => {

  // subscribe to the channels
  subscribeToPrivateChannelAndListenToEvents(pusher);

  // if user has rooms subscribe to them
  if (store.getters.rooms) {
    var roomsMap = store.getters.rooms
    for (var key in roomsMap) {
      subscribeToRoom(pusher, roomsMap[key].id);
    }
  }
}

export default initializeUser;
