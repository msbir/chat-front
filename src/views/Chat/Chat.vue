<template>
  <div>
    <div class="max-container">
      <div class="header-container">
        <online-status></online-status>
        <div v-if="isGuest" class="container guest-wrapper"></div>
        <div v-if="isGuest" class="flex flex-center flex-center-h flex-col guest-profile">
          <p class="registered">You Have to be registered to keep chatting</p>
          <button @click="$router.push('/free-signup')" class="clean-btn signup">Create Account</button>
          <button class="clean-btn">
            <p @click="$router.push('/')" class="leave-chat">Leave Chat</p>
          </button>
          <button class="clean-btn">
            <p @click="resetIsGuest" class="leave-chat ignore">Ignore</p>
          </button>
        </div>
        <div class="container">
          <header class="flex flex-center-h flex-center">
            <img
              class="arrow-back"
              src="static/img/footer-icons/arrowBack.png"
              alt="arrowBack"
              @click="goBack"
            >
            <div class="flex flex-center flex-center-h chat-container">
              <img class="chat-img" :src="userImg">
              <p class="chat-name">{{chatName}}</p>
            </div>
            <img
              @click="nonSupportedWarn"
              class="info-icon"
              src="static/img/footer-icons/call-outline.svg"
            >
            <img
              @click="nonSupportedWarn"
              class="arrow-dwon"
              src="static/img/footer-icons/arrowdown.svg"
            >
            <img
              @click="nonSupportedWarn"
              class="info-icon"
              src="static/img/footer-icons/iconsInfo.png"
            >
          </header>
        </div>
        <hr class="chat-hr">
      </div>
      <div class="main-wrapper screen" :style="{ backgroundImage: 'url(' + chat_bg_image + ')' }"></div>
      <div class="container">
        <main v-if="param_id">
          <div class="first-msg" v-if="this.$_.isEmpty(messages[param_id])">
            This is the beginning of the conversation with Camille, say something to start.
            The messages &amp; calls in this conversations are protected.
            Tap to learn more.
          </div>
          <div
            v-else
            v-for="(message,index) in sortedMessage(messages[param_id])"
            :key="message.id"
          >
            <chat-msg
              :message="message"
              :userImg="userImg"
              :showDate="showDateCala(message.posted_at,index,messages[param_id])"
            ></chat-msg>
          </div>
        </main>
      </div>

      <chat-keyboard :room_id="room_id" :param_id="param_id" :profile="profile" :room="room"></chat-keyboard>
    </div>
  </div>
</template>


<script>
import { mapGetters } from 'vuex';
import store from '../../store';
import OnlineStatus from '../layout/OnlineStatus';
import ChatMsg from './ChatMsg';
import ChatKeyboard from './ChatKeyboard';
import { preaperMessage, sendMessage } from '../../utils/yohoHelper';
import _ from 'lodash';
import moment from 'moment';

export default {
  name: 'chat2',
  data() {
    return {
      message: '',
      loading: false,
      empty_img: 'static/img/yoho-bg-main',
      chat_bg_image: 'static/img/yoho-bg-main.svg',
      error: false,
      exist: false,
      messagesReadyNotifyArr: [],
      fromTempChat: false,
      isGuest: false
    };
  },
  created() {},
  // set currentRoom to empty object when leave component
  // to handle the "show for a second" the previous chat
  beforeRouteLeave: function(to, from, next) {
    store.commit('SET_CURRENT_ROOM', '');
    let chatUser = this.findParticipantChatUser();
    store.commit('SET_NEW_MESSAGE', {
      room_hash: this.param_id,
      flag: false,
      my_message: true
    });

    if (from.name === 'temp') {
      this.fromTempChat = true;
    }
    next();
  },
  computed: {
    ...mapGetters({
      rooms: 'rooms',
      profile: 'profile'
    }),
    param_id() {
      this.$store.commit('SET_CURRENT_ROOM', this.$route.params.room_id);
      return this.$route.params.room_id;
    },
    room_id() {
      if (this.$route.params.room_id && !_.isEmpty(this.rooms)) {
        return this.rooms[this.$route.params.room_id].id;
      }
    },
    room() {
      if (this.$route.params.room_id && !_.isEmpty(this.rooms)) {
        return this.rooms[this.$route.params.room_id];
      }
    },
    messages() {
      let myMessages = this.$store.getters.messages;
      this.messagesReadyNotifyArr['messages'] = [];

      _.forIn(myMessages[this.param_id], (message, messagesKey) => {
        let participantUser = this.findParticipantChatUser();

        if (
          !message.read &&
          message !== undefined &&
          participantUser.chat_id === message.user.chat_id
        ) {
          this.messagesReadyNotifyArr['room_hash'] = this.param_id;
          this.messagesReadyNotifyArr['messages'].push({ id: message.id });
        }
      });

      if (
        this.messagesReadyNotifyArr['messages'] &&
        this.messagesReadyNotifyArr['messages'].length > 0
      ) {
        this.setMessageToRead();
      }

      //block messages after 10 messages
      if (myMessages[this.param_id] && this.profile.is_guest) {
        let flag = Object.keys(myMessages[this.param_id]).length % 10;
        if (flag > 0 || Object.keys(myMessages[this.param_id]).length === 0) this.isGuest = false;
        else this.isGuest = true;
      }
      return myMessages;
    },
    chatName() {
      if (this.param_id && this.rooms[this.param_id]) {
        if (this.exist === false) {
          this.exist = _.has(this.rooms, this.param_id);
          this.$store.commit(
            'SET_CURRENT_ROOM',
            this.rooms[this.param_id].hash
          );
        }

        let chatUser = this.findParticipantChatUser();
        if (!chatUser.is_guest) return chatUser.username;
        else return chatUser.name + ' ' + chatUser.last_name;
      }
    },
    userImg() {
      var imgURL;
      if (this.param_id && this.rooms[this.param_id]) {
        var contacts = this.$store.getters.contacts;
        this.rooms[this.param_id].users.forEach(user => {
          let chat_id = user.chat_id;
          if (contacts[chat_id]) {
            imgURL = contacts[chat_id].avatarUrl;
          }
        });
      }
      return imgURL;
    }
  },
  components: {
    'online-status': OnlineStatus,
    'chat-msg': ChatMsg,
    'chat-keyboard': ChatKeyboard
  },
  updated() {
    window.scrollTo(0, document.body.scrollHeight);
  },
  mounted() {},

  methods: {
    resetIsGuest() {
      this.isGuest = false;
    },
    showDateCala(currDate, index, messages) {
      if (index === 0) return true;
      let date1 = moment
        .utc(currDate)
        .local()
        .format('YYYY MMMM DD');
      let date2 = moment
        .utc(messages[index - 1].posted_at)
        .local()
        .format('YYYY MMMM DD');
      return date1 !== date2 ? true : false;
    },
    nonSupportedWarn: function(e) {
      bootbox.alert('This button will be supported soon! Stay tuned');
    },
    insert(emoji) {
      this.message += emoji;
    },
    goBack() {
      if (this.fromTempChat) {
        this.$router.push('/');
      }
      this.$router.go(-1);
      if (this.$router.history.current.name !== 'chat') this.$router.go(-1);
      else this.$router.push('/');
    },
    findParticipantChatUser() {
      let chatUser = this.rooms[this.param_id].users.find(user => {
        return user.chat_id !== this.profile.chat_id;
      });
      return chatUser;
    },
    sortedMessage: function(arr) {
      return _.orderBy(
        arr,
        [
          function(message) {
            return message.timestamp;
          }
        ],
        ['asc']
      );
    },
    setMessageToRead: _.debounce(function() {
      if (this.messagesReadyNotifyArr['messages'].length > 0) {
        let data = {
          messages: this.messagesReadyNotifyArr['messages'],
          room_hash: this.messagesReadyNotifyArr['room_hash']
        };
        this.$store.dispatch('messageHasBeenRead', data).then(response => {
          this.messagesReadyNotifyArr['messages'] = null;
          this.messagesReadyNotifyArr['messages'] = [];
          this.$store.commit(
            'SET_MESSAGE_TO_READ_ON_OWN_STATE',
            response.messages
          );
        });
      }
    }, 1000)
  }
};
</script>


