<template>
    <div class="user-profile" ref="userProfile">
        <div class="max-container" v-if="user">
            <div class="user-img screen" :style="'background-image: url('+user.avatarUrl+')'">
                <button class="clean-btn">
                  <img class="arrow-back" src="static/img/footer-icons/icons-arrow-back-black.svg" alt="arrowBack"  @click="$router.go(-1)">
                </button>
                <button class="clean-btn fav-btn" @click.stop="addRemoveFavorites">
                <div v-if="isLiked">
                  <img src="static/img/footer-icons/start-fill.svg" class="star" alt="star">
                </div>
                <div v-else>
                  <img src="static/img/footer-icons/icons-star.svg" class="star" alt="star">
                </div>
                </button>
                <div class="flex icons-wrapper">
                  <button class="clean-btn" @click="onUserSelected(user)">
                    <img src="static/img/footer-icons/message-white.svg" alt="message">
                  </button>
                  <button class="clean-btn" @click="blockUser">
                    <img src="static/img/footer-icons/block.svg" alt="message">
                  </button>
                </div>
            </div>
            <div v-if="user.is_guest" class="container guest-wrapper">
            </div>
            <div v-if="user.is_guest" class="guest-profile" >this user has not been verified by Yoho. They need to create an account to complete their profile</div>
            <div class="container">
              <div class="main-details" >
                  <div class="flex flex-center name-wrapper">
                      <p class="name">{{name}}</p>
                    <user-online class="user-online" :isOnline="user.last_seen"></user-online>
                  </div>
                  <div class="user-details flex flex-center">
                    <p>{{user.gender}}</p><p class="purple-dot"></p><p>Years old</p>
                  </div>
                  <div class="user-details flex flex-center">
                    <p class="p-icons"><i class="fas fa-map-marker-alt icons"></i></p><p> mts away</p>
                  </div>
                  <div class="user-details flex flex-center">
                    <p class="p-icons"><i class="fas fa-home icons"></i></p><p>location</p>
                  </div>
              </div>
                <hr>



                  <!-- <h2 class="title">Social Info:</h2>
                  <hr class="title-border">
                  <user-info v-for="index in 3" :key="index"></user-info> -->

                  <h2 class="title">About:</h2>
                  <p class="about">{{user.about}}</p>
                  <hr class="title-border">

                <div><!-- user attribute -->
                  <div class="socoal-info flex flex-center flex-between flex-wrap">
                    <p class="attribute">Status</p>
                    <p class="value"></p>
                  </div>
                  <div class="socoal-info flex flex-center flex-between flex-wrap">
                    <p class="attribute">Profession</p>
                    <p class="value"></p>
                  </div>
                  <div class="socoal-info flex flex-center flex-between flex-wrap">
                    <p class="attribute">Height</p>
                    <p class="value"></p>
                  </div>
                  <div class="socoal-info flex flex-center flex-between flex-wrap">
                    <p class="attribute">Weight</p>
                    <p class="value"></p>
                  </div>
                  <div class="socoal-info flex flex-center flex-between flex-wrap">
                    <p class="attribute">Ethnicity</p>
                    <p class="value"></p>
                  </div>
                  <div class="socoal-info flex flex-center flex-between flex-wrap">
                    <p class="attribute">Eye Color</p>
                    <p class="value"></p>
                  </div>
                  <div class="socoal-info flex flex-center flex-between flex-wrap">
                    <p class="attribute">Hair Color</p>
                    <p class="value"></p>
                  </div>
                  <div class="socoal-info flex flex-center flex-between flex-wrap">
                    <p class="attribute">Body Type</p>
                    <p class="value"></p>
                  </div>
                  <div class="socoal-info flex flex-center flex-between flex-wrap">
                    <p class="attribute">Interested in</p>
                    <p class="value"></p>
                  </div>
                  <div class="socoal-info flex flex-center flex-between flex-wrap">
                    <p class="attribute">Looking for</p>
                    <p class="value"></p>
                  </div>
                  <div class="socoal-info flex flex-center flex-between flex-wrap">
                    <p class="attribute">Partying</p>
                    <p class="value"></p>
                  </div>
                  <div class="socoal-info flex flex-center flex-between flex-wrap">
                    <p class="attribute">Smoking</p>
                    <p class="value"></p>
                  </div>
                  <div class="socoal-info flex flex-center flex-between flex-wrap">
                    <p class="attribute">Drinking</p>
                    <p class="value"></p>
                  </div>
                </div>

                  <!-- <h1 class="qr-Code">My QR Code</h1> -->



            </div>
            <div class="text-center btn-next-wraper">
                    <button @click="onUserSelected(user)" class="clean-btn chat-now-btn">Chat Now</button>
            </div>
        </div>
    </div>
</template>


<script>
import { mapGetters } from 'vuex';
import UserOnline from '../layout/UserOnline.vue';
import UserInfo from './UserInfo.vue';
import { subscribeToRoom } from '../../utils/Pusher/Subscribe';
import moment from 'moment';

