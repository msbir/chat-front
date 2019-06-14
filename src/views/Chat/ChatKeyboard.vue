<template>
  <footer>
    <hr class="footer-hr">
    <form @submit.prevent="onClickMessageSent()"></form>
    <div class="flex flex-center flex-around">
      <div>
        <img
          v-if="!message"
          class="send"
          @click="nonSupportedWarn"
          src="static/img/footer-icons/add.svg"
          alt="send"
        >
        <img
          v-if="!message"
          class="send"
          @click="nonSupportedWarn"
          src="static/img/footer-icons/picturefile.svg"
          alt="send"
        >
        <img
          v-if="!message"
          class="send"
          @click="nonSupportedWarn"
          src="static/img/footer-icons/camera.svg"
          alt="send"
        >
        <img
          v-if="message"
          class="send"
          @click="nonSupportedWarn"
          src="static/img/footer-icons/add-back.svg"
          alt="send"
        >
      </div>
      <div class="flex input-wrapper" :class="{'input-wrapper-text':message}">
        <textarea
          type="text"
          id="msg-txt"
          name="txt1"
          v-model="message"
          class="chat-input"
          placeholder="  Type Something"
          required
          @keyup.enter="onClickMessageSent"
        ></textarea>
        <button class="clean-btn emoji-btn">
          <emoji-picker @emoji="insert" class="emoji">
            <div slot="emoji-invoker" slot-scope="{ events }" v-on="events">
              <button type="button" class="clean-btn">
                <!-- <i class="far fa-smile"></i> -->
                <img
                  class="send inside-emoji"
                  @click="onClickMessageSent"
                  src="static/img/footer-icons/emoji.svg"
                  alt="send"
                >
              </button>
            </div>
            <div slot="emoji-picker" slot-scope="{ emojis, insert, display }">
              <div id="emoji-panel" class="emoji-panel">
                <div>
                  <div v-for="(emojiGroup, category) in emojis" :key="category" class="emoji-group">
                    <h5>{{ category }}</h5>
                    <div>
                      <span
                        v-for="(emoji, emojiName) in emojiGroup"
                        :key="emojiName"
                        @click="insert(emoji)"
                        :title="emojiName"
                      >{{ emoji }}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </emoji-picker>
        </button>
      </div>
      <img
        v-if="message"
        class="send"
        @click="onClickMessageSent"
        src="static/img/footer-icons/send.svg"
        alt="send"
      >
      <img
        v-if="!message"
        class="send"
        @click="nonSupportedWarn"
        src="static/img/footer-icons/voice.svg"
        alt="send"
      >
    </div>
  </footer>
</template>


<script>
import { mapGetters } from 'vuex';
import moment from 'moment';
import { preaperMessage, sendMessage } from '../../utils/yohoHelper';

export default {
  name: 'chat-keyboard',
  data() {
    return {
      message: '',
      error: false
    };
  },
  props: {
    room_id: Number,
    param_id: String,
    profile: Object,
    room: Object
  },
  created() {},

  computed: {},
  components: {},
  updated() {},
  mounted() {},

  methods: {
    nonSupportedWarn: function(e) {
      bootbox.alert('This button will be supported soon! Stay tuned');
    },
    onClickMessageSent(event, room_id = this.room_id) {
      let participant = this.findParticipantChatUser();
      if (this.message.trim() !== '') {
        sendMessage(
          this.$store,
          this.message,
          this.profile,
          room_id,
          participant.chat_id
        );
      }
      this.message = '';
    },
    findParticipantChatUser() {
      let chatUser = this.room.users.find(user => {
        return user.chat_id !== this.profile.chat_id;
      });
      return chatUser;
    },
    insert(emoji) {
      this.message += emoji;
    }
  }
};
</script>


<style scoped>
/**footer**/
footer {
  position: fixed;
  width: 100%;
  max-width: 800px;
  bottom: 0;
  padding: 0 0 3px 0;
  background-color: rgb(234, 233, 239);
}
.footer-hr {
  margin: 0 0 3px 0;
}
.input-wrapper {
  width: 65%;
}
.input-wrapper-text {
  width: 75%;
}
.chat-input {
  width: 100%;
  height: 40px;
  background-color: rgba(249, 249, 250, 0.57);
  border-right: none;
  border-top-left-radius: 20px;
  border-bottom-left-radius: 20px;
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
  resize: none;
  border-color: #d4d4d7;
}
.chat-input::placeholder {
  padding: 8px 0 0 0;
}
.emoji-btn {
  background-color: rgba(249, 249, 250, 0.57);
  border: 1px solid rgb(169, 169, 169);
  border-top-right-radius: 20px;
  border-bottom-right-radius: 20px;
  border-left: none;
  border-color: #d4d4d7;
}
.emoji-btn i {
  color: rgb(169, 169, 169);
  padding: 5px;
}
.chat-input::placeholder {
  font-size: 12px;
  color: #bebdc3;
}
footer i {
  font-size: 20px;
  color: rgb(96 48 217);
  cursor: pointer;
}
.send {
  width: 20px;
}
.inside-emoji {
  margin: 0 13px 0 0;
}
/**emoji**/

.emoji-panel {
  position: absolute;
  bottom: 100%;
  right: 10px;
  max-width: 300px;
  max-height: 400px;
  overflow: scroll;
  background-color: #fff;
  border: 1px solid #e9ecf1;
  border-radius: 2px;
  padding: 15px;
  text-align: left;

  overflow-x: hidden;
}

.emoji-panel .emoji-group {
  margin-bottom: 10px;
}

.emoji-panel .emoji-group h5 {
  color: #606f7b;
  font-size: 14px;
  text-transform: uppercase;
}

.emoji-panel .emoji-group div {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
}

.emoji-panel .emoji-group div span {
  padding: 1px;
}
.emoji-panel .emoji-group div span:hover {
  cursor: pointer;
}

.emoji-panel .emoji-group div span:active {
  transform: scale(3);
}

@media (orientation: landscape) {
  .emoji-panel {
    max-height: 140px;
  }
}

/**emoji end **/

/**footer end**/
</style>
