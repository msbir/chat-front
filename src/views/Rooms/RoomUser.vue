<template>
    <div class="room" :class="{'is-selected':isSelect}" @click="onUserSelected(room.room.hash)">
          <div v-for="user in room.room.users" :key="user.id"  v-if="user.chat_id !== profile.chat_id">
          <div class="flex flex-between flex-center">
                    <div class="flex flex-center">
                      <div v-if="mpdifyStatus" @click.stop="emitSelect" class="selector" >
                        <img v-if="!isSelect" src="static/img/footer-icons/selector.svg" alt="selector">                        
                        <img v-if="isSelect" src="static/img/footer-icons/selected.svg" alt="selector">
                        </div>
                      <div class="flex flex-end">
                        <img class="profile-img-chat" :src="userImg">
                        <user-online :isOnline="user.last_seen"></user-online>
                      </div>
                        <div>
                            <div v-if="user.is_guest">
                              <p class="chat-name">{{user.name}} {{user.last_name}}</p>
                            </div>
                            <div v-else>
                              <p class="chat-name" >{{user.username}}</p>
                            </div>
                            <p class="chat-light start-msg">
                              {{startMsg}}
                              <span v-if="seenMessage" class="read-message"><i class="fas fa-check"></i></span>
                            </p>
                        </div>
                    </div>
                    <div class="flex flex-center">
                        <div class="flex flex-col flex-center flex-center-h">
                            <div class="flex flex-center flex-center-h" :class="{'new-msg': new_messages[room.room.hash] }">{{new_messages[room.room.hash]}}</div>
                            <p class="chat-time">{{msgTime}}</p>
                        </div>
                        <img class="arrow-chat" src="static/img/footer-icons/arrowRight.png" alt="arrowRight">
                    </div>
                </div>
          </div>
    </div>
</template>


<script>
import { mapGetters } from 'vuex';
import moment from 'moment';
import UserOnline from '../layout/UserOnline.vue';

export default {
  name: 'room',
  props: {
    room: Object,
    isMpdify: Boolean
  },
  data() {
    return {
      empty_img: 'static/img/empty_user.png',
      isSelect: false
    };
  },
  components: {
    'user-online': UserOnline
  },
  computed: {
    ...mapGetters({
      profile: 'profile'
    }),
    mpdifyStatus() {
      if (!this.isMpdify) this.isSelect = false;
      return this.isMpdify;
    },
    startMsg() {
      return (
        this.room.message[this.room.message.length - 1].text.substring(0, 15) +
        '...'
      );
    },
    msgTime() {
      let x = this.room.message[this.room.message.length - 1];
      return moment
        .utc(x.posted_at)
        .local()
        .format('HH:mm');
    },
    seenMessage() {
      if (
        this.room.message[this.room.message.length - 1].read &&
        this.room.message[this.room.message.length - 1].user.chat_id ===
          this.profile.chat_id
      ) {
        return true;
      }
    },
    userImg() {
      var contacts = this.$store.getters.contacts;
      var imgURL;
      this.room.room.users.forEach(user => {
        let chat_id = user.chat_id;
        if (contacts[chat_id]) {
          imgURL = contacts[chat_id].avatarUrl;
        }
      });
      return imgURL;
    },
    new_messages() {
      let new_messages = this.$store.getters.new_messages;
      if (new_messages) {
        return new_messages;
      }
    }
  },
  methods: {
    onUserSelected(hash) {
      this.$router.push({ name: 'chat', params: { room_id: hash } });
    },
    emitSelect() {
      this.isSelect = !this.isSelect;
      this.$emit('isSelected', this.room.room.hash);
    }
  }
};
</script>


<style scoped>
/**header**/
.room {
  cursor: pointer;
  border-bottom: 1px solid #ccc;
  padding: 8px 0;
}
/**header end**/

/**main**/
.selector {
  margin: 0 15px 0 0;
}
.is-selected {
  background-color: #e9e9eb;
}
.profile-img-chat {
  border-radius: 50%;
  height: 40px;
  width: 40px;
  margin: 0 7px 0 0;
}
.chat-name {
  font-size: 16px;
  color: #1a0d3b;
  font-family: Poppins-Bold;
  margin: 0;
}
.start-msg {
  text-align: left;
  margin: 0;
  font-size: 14px;
  color: #7e7d88;
}
.chat-time {
  font-size: 10px;
  color: rgb(190 189 195);
  position: relative;
  bottom: -20px;
}
.arrow-chat {
  height: 15px;
  margin: 0 0 0 10px;
}
.new-msg {
  font-size: 10px;
  color: #f9f9fa;
  background-color: #6030d9;
  width: 20px;
  height: 20px;
  position: relative;
  border-radius: 50%;
  top: 5px;
}
.read-message {
  color: #35ace2;
}

/**main end**/
</style>