export default {
  name: 'user-profile',
  props: {},
  data() {
    return {
      chat_id: this.$route.params.user_id
    };
  },
  components: {
    'user-online': UserOnline,
    'user-info': UserInfo
  },
  mounted() {},
  created() {},
  computed: {
    ...mapGetters({
      contacts: 'contacts',
      favorites: 'favorites',
      rooms: 'rooms',
      currentRoom: 'currentRoom',
      profile: 'profile'
    }),
    user() {
      if (this.chat_id) {
        let user = this.contacts[this.chat_id];
        return user;
      }
    },
    isLiked() {
      return _.has(this.favorites, this.user.chat_id);
    },
    name() {
      if (this.user.is_guest) return this.user.last_name;
      else return this.user.username;
    }
  },
  methods: {
    onUserSelected(contact) {
      let data = {
        user_id: contact.chat_id
      };
      var Myroom;
      this.$_.forIn(this.rooms, function(room, key) {
        if (
          room.users[0].chat_id === contact.chat_id ||
          room.users[1].chat_id === contact.chat_id
        ) {
          Myroom = room;
        }
      });
      if (Myroom) {
        this.$router.push({ name: 'chat', params: { room_id: Myroom.hash } });
      } else {
        this.$store
          .dispatch('createRoom', data)
          .then(response => {
            if (response === 'false') {
              this.createFakeRoom(contact);
            } else {
              this.createRoom();
            }
          })
          .catch(err => {
            console.log('create room error', err);
          });
      }
    },
    createRoom() {
      let room = this.rooms[this.currentRoom];
      subscribeToRoom(this.$pusher, room.id);
      this.$router.push({ name: 'chat', params: { room_id: room.hash } });
    },
    createFakeRoom(contact) {
      console.log('createFakeRoom');
      let myProfile = this.profile;
      let roomData = {
        temp: true,
        created_at: moment
          .utc()
          .local()
          .format('YYYY-MM-DD HH:mm:ss'),
        hash: contact.chat_id,
        id: contact.chat_id,
        updated_at: moment
          .utc()
          .local()
          .format('YYYY-MM-DD HH:mm:ss'),
        users: [contact, myProfile]
      };
      this.$store.commit('SET_CURRENT_ROOM', contact.chat_id);
      this.$store.commit('INSERT_NEW_ROOM', roomData);
      this.$router.push({ name: 'temp', params: { room_id: contact.chat_id } });
    },
    addRemoveFavorites() {
      console.log('addRemoveFavorites');

      this.$store
        .dispatch('addRemoveFavorites', this.user)
        .then(res => {
          // console.log(res);
        })
        .catch(err => {
          console.log('err', err);
        });
    },
    blockUser() {
      //do block user
      bootbox.alert('This button will be supported soon! Stay tuned');
    }
  }
};
</script>


<style scoped>
.screen {
  position: relative;
}
.screen::before {
  content: '';
  position: absolute;
  height: 100%;
  width: 100%;
  bottom: 0px;
  z-index: 2;
  background: linear-gradient(
    rgba(0, 0, 0, 0),
    rgba(0, 0, 0, 0.15),
    rgba(0, 0, 0, 0.22)
  );
}
.user-img {
  width: 100%;
  height: 200px;
  object-fit: cover;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  background-repeat: no-repeat;
  background-size: cover;
  transition: all 1s ease;
  background-position: center, center;
}
.arrow-back {
  cursor: pointer;
  position: absolute;
  top: 30px;
  z-index: 2;
  left: 30px;
  transform: scaleX(-1);
}
.fav-btn {
  z-index: 2;
  position: absolute;
  top: 30px;
  right: 20px;
}
.star {
  width: 50%;
  height: 50%;
}
.icons-wrapper {
  z-index: 2;
  justify-content: flex-end;
}
.icons-wrapper img {
  height: 20px;
  width: 20px;
  margin: 0 10px 5px 10px;
}

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
  background-color: #e7c581;
  max-width: 230px;
  margin: 20px auto;
  padding: 20px;
  position: absolute;
  z-index: 2;
  top: 338px;
  right: 0;
  left: 0;
}
.main-details {
  padding: 0 0 20px 0;
}
hr {
  margin: 0;
}
.name-wrapper {
  margin: 15px 0 0 0;
}
.name {
  color: #1a0d3b;
  font-size: 16px;
  font-family: Poppins-Bold;
  margin: 0 10px 0 0;
}
.title {
  color: #1a0d3b;
  font-size: 14px;
  font-family: Poppins-Bold;
  margin: 20px 0;
}
.title-border {
  border-bottom: 1.3px solid #bebdc3;
}
.user-online {
  position: relative !important;
}
.user-details {
  font-size: 12px;
  color: #93929b;
}
.user-details p {
  margin: 0 10px 0 0;
  display: inline-block;
}
.purple-dot {
  width: 4px;
  height: 4px;
  background-color: #4723a1;
  border-radius: 50%;
}
.p-icons {
  width: 10px;
}
.icons {
  font-size: 10px;
  color: #4723a1;
}
.about {
  color: #93929b;
  font-size: 12px;
  margin: 0 0 20px 0;
}
/**user-Info**/
.socoal-info {
  border-bottom: 1.5px solid #bebdc3;
  padding: 5px 0;
}
.attribute {
  font-size: 12px;
  color: #282638;
}
.value {
  font-size: 12px;
  color: #7e7d88;
}
p {
  margin: 0;
}
/**user-Info end**/

.qr-Code {
  font-size: 14px;
  color: #4723a1;
  font-family: Poppins-Bold;
  text-align: center;
  margin: 20px 0;
}
.chat-now-btn {
  font-family: Poppins-Bold;
  background-color: #4723a1;
  padding: 10px 0;
  border-radius: 6px;
  color: #f9f9fa;
  font-size: 14px;
  width: 100%;
  max-width: 500px;
  letter-spacing: 0.5px;
  margin: 20px 0;
}
.btn-next-wraper {
  text-align: center;
  padding: 20px;
  position: absolute;
  z-index: 2;
  right: 0;
  left: 0;
}
</style>