<style scoped>
.guest-wrapper {
  position: fixed;
  z-index: 1;
  padding-top: 340px;
  left: 0;
  right: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgb(250, 2500, 250);
  background-color: rgba(26, 13, 59, 0.4);
  filter: blur(8px);
}
.guest-profile {
  text-align: center;
  font-size: 12px;
  border-radius: 6px;
  background-color: #fcfcfc;
  max-width: 294px;
  height: 252px;
  margin: 20px auto;
  padding: 20px;
  position: absolute;
  z-index: 2;
  top: calc(13vh);
  right: 0;
  left: 0;
}
.signup {
  font-family: Poppins-Bold;
  background-color: rgb(71 35 161);
  padding: 10px 0;
  border-radius: 6px;
  color: #ffffff;
  font-size: 14px;
  width: 99%;
  max-width: 500px;
  letter-spacing: 0.5px;
}
.registered {
  font-size: 16px;
  color: #1a0d3b;
  margin: 0 0 25px 0;
}
.leave-chat {
  font-size: 14px;
  color: #1a0d3b;
  font-family: Poppins-SemiBold;
  margin: 35px 0 0 0;
}
.ignore {
  margin: 0;
  right: 10px;
  bottom: 10px;
  position: absolute;
}
/**header**/
.header-container {
  position: fixed;
  width: 100%;
  z-index: 1;
  background-color: #ffffffe8;
  max-width: 800px;
  background-color: rgba(249 249 250);
  padding: 20px 0 0 0;
}

.chat-container {
  text-align: center;
  width: 100%;
}
.chat-name {
  font-family: Poppins-Bold;
  font-size: 16px;
  color: rgb(26 13 59);
  text-align: center;
  margin: 0;
}
.chat-img {
  height: 35px;
  width: 35px;
  border-radius: 50%;
  margin: 0 5px 5px 0;
}
.arrow-back {
  cursor: pointer;
}
.chat-hr {
  margin: 0;
}
.info-icon {
  height: 20px;
  width: 20px;
}
.arrow-dwon {
  height: 10px;
  width: 10px;
  margin: 0 5px;
  position: relative;
  right: 4px;
  top: -2px;
}

/**header end**/

/**main**/
.screen {
  position: relative;
}
.screen::before {
  content: '';
  position: absolute;
  left: 0;
  height: 100%;
  width: 100%;
  z-index: -1;
  background-color: rgba(249, 249, 250, 0.8);
}

.main-wrapper {
  height: 100%;
  width: 100%;
  position: fixed;
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  max-width: 800px;
  top: 30px;
}
main {
  position: relative;
  top: 90px;
  margin: 0 0 100px 0;
}
.messages {
  display: none;
}
.first-msg {
  text-align: center;
  font-size: 8px;
  border-radius: 6px;
  background-color: #e7c581;
  padding: 5px;
  max-width: 230px;
  margin: 0 auto;
}
/**main end**/
</style>
