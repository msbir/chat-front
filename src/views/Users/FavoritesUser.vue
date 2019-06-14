<template>
  <div class="favorites-user">
    <div class="max-container">
      <header class="flex flex-center">
        <img
          class="arrow-back"
          src="static/img/footer-icons/icons-arrow-back-black.svg"
          alt="arrowBack"
          @click="$router.go(-1)"
        >
        <h1 class="title">Favorites</h1>
      </header>
      <main>
        <div v-if="Object.keys(favorites).length === 0">
          <div class="container flex flex-center flex-center-h flex-col no-fav text-center">
            <p>You have no Favorites yet, to add someone as favorite, just tap on the star Icon</p>
            <img src="static/img/footer-icons/start-fill.svg" alt="icons-star">
            <button @click="$router.push('/')" class="clean-btn signup">Go and Explore</button>
          </div>
        </div>
        <app-users v-else :contacts="favorites" :window="window"></app-users>
      </main>
      <app-footer></app-footer>
    </div>
  </div>
</template>

<script>
import Footer from '../layout/Footer/Footer.vue';
import Loading from '../layout/Loading.vue';
import Users from '../Users/Users.vue';
import { mapGetters } from 'vuex';

export default {
  name: 'favorites-user',
  data() {
    return {
      window: {
        width: 0,
        height: 0
      }
    };
  },
  created() {
    this.$store.dispatch('getFavorites');
    window.addEventListener('resize', this.handleResize);
    this.handleResize();
  },
  destroyed() {
    window.removeEventListener('resize', this.handleResize);
  },
  mounted() {},
  computed: {
    ...mapGetters({
      profile: 'profile'
    }),
    favorites() {
      var favorites = this.$store.getters.favorites;
      var contacts = this.$store.getters.contacts;
      _.forIn(favorites, user => {
        let chat_id = user.chat_id;
        if (contacts[chat_id]) {
          user.avatarUrl = contacts[chat_id].avatarUrl;
        }
      });
      return favorites;
    }
  },
  components: {
    'app-footer': Footer,
    'app-users': Users,
    loading: Loading
  },
  methods: {
    handleResize() {
      this.window.width = window.innerWidth;
      this.window.height = window.innerHeight;
    }
  }
};
</script>


<style scoped>
.title {
  font-family: Poppins-Bold;
  font-size: 20px;
  text-align: center;
  color: #1a0d3b;
  padding: 20px;
  margin: 0;
  flex: 1;
  background-color: #f9f9fa;
}
.arrow-back {
  cursor: pointer;
  transform: scaleX(-1);
  margin: 0 20px;
  position: absolute;
}
.no-fav {
  max-width: 265px;
}
.no-fav p {
  margin: 20px 10px
}
.signup {
  font-family: Poppins-Bold;
  background-color: rgb(71 35 161);
  padding: 10px 0;
  border-radius: 6px;
  color: #ffffff;
  font-size: 14px;
  width: 100%;
  letter-spacing: 0.5px;
  margin: 30px 0;
}
</style>
