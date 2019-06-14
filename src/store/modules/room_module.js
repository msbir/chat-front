import Vue from 'vue'
import _ from 'lodash'
import router from '@/router'

// files
import { RoomService } from '../services/index'
import { CurrentRoomService, UserService } from "../services";
import { subscribeToRoom } from "../../utils/Pusher/Subscribe";


const state = {
  all: {},
  currentRoom: '',
  messages: {},
  new_messages: {}
}

const getters = {
  rooms: state => state.all,
  currentRoom(state) {
    return state.currentRoom
  },
  messages: state => state.messages,
  new_messages: state => state.new_messages
}

const actions = {
  createRoom({ commit, state }, data) {
    return RoomService.createRoom(data)
      .then(result => {
        let currentRoom = result.data.room;
        delete currentRoom['messages'];
        commit('SET_CURRENT_ROOM', currentRoom.hash)
        commit('INSERT_NEW_ROOM', currentRoom)
        return 'true';
      })
      .catch(error => {
        console.log(error);
        //commit('SET_ERROR', error)
        return 'false';
      })
  },

  // async getRoomByUsers({ commit }, data) {
  //   return new Promise((resolve, reject) => {
  //     RoomService.getRoomByUsers(data)
  //       .then((result) => {
  //         resolve(result);
  //       })
  //       .catch(error => {
  //         console.log(error);
  //         commit('SET_ERROR', error)
  //       })
  //   })
  // },

  getRooms({ commit, rootState }, data) {
    return UserService.getUserRooms()
      .then((result) => {
        let rooms = result.data.rooms;
        let new_messages = {};
        let user_chat_id = rootState.User.profile.chat_id
        var myMessages = rooms.reduce(function (map, obj) {
          if (obj.messages.length > 0)
            map[obj.hash] = obj.messages;
          obj.messages.forEach(message => {
            if (message.user.chat_id !== user_chat_id && message.read === 0) {
              if (new_messages[obj.hash]) new_messages[obj.hash]++
              else new_messages[obj.hash] = 1
            }
          })
          return map;
        }, {});
        commit('INITIAL_NEW_MESSAGE', new_messages)
        var myRooms = rooms.reduce(function (map, obj) {
          map[obj.hash] = obj;
          delete map[obj.hash]['messages'];
          return map;
        }, {});
        if (data === 'offline') {
          commit('SET_ROOMS_FROM_OFFLINE', myRooms)
        } else {
          commit('SET_ROOMS', myRooms)
        }
        commit('SET_MESSAGES', myMessages)
        return;
      })
      .catch(error => {
        console.log(error);
        commit('SET_ERROR', error)
        return (error);

      })
  },

  getRoomAndUserByMessageId({ commit }, data) {
    return CurrentRoomService.getRoomAndUserByMessageId(data)
      .then((result) => {
        let data = result.data;
        return data;
      })
      .catch(error => {
        console.log(error);
        return error;
      })
  },

  // async getRoom({ commit }, data) {
  //   await RoomService.getRoom(data)
  //     .then((result) => {
  //       let room = result.data.room;
  //       commit('SET_CURRENT_ROOM', room)
  //     })
  //     .catch(error => {
  //       console.log(error);
  //       commit('SET_ERROR', error)
  //     })
  // },

  sendMessageToServer({ commit }, data) {
    return CurrentRoomService.sendMessage(data)
      .then(result => {
        let data = result.data.message;
      })
      .catch(error => commit('SET_ERROR', error))
  },
  sendMessageToServerWhenOffline({ commit }, data) {
    return CurrentRoomService.sendMessageWhenOffline(data)
      .then(result => {
        let data = result.data;
      })
      .catch(error => commit('SET_ERROR', error))
  },
  sendMessageToSate({ commit }, data) {
    commit('PUSH_NEW_MSG', data)
  },

  messageHasBeenRead({ commit }, data) {
    return CurrentRoomService.readMessage(data)
      .then(result => {
        let data = result.data;
        return data;
      })
      .catch(error => commit('SET_ERROR', error))
  },

  setUserToReceiveChatRoom({ commit }, data) {
    commit('SET_CURRENT_ROOM', data);
    commit('PUSH_USER_TO_CHAT_ROOM', data);
  },

  setReadMessages({ state, commit, rootState }, data) {
    //update state
    let user_chat_id = rootState.User.profile.chat_id
    let hashs = [];
    let messages_id = []
    let flag = false
    data.forEach(hash => {
      _.forIn(state.messages, (stateMessage, stateMessagesKey) => {
        if (hash === stateMessagesKey) {
          stateMessage.forEach((message, index) => {
            if (!message.read && message.user.chat_id !== user_chat_id) {
              flag = true;
              messages_id.push(message.id)
              commit('SET_READ_MESSAGE', { hash, index });
            }
          })
          if (flag) {
            hashs.push(hash)
            // commit('SET_READ_NEW_MESSAGE', hash);
            data = {
              room_hash: hash,
              flag: false
            }
            commit('SET_NEW_MESSAGE', data)
          }
          flag = false
        }
      });
    })
    let dataToRead = {
      hash: hashs,
      messages_id: messages_id
    }

    //Send chat id and rooms hash to update serve as read
    CurrentRoomService.setReadMessages(dataToRead)
      .then(() => {
      })
      .catch(error => commit('SET_ERROR', error))

    return Promise.resolve()
  },
  setEraseMessages({ state, commit, rootState }, data) {
    //update state
    data.forEach(hash => {
      commit('DELETE_ROOM_AND_MESSAGES', hash);
    })
    //Send chat id and rooms hash to update serve as read
    CurrentRoomService.deleteMessages(data)
      .then(() => {
      })
      .catch(error => commit('SET_ERROR', error))

    return Promise.resolve()
  }
}

