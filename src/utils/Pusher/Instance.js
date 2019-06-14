import store from '../../store/index'
import Pusher from "pusher-js";
import {getAccessToken} from "../Auth";
import Vue from "vue";

const pusherInstance = () => {

  Vue.prototype.$pusher = new Pusher(process.env.PUSHER_KEY, {
    cluster: process.env.PUSHER_CLUSTER,
    authEndpoint: `${process.env.API_URL}/pusher`,
    auth: {
      headers: {
        'Authorization': "Bearer " + getAccessToken()
      }
    }
  });
  Vue.prototype.$pusher.connection.bind('connected', _ => {
    localStorage.setItem('socket_id', Vue.prototype.$pusher.connection.socket_id);
    //store.commit('SET_SOCKET_ID', Vue.prototype.$pusher.connection.socket_id);
  });

  return Vue.prototype.$pusher;

}

export default pusherInstance;

