import store from "../../store/index";
import {messageReceivedEvent, readMessageEvent, roomCreatedEvent} from "./Events";

/*
 * Subscribe to the user private channel
 * fire room created event
 */
export function subscribeToPrivateChannelAndListenToEvents(pusher){

  let channel = pusher.subscribe(`private-channel-${store.getters.profile.chat_id}`);

  roomCreatedEvent(pusher, channel);

}

/*
 * Subscription to room
 * listening to the message event
 */
export function subscribeToRoom(pusher, roomId){

  let channel = pusher.subscribe(`private-${roomId}`);

  messageReceivedEvent(channel);
  readMessageEvent(channel);

}
