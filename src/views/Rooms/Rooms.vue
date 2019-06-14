<template>
        <div class="max-container">
          <div class="top-btns-wrapper">
                <online-status></online-status>
                <welcome-btn v-if="!welcomeBtn" ></welcome-btn>   
              </div>
            <div class="header-wrapper" :class="{'header-fixed':welcomeBtn}"> 
              <div class="container">  
                  <header>
                      <div class="flex flex-center">
                        <p @click="mpdifyList" class="modify" :class="{'cancel':isMpdify}">{{modifyText}}</p>
                        <div class="title-wrapper">
                          <p class="chat-title">Chats</p>
                        </div>
                      </div>
                      <div class="input-group">
                          <input type="text" class="form-control input search-input" placeholder="Type something or someone " v-model="searchInput">
                          <div class="input-group-append">
                              <button id="search" class="clean-btn search-btn" type="button">
                                  <img class="search" src="static/img/footer-icons/search.svg" alt="search">
                              </button>
                          </div>
                      </div>
                      
                  </header>
              </div>
              <hr class="chat-hr">
            </div> 
            
                <main :class="{'main-fixed':welcomeBtn}">
                  <div class="container" v-if="Object.keys(messages).length === 0">
                    <div class="text-center" >
                      <h3 class="no-chats">You have no Chats yet, to chat with someone, go to explore, and start making friends to chat with.</h3>
                      <router-link class="explore" to="/">Go and Explore</router-link>
                    </div>
                  </div>
                     <div v-else>
                        <h1 v-if="roomsForDisplay.filteredRooms.length>0 && searchInput!==''" class="second-title">Chats</h1>
                        <div class="container">
                          <room-user v-if="roomsForDisplay.filteredRooms" v-for="room in roomsForDisplay.filteredRooms" :key="room.id" :room="room" :isMpdify="isMpdify" v-on:isSelected="isSelected"></room-user>
                          </div>
                        <h1 v-if="roomsForDisplay.roomsWithMessages && searchInput.length>0" class="second-title">Messages</h1>
                        <div class="container">
                          <room-user  v-if="roomsForDisplay.roomsWithMessages && searchInput.length>0" v-for="room in roomsForDisplay.roomsWithMessages" :key="room.id" :room="room" :isMpdify="isMpdify" v-on:isSelected="isSelected"></room-user>
                        </div>
                     </div>
                </main>
            <div>
              <app-footer v-if="!isMpdify"></app-footer>
              <div v-else class="flex flex-center flex-between clean-msgs">
                <p @click="readAll">All Read</p>
                <p @click="eraseAll"><span class="erase">Erase</span><img src="static/img/footer-icons/erase.svg" alt="erase"></p>
              </div>
            </div>
        </div>
</template>


<script>
import { mapGetters } from 'vuex';
import RoomUser from '../Rooms/RoomUser.vue';
import Footer from '../layout/Footer/Footer.vue';
import WelcomeBtn from '../layout/Header/WelcomeBtn.vue';
import OnlineStatus from '../layout/OnlineStatus';
// import _ from 'lodash';

