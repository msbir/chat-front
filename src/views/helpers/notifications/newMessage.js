import router from '../../../router/index'
import store from '../../../store/index'

export function newMessageNotification(data) {

  // handle multiple messages sent so the alert box
  // will show only the latest notification
  bootbox.hideAll();

  if (!router.history.current.params.notify) {
    let user = data.message.user;
    const name = user.username.includes("Guest") ? user.name + ' ' + user.last_name : user.username
    return bootbox.confirm({
      message: 'You have a new message from ' + name,
      buttons: {
        confirm: {
          label: 'Show',
        },
        cancel: {
          label: 'Cancel',
        }
      },
      callback: function (result) {
        if (result) {
          // store.commit('SET_CURRENT_ROOM', data.room.hash);
          router.push({ name: "chat", params: { room_id: data.room.hash } });
        }
      }
    });
  }
}
