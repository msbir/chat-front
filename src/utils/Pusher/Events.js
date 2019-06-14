import store from "../../store";
import router from '../../router/index'
import { newMessageNotification } from "../../views/helpers/notifications/newMessage";
import { subscribeToRoom } from "./Subscribe";
import eventBusService, {
  NEW_MSG_SENT
} from '../eventBusService.js';

/*
 * Listening to message sent Event
 * commit action for pushing the message to the messages array
 * notify the other user for a new message
 * push the message to the other user
 */

function storeMessageReceived(response, setNewMessage = false, sendAlert = false) {
  store.commit('SET_CONTACT_USER_DATA', response);
  store.commit('SET_PARTICIPANT_USER_DATA', response);
  store.commit('INSERT_ROOM_TO_ALL_ROOMS_ARRAY_ON_RECEIVED_MESSAGE', response);

  if(setNewMessage === true) {
      store.commit('SET_NEW_MESSAGE', { room_hash: response.room.hash, flag: true });
  }

  if(sendAlert === true) {
    newMessageNotification(response);
  }
}

export function messageReceivedEvent(channel) {
  channel.bind('App\\Events\\MessageSent', data => {
    store.dispatch('getRoomAndUserByMessageId', data).then((response) => {
      let amIAtTheMessageRoom = (store.getters.currentRoom !== response.room.hash || router.history.current.name !== 'chat');
      storeMessageReceived(response, amIAtTheMessageRoom, document.hasFocus());
    })
  });
}

/*
 * Listening to room created Event
 * subscribe to this room
 */
export function roomCreatedEvent(pusher, channel) {

  channel.bind('App\\Events\\RoomCreated', data => {
    subscribeToRoom(pusher, data.roomId);
  });

}

/*
 * Listening to room created Event
 * subscribe to this room
 */
export function readMessageEvent(channel) {
  channel.bind('App\\Events\\ReadMessage', data => {
    store.commit('SET_MESSAGE_HAS_BEEN_READ_FROM_CHANNEL', data);
  });

}
