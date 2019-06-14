<template>
  <div>
    <main>
      <div v-if="showDate" class="chat-date">{{dateMsg}}</div>
      <div class="flex flex-center" :class="{'other-msg': message.user.chat_id === profile.chat_id }" >
        <div class="flex flex-center flex-center-h flex-col">
          <img class="chat-img" :class="{'other-img': message.user.chat_id === profile.chat_id }" :src="message.user.chat_id === profile.chat_id ? empty_img :userImg">
          <p class="chat-time">{{timeMsg}}<span class=""><i :class="messageStatus"></i></span></p>
        </div>
        <div class="chat-text " :class="[message.user.chat_id === profile.chat_id ? 'chat-text-right' : 'chat-text-left']">
          {{message.text}}
        </div>
      </div>
    </main>
  </div>
</template>


<script>
import { mapGetters } from 'vuex';
import moment from 'moment';

export default {
  name: 'chat-msg',
  data() {
    return {
      empty_img: 'static/img/empty_user.png'
    };
  },
  props: {
    message: Object,
    userImg: String,
    showDate: Boolean
  },
  created() {},

  computed: {
    ...mapGetters({
      profile: 'profile'
    }),
    messageStatus() {
      if (
        this.message.read &&
        this.message.user.chat_id === this.profile.chat_id
      ) {
        return ['fas fa-check', 'read-message'];
      }
    },
    timeMsg() {
      return moment
        .utc(this.message.posted_at)
        .local()
        .format('HH:mm');
    },
    dateMsg() {
      return moment
        .utc(this.message.posted_at)
        .local()
        .format('MMMM DD');
    },
    seenMessage() {
      if (
        this.message.read &&
        this.message.user.chat_id === this.profile.chat_id
      ) {
        return true;
      }
    }
  },
  components: {},
  updated() {},
  mounted() {},

  methods: {}
};
</script>


<style scoped>
/**main**/

.chat-time {
  font-size: 10px;
  color: rgb(61 59 75);
  margin: 0;
}
.chat-text {
  margin: 5px 0;
  font-size: 14px;
  padding: 5px;
  border-bottom-right-radius: 12px;
  border-bottom-left-radius: 12px;
  box-shadow: 0.5px 1px #88888887;
  text-align: left;
  word-break: break-all;
}
.chat-text-left {
  background-color: rgb(243 226 191);
  border-top-right-radius: 12px;
  color: rgb(26 13 59);
  margin: 0 0 0 5px;
}
.chat-text-right {
  background-color: rgb(96 48 217);
  border-top-left-radius: 12px;
  color: rgb(249 249 250);
  margin: 0 5px 0 0;
}

.chat-date {
  color: #1a0d3b;
  font-size: 14px;
  font-family: Poppins-SemiBold;
  text-align: center;
}
.last-chat {
  margin: 0 0 100px 0;
}
.other-msg {
  flex-direction: row-reverse;
}
.other-img {
  align-self: flex-end;
}
.img-time {
  width: 15%;
}
.chat-img {
  height: 25px;
  width: 25px;
  border-radius: 50%;
  margin: 0 5px 0 0;
}
.read-message {
  color: #35ace2;
}
/**main end**/
</style>
