<template>
  <div class="hello">
    
    <div class="max-container">
      
      <loading v-if="!(contacts && profile)"></loading>
      <div v-else>
        <app-header></app-header>
        <main >
          <welcome-btn></welcome-btn>
          <div class="new-user">
            <p class="title">New Faces</p>
            <user-carousel v-if="contacts" :users="contacts" ></user-carousel>
          </div>
          <div class="all-user"></div>
            <p class="title">People Around You</p>
            <app-users v-if="contacts" :contacts="contacts" :window="window"></app-users>
        </main>
      <app-footer></app-footer>
    </div>
    </div>
  </div>
</template>

<script>
import Header from '../layout/Header/Header.vue';
import WelcomeBtn from '../layout/Header/WelcomeBtn.vue';
import Footer from '../layout/Footer/Footer.vue';
import Loading from '../layout/Loading.vue';
import Users from '../Users/Users.vue';
import UserCarousel from '../Users/UsersCarusel.vue';
import { mapGetters } from 'vuex';

export default {
  name: 'hello',
  data() {
    return {
      window: {
        width: 0,
        height: 0
      }
    };
  },
  created() {
    this.$store.dispatch('getUsers');
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
      profile: 'profile',
      contacts: 'contacts'
    })
  },
  components: {
    'app-header': Header,
    'welcome-btn': WelcomeBtn,
    'app-footer': Footer,
    'app-users': Users,
    'user-carousel': UserCarousel,
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
main {
  position: relative;
  top: 86px;
  padding: 10px 0 5px 0;
}
.title {
  color: rgb(71 35 161);
  font-size: 14px;
  font-family: Poppins-Bold;
  text-align: left;
  margin: 5px 15px;
}
@media (orientation: landscape) {
  .hello {
    height: auto;
    min-height: -webkit-fill-available;
  }
}
</style>