export default {
  name: 'rooms',
  data() {
    return {
      empty_img: 'static/img/empty_user.png',
      searchInput: '',
      welcomeBtn: false,
      isMpdify: false,
      selectedUsers: []
    };
  },
  components: {
    'app-footer': Footer,
    'room-user': RoomUser,
    'online-status': OnlineStatus,
    'welcome-btn': WelcomeBtn
  },
  created() {
    window.addEventListener('scroll', this.handleScroll);
  },
  mounted() {},
  computed: {
    ...mapGetters({
      profile: 'profile',
      rooms: 'rooms',
      messages: 'messages'
    }),
    modifyText() {
      return this.isMpdify ? 'Cancel' : 'Mpdify';
    },
    roomsForDisplay() {
      var roomsWithMessages = [];
      _.forIn(this.rooms, (room, roomKey) => {
        _.forIn(this.messages, (message, messagesKey) => {
          if (roomKey === messagesKey && message.length > 0) {
            var obj = {
              room: room,
              message: message
            };
            roomsWithMessages.push(obj);
          }
        });
      });
      let filteredRooms = roomsWithMessages.filter(room => {
        const userNotMe = room.room.users.filter(user => {
          return user.chat_id !== this.profile.chat_id;
        });
        let notMe = userNotMe[0];
        return (
          (notMe.is_guest &&
            notMe.last_name
              .toLowerCase()
              .includes(this.searchInput.toLowerCase())) ||
          (!notMe.is_guest &&
            notMe.username
              .toLowerCase()
              .includes(this.searchInput.toLowerCase()))
        );
      });
      let roomsForDisplay = {
        filteredRooms: filteredRooms,
        roomsWithMessages: roomsWithMessages
      };
      return roomsForDisplay;
    }
  },
  methods: {
    mpdifyList() {
      this.isMpdify = !this.isMpdify;
      this.selectedUsers = [];
    },
    handleScroll() {
      this.welcomeBtn = true;
    },
    isSelected(newHash) {
      if (this.selectedUsers.length === 0) {
        this.selectedUsers.push(newHash);
      } else {
        let isExist = _.findIndex(this.selectedUsers, hash => {
          return hash === newHash;
        });
        if (isExist === -1) this.selectedUsers.push(newHash);
        else {
          this.selectedUsers.splice(isExist, 1);
        }
      }
    },
    readAll() {
      this.$store.dispatch('setReadMessages', this.selectedUsers).then(() => {
        this.isMpdify = !this.isMpdify;
      });
    },
    eraseAll() {
      this.$store.dispatch('setEraseMessages', this.selectedUsers).then(() => {
        this.isMpdify = !this.isMpdify;
      });
    }
  }
};
</script>


<style scoped>
/**header**/
.top-btns-wrapper {
  position: relative;
  max-width: 800px;
}
.header-wrapper {
  padding: 20px 0 0 0;
  background-color: rgb(249 249 250);
  z-index: 1;
  width: 100%;
  max-width: 800px;
}
.header-fixed {
  position: fixed;
}
.title-wrapper {
  flex: 1;
}
.chat-title {
  font-size: 20px;
  color: rgb(44 36 70);
  font-family: Poppins-Bold;
  margin: 0;
  cursor: pointer;
  text-align: center;
}
.modify {
  font-size: 16px;
  color: #4723a1;
  margin: 0;
  position: absolute;
}
.cancel {
  color: #ff1431;
}
.input-group {
  margin: 10px 0 0 0;
}
.search-input {
  margin: 0 !important;
  border-right: none;
  border-top-left-radius: 8px;
  border-bottom-left-radius: 8px;
  background: none !important;
}
.search-input:focus {
  -webkit-box-shadow: inset 0 0 0px 0px rgb(249 249 250) !important;
  border: 1px solid #ced4da;
  border-right: none;
  border-top-left-radius: 8px;
  border-bottom-left-radius: 8px;
}
.search-input::placeholder {
  font-size: 14px;
}
.search-btn {
  border-color: #ced4da;
  color: #ced4da;
  border-top-right-radius: 8px;
  border-bottom-right-radius: 8px;
  border: 1px solid #ced4da;
  border-left: none;
}
.search-btn:focus {
  background-color: none !important;
  border-color: none !important;
}
.search {
  transform: scaleY(-1);
  margin: 0 10px 0 0;
}
.chat-hr {
  margin: 13px 0 0 0;
}
/**header end**/

/**main**/

main {
  position: relative;
  top: 10px;
  margin: 0 0 100px 0;
}
.main-fixed {
  top: 120px;
}
.no-chats {
  font-size: 14px;
  color: #1a0d3b;
  margin: 20px auto;
  max-width: 260px;
}
.explore {
  font-family: Poppins-Bold;
  background-color: rgb(71 35 161);
  padding: 10px 60px;
  border-radius: 6px;
  color: #f9f9fa;
  font-size: 14px;
  letter-spacing: 0.5px;
  text-decoration: none;
}
.second-title {
  font-size: 16px;
  color: #7e7d88;
  background-color: #e9e9eb;
  padding: 5px 10px;
  max-width: 570px;
  margin: 0 auto;
}
/**main end**/

/**footer**/
.clean-msgs {
  background-color: #e9e9eb;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  width: 100%;
  max-width: 800px;
  margin: 0 auto;
  padding: 10px 15px;
  color: #4723a1;
  font-size: 16px;
}
.clean-msgs p {
  margin: 0;
}
.erase {
  color: #ff1431;
  margin: 0 15px 0 0;
}
/**footer end**/
</style>
