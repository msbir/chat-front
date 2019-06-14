import moment from "moment";

export function findIfExist(state, key, needle) {

  let existed = false;
  state.forEach(function (sandwich, index) {
    if (sandwich[key] === needle[key]) {
      existed = index;
    }
  });
  return existed;

}

export function updateOrNew(state, key, needle) {


  let existed = findIfExist(state, key, needle);
  if (existed !== false) {
    state[existed] = Object.assign(needle, needle)
  }
  else {
    state.push(needle);
  }

}

export function preaperMessage(messageSent, profile, room_id,participant_chat_id) {

  let message = messageSent;
  let posted_at = moment();
  message = message.trim();
  if (message.length !== 0) {
    let timestamp = window.performance.timeOrigin + window.performance.now();
    let messageData = {
      text: message,
      user: profile,
      posted_at: posted_at,
      read: false,
      timestamp: timestamp
    };

    let data = {
      text: message,
      room_id: room_id,
      posted_at: posted_at,
      timestamp: timestamp
    };

    let offLinedata = {
      text: message,
      chat_id: participant_chat_id,
      posted_at: posted_at,
      timestamp: timestamp
    };

    return { 'data': data, 'offLinedata': offLinedata, 'message': messageData };

  }
}

export function sendMessage(store, message, profile, room_id,participant_chat_id) {
  let prepare = preaperMessage(message, profile, room_id,participant_chat_id);
  if (prepare.message.text.length !== 0) {

    if(navigator.onLine) {
      store.dispatch('sendMessageToServer', prepare.data);
    }else{
      store.dispatch('sendMessageToServerWhenOffline', prepare.offLinedata);
    }
    store.dispatch('sendMessageToSate', prepare.message);
  }
}
