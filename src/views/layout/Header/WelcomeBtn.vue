<template>
    <div class="welcome-btn">
        <div class="text-canter  btn-wrapper" v-if="this.profile.is_guest" :class="{'hide': closedBtn }">
            <button class="clean-btn cancel" @click="closeBtns"><img src="static/img/footer-icons/cancel.png" alt="cancel"></button>
            <div class="signup-wrapper">
              <button class="clean-btn signup"  @click="signup">Signup Free</button>
              <button class="clean-btn home" @click="addToHome()" v-if="deferredPrompt != ''">Add to Home</button>
            </div>
          </div>
          <div v-else-if="deferredPrompt != ''"  class="text-center btn-wrapper" :class="{'hide': closedBtn }">
            <button class="clean-btn cancel" @click="closeBtns"><img src="static/img/footer-icons/cancel.png" alt="cancel"></button>
            <button class="clean-btn home" @click="addToHome()" >Add to Home</button>
          </div>
    </div>
</template>


<script>
import { mapGetters } from 'vuex';
import BusService from './../../../utils/eventBusService';
import moment from 'moment';

export default {
  name: 'welcome-btn',
  props: {},
  data() {
    return {
      closedBtn: false,
      deferredPrompt: ''
    };
  },
  computed: {
    ...mapGetters({
      profile: 'profile'
    })
  },
  mounted() {},
  created() {
    BusService.$on(BusService.PWA_INSTALL, e => {
      console.log('event received', e);
      this.deferredPrompt = e;
    });
  },
  components: {},
  methods: {
    signup() {
      if (this.$store.getters.getOnlineStatus)
        this.$router.push('/free-signup');
      else {
        bootbox.alert('Please go back online to complete the signup process');
      }
    },
    closeBtns() {
      this.closedBtn = true;
    },
    addToHome() {
      if (!this.deferredPrompt || this.deferredPrompt == '') {
        console.log(
          'deferredPrompt not enabled, returning false',
          this.deferredPrompt,
          deferredPrompt
        );
        return false;
      }
      this.deferredPrompt.prompt();
      // Wait for the user to respond to the prompt
      this.deferredPrompt.userChoice.then(choiceResult => {
        if (choiceResult.outcome === 'accepted') {
          console.log('User accepted the A2HS prompt');
          this.deferredPrompt = '';
        } else {
          console.log('User dismissed the A2HS prompt');
        }
      });
    }
  }
};
</script>


<style scoped>
.btn-wrapper {
  background-image: linear-gradient(98deg, #d0b5ff3d, #d0b5ff6e);
  padding: 8px 0;
}
.signup-wrapper {
  width: 97%;
}
.hide {
  display: none;
}
.cancel {
  position: absolute;
  right: 3px;
  top: 10px;
  cursor: pointer;
}
.signup {
  font-family: Poppins-Bold;
  background-color: rgb(71 35 161);
  padding: 10px 0;
  border-radius: 6px;
  color: #ffffff;
  font-size: 14px;
  width: 45%;
  max-width: 500px;
  letter-spacing: 0.5px;
}
.home {
  font-family: Poppins-Bold;
  padding: 10px 0;
  border-radius: 6px;
  border: 1px solid #4723a1;
  color: #4723a1;
  font-size: 14px;
  width: 45%;
  background-color: rgba(249, 249, 250, 0.4);
}
</style>
