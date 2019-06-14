<template>
    <section class="user-preview" v-if="profile.chat_id!==user.chat_id">
      <div class="user" :style="{ width: userWindow.width, height: userWindow.height }"  @click="onUserSelected">
        <div class="user-cover" :style="{ width: userWindow.width, height: userWindow.height }">
          <div class="user-img" :style="'background-image: url('+userImg+')'">
          </div>
            <button class="clean-btn" @click.stop="addRemoveFavorites">
              <div v-if="isLiked">
                <img src="static/img/footer-icons/start-fill.svg" class="star" alt="star">
              </div>
              <div v-else>
                <img src="static/img/footer-icons/icons-star.svg" class="star" alt="star">
              </div>
            </button>
            <div class="flex flex-center chat-name" >
              <user-online :isOnline="user.last_seen"></user-online>
              <div class="name">{{userName}}</div>
            </div>
        </div>
      </div>
  </section>
</template>

<script>
import { mapGetters } from 'vuex';
import UserOnline from '../layout/UserOnline.vue';

import {
  subscribeToRoom
} from '../../utils/Pusher/Subscribe';

export default {
  name: 'user',
  props: {
    user: Object,
    userWindow: Object
  },
  data() {
    return {
      empty_img: 'static/img/empty_user.png'
    };
  },
  components: {
    'user-online': UserOnline
  },
  created() {},
  computed: {
    ...mapGetters({
      profile: 'profile',
      favorites: 'favorites'
    }),
    userImg() {
      return this.user.avatarUrl;
    },
    userName() {
      var name = this.user.is_guest ? this.user.last_name : this.user.username;
      if (name.length < 6) return name.substring(0, 6);
      else return name.substring(0, 6) + '...';
    },
    isLiked() {
      return _.has(this.favorites, this.user.chat_id);
    }
  },
  methods: {
    onUserSelected() {
      this.$router.push({
        path: '/user-profile/' + this.user.chat_id,
        props: { user: this.user }
      });
    },
    createRoom() {
      let room = this.rooms[this.currentRoom];
      subscribeToRoom(this.$pusher, room.id);
      this.$router.push({ name: 'chat', params: { room_id: room.hash } });
    },
    addRemoveFavorites() {
      this.$store
        .dispatch('addRemoveFavorites', this.user)
        .then(res => {
          // console.log(res);
        })
        .catch(err => {
          console.log('err', err);
        });
    }
  }
};
</script>


<style scoped>
.user-preview {
  /* display: inline; */
  padding: 1px;
  height: 100%;
  width: 100%;
  /* border-bottom: 1px solid #ccc; */
}
.user {
  height: 100%;
  width: 100%;
  box-shadow: 0 0 0px #00000063;
  transition: all 0.3s;
  cursor: pointer;
  padding: 0;
  margin: 0 auto;
}
.user-cover {
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  overflow: hidden;
  transition: all 1s ease;
}
.user-img {
  height: 100%;
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center, center;
  transition: all 0.8s ease;
}
.user-cover:hover .user-img {
  transform: scale(1.08);
}

.user-pre-details {
  padding: 3px 5px;
  margin: 5px;
  font-size: 13px;
  display: flex;
  flex-direction: column;
  border-top: 1px solid #ccc;
}
.chat-name {
  color: #f9f9fa;
  font-size: 12px;
  font-family: Poppins-SemiBold;
  position: absolute;
  width: 100%;
  padding: 3px 5px;
  text-align: left;
}
.name {
  margin: 0 0 0 15px;
  font-family: Poppins;
}
.star {
  width: 18%;
  height: 18%;
  position: absolute;
  top: 5px;
  right: 5px;
  font-size: 0.9rem;
}
.icons-info {
  right: 25px;
}
</style>
