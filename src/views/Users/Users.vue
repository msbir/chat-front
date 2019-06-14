<template>
  <div>
        <div class="max-container">
                <main id="list" class="list-container" >
                  <user v-if="usersForDisplay" v-for="user in usersForDisplay" :key="user.id" :user="user" :userWindow="userWindow"></user>
                </main>
        </div>
    </div>  
</template>

<script>
import { mapGetters } from 'vuex';
import User from '../Users/User.vue';
import Footer from '../layout/Footer/Footer.vue';
import OnlineStatus from '../layout/OnlineStatus';

import {
  subscribeToPrivateChannelAndListenToEvents,
  subscribeToRoom
} from '../../utils/Pusher/Subscribe';
export default {
  name: 'users',
  props: {
    contacts: Object,
    window: Object
  },
  data() {
    return {
      empty_img: 'static/img/empty_user.png',
      windowdata: this.window,
      userWindow: {
        width: 0,
        height: 0
      }
    };
  },
  mounted() {
    this.getWidthSize;
  },
  computed: {
    ...mapGetters({
      currentRoom: 'currentRoom',
      rooms: 'rooms'
    }),
    usersForDisplay() {
      var users = [];
      _.forIn(this.contacts, (user, k) => {
        users.push(user);
      });
      return users;
    },
    getWidthSize() {
      var targetSize;
      if (this.window.width < 350) targetSize = 100;
      else targetSize = 120;
      const imagesPerRow = Math.round(this.window.width / targetSize);
      const size = this.window.width / imagesPerRow;
      this.userWindow.width = '100%';
      this.userWindow.height = size + 'px';
    }
  },
  watch: {
    windowdata: {
      handler: function(val, oldVal) {
        this.getWidthSize;
      },
      deep: true
    }
  },
  components: {
    'app-footer': Footer,
    user: User,
    'online-status': OnlineStatus
  },
  methods: {}
};
</script>


<style scoped>
/**main**/
.list-container {
  display: grid;
  grid-template-columns: repeat(4, 25%);
  gap: 0px;
}
main {
  margin: 0 0 100px 0;
}

@media only screen and (max-width: 400px) {
  .list-container {
    grid-template-columns: repeat(3, 33%);
  }
}
/**main end**/
</style>