const mutations = {
  SET_MESSAGES(state, messages) {
    state.messages = messages;
  },
  // set the all rooms state
  SET_ROOMS(state, rooms) {
    state.all = rooms;
  },
  SET_ROOMS_FROM_OFFLINE(state, rooms) {
    state.all = rooms;

    let currentChatRoute = router.currentRoute.params.room_id;
    if (currentChatRoute) {
      _.forIn(state.all, (room, roomKey) => {
        _.forIn(room.users, (user, roomKey) => {
          if (user.chat_id == currentChatRoute) {
            subscribeToRoom(Vue.prototype.$pusher, room.id);
            router.replace({ name: 'chat', params: { room_id: room.hash } })
          }
        });
      });
    }
  },
  // insert the room when user SENDS new message
  // to his all rooms state
  INSERT_NEW_ROOM(state, room) {
    Vue.set(state.all, room.hash, room);
    //create messages object to keep vue reactivity
    Vue.set(state.messages, room.hash, []);
  },
  // insert the room when user RECEIVED new message
  // to his all rooms state
  INSERT_ROOM_TO_ALL_ROOMS_ARRAY_ON_RECEIVED_MESSAGE(state, data) {
    let exist = _.has(state.messages, data.room.hash);
    if (exist) {
      delete data.room['messages'];
      Vue.set(state.messages[data.room.hash], state.messages[data.room.hash].length, data.message);
    } else {
      delete data.room['messages'];
      Vue.set(state.all, data.room.hash, data.room);
      Vue.set(state.messages, data.room.hash, [data.message]);
    }
  },
  // push new message to current user rooms state
  // after the user SEND new message
  PUSH_NEW_MSG(state, data) {
    let exist = _.has(state.messages, state.currentRoom);
    if (exist) {
      state.messages[state.currentRoom].push(data)
    } else {
      state.messages[state.currentRoom] = [data];
    }
  },
  // set the state current room to have the
  // room hash
  SET_CURRENT_ROOM(state, roomHash) {
    state.currentRoom = roomHash
  },
  // set the room's participant data when the current user
  // recives a message (handle the participant info changes such as name,username,last name etc..)
  SET_PARTICIPANT_USER_DATA(state, data) {
    // get the participant user of the room
    if (state.all[data.room.hash]) {
      let participantData = state.all[data.room.hash].users.find(user => user.chat_id === data.message.user.chat_id);
      // set the participant user new data
      if (participantData) {
        Vue.set(participantData, 'name', data.message.user.name);
        Vue.set(participantData, 'last_name', data.message.user.last_name);
        Vue.set(participantData, 'email', data.message.user.email);
        Vue.set(participantData, 'username', data.message.user.username);
        Vue.set(participantData, 'is_guest', data.message.user.is_guest);
      }
    }
  },
  INITIAL_NEW_MESSAGE(state, data) {
    Vue.set(state, 'new_messages', data);
  },
  SET_NEW_MESSAGE(state, data) {
    // set the new room to have a new message value
    if (state.all[data.room_hash]) {
      Vue.set(state.all[data.room_hash], 'new_message', data.flag);
      console.log(data);

      if (state.new_messages[data.room_hash]) {
        if (data.flag) {
          let unread = state.new_messages[data.room_hash] + 1
          Vue.set(state.new_messages, data.room_hash, unread)
        } else {
          Vue.delete(state.new_messages, data.room_hash)
        }
      } else if (!data.my_message) Vue.set(state.new_messages, data.room_hash, 1)
    }
  },
  SET_MESSAGE_TO_READ_ON_OWN_STATE(state, messages) {

    _.forIn(messages, (message, messagesKey) => {

      _.forIn(state.messages[state.currentRoom], (stateMessage, stateMessagesKey) => {

        if (message.id === stateMessage.id) {
          stateMessage.read = true;
        }
      });
    });

  },
  SET_MESSAGE_HAS_BEEN_READ_FROM_CHANNEL(state, data) {
    _.forIn(state.messages[data.room_hash], (stateMessage, stateMessagesKey) => {
      if (!stateMessage.read) {
        stateMessage.read = true;
      }
    });
  },

  clearFakeRooms(state) {
    _.forIn(state.all, (room, roomKey) => {

      if (room.temp) {
        Vue.delete(state.all, room.hash);
      }
    });
  },
  PUSH_USER_TO_CHAT_ROOM(state, data) {
    router.push({ name: 'chat', params: { room_id: data } })
  },
  //set marked room's messages as read in user state
  SET_READ_MESSAGE(state, data) {
    Vue.set(state.messages[data.hash][data.index], 'read', true);
  },
  //delete marked room's from user state
  DELETE_ROOM_AND_MESSAGES(state, data) {
    Vue.delete(state.all, data);
    Vue.delete(state.messages, data);
  }
}

export default {
  state,
  getters,
  actions,
  mutations,
}
