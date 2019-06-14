<template>
      <div class="max-container">
        <div class="signup screen" :style="{ backgroundImage: 'url(' +bg_image + ')' }">
        <div class="max-container">
        <div class="container">
            <header>
                <online-status></online-status>
                <div class="flex flex-center-h flex-center">
                    <button class="clean-btn" @click="$router.push('/free-signup')">
                        <img class="arrow-back" src="static/img/footer-icons/arrowBack.png " alt="arrow-back">
                    </button>
                    <div class="logo-container">
                        <img class="logo-img" src="static/img/logo.png" alt="Yoho" @click="$router.push('/')">
                    </div>
                </div>
                </header>
        </div>
                <hr>
        <div class="container">
            <h1 class="signin">Signup</h1>
            <div>
                <p class="signup-text">How would you like to Signup?</p>
                <div class="text-center">
                    <button class="clean-btn signup-btn" @click="signupByEmail">signup with E-mail</button>
                    <button class="clean-btn signup-btn" @click="signupByPhone">signup with Phone Number</button>
                    <button class="clean-btn signup-btn" @click="signupByUsernme">signup with Username</button>
                </div>
            </div>
        </div>
        </div>
        </div>
    </div>
</template>


<script>
import { mapGetters } from 'vuex';
import OnlineStatus from '../layout/OnlineStatus';

export default {
  name: 'signup',
  props: {},
  data() {
    return {
      bg_image: 'static/img/Background_Signup.png',
      inputDetails: {
        inputType: '',
        name: '',
        header: '',
        title: '',
        inputPlaceholder: '',
        signupBtn: ''
      }
    };
  },
  computed: {
    ...mapGetters({
      profile: 'profile'
    })
  },
  mounted() {},
  components: {
    'online-status': OnlineStatus
  },
  created() {},
  methods: {
    signupByEmail() {
      bootbox.alert(
        'Signup with E-mail is not available, Singup with Username and Stay tuned'
      );
      return;
      this.inputDetails = {
        inputType: 'email',
        name: 'email',
        header: 'Signup with your Email to became part of the Yoho Community!',
        title: 'Enter Your E-mail',
        inputPlaceholder: 'Type your E-mail',
        signupBtn: 'SIGNUP WITH E-MAIL'
      };
      this.$router.push({
        name: 'signup-input',
        params: { inputDetails: this.inputDetails }
      });
    },
    signupByPhone() {
      bootbox.alert(
        'Signup with Phone Number is not available, Singup with Username and Stay tuned'
      );
      return;
      this.inputDetails = {
        inputType: 'number',
        name: 'phoneNumber',
        header:
          'Signup with your Phone Number to became part of the Yoho Community!',
        title: 'Enter Your Phone Number',
        inputPlaceholder: 'Type your Phone Number',
        signupBtn: 'SIGNUP WITH PHONE NUMBER'
      };
      this.$router.push({
        name: 'signup-input',
        params: { inputDetails: this.inputDetails }
      });
    },
    signupByUsernme() {
      this.inputDetails = {
        inputType: 'text',
        name: 'username',
        header:
          'Signup with your Username to became part of the Yoho Community!',
        title: 'Enter Your Username',
        inputPlaceholder: 'Type your username',
        signupBtn: 'SIGNUP WITH USERNAME'
      };
      this.$router.push({
        name: 'signup-input',
        params: { inputDetails: this.inputDetails }
      });
    }
  }
};
</script>


<style scoped>
.signup {
  height: calc(100vh);
  min-height: calc(100vh);
  background-image: linear-gradient(
    rgba(240, 232, 255, 0.65),
    rgb(209, 199, 228),
    rgba(192, 145, 255, 0.68)
  );
  background-repeat: no-repeat;
}

/**header**/
.screen {
  position: relative;
}
.screen::before {
  content: '';
  position: absolute;
  left: 0;
  height: 100%;
  width: 100%;
  z-index: -1;
  background-color: rgba(249, 249, 250, 0.4);
}
.signup {
  height: calc(100vh);
  width: 100%;
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  max-width: 800px;
  z-index: 1;
}
header {
  padding: 20px 0 0px 0;
}
.logo-container {
  text-align: center;
  width: 100%;
}
.logo-container img {
  cursor: pointer;
}
hr {
  margin: 5px 0 0 0;
}
.signin {
  font-size: 25px;
  font-weight: 900;
  font-family: Poppins-black;
  color: rgb(26 13 59);
  padding: 30px 0 0 0;
  margin: 0 0 20px 0;
  text-align: center;
}
.signup-text {
  font-size: 14px;
  color: rgb(26 13 59);
  text-align: center;
  margin: 30px 0;
}
.signup-btn {
  font-family: Poppins-Bold;
  background-color: rgb(71 35 161);
  padding: 10px 0;
  border-radius: 6px;
  color: #ffffff;
  font-size: 14px;
  width: 94%;
  letter-spacing: 0.5px;
  margin: 2px 0;
}
/**header end**/

/**footer**/

footer {
  position: relative;
  top: 80px;
}
/**footer-end**/

@media (orientation: landscape) {
  .signup {
    height: auto;
    min-height: -webkit-fill-available;
  }
}
</style>
