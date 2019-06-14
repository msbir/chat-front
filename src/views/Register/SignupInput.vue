<template>
  <div>
      <div v-if="!showTerms" class="max-container">
        <div class="signup screen" :style="{ backgroundImage: 'url(' +bg_image + ')' }">
        <div class="max-container">
        <div class="container">
            <header>
                <online-status></online-status>
                <div class="flex flex-center-h flex-center">
                    <button class="clean-btn"  @click="$router.push('/signup')">
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
                    <p class="signup-text">{{inputDetails.header}}</p>
                    <form v-on:submit.prevent>
                        <main>
                            <div>
                                <p class="title">{{inputDetails.title}}</p>
                                <input :type="inputDetails.inputType" class="form-control input" :placeholder="inputDetails.inputPlaceholder" v-model="userInput" min ="1" max="30" required >
                            </div>
                            <div>
                                <p class="title">Create a Password</p>
                                <input type="password" id="password" class="form-control input" placeholder="Create a Password" v-model="password" required>
                            </div>
                        </main>
                        <p v-if=errMsg class="err-msg">{{errMsgStr}}</p>
                        <div class="flex flex-between flex-center btn-container">
                          <p class="show-pass">Show Password</p>
                          <div class="flex">
                              <label class="switch">
                                  <input type="checkbox" v-model="showMe">
                                  <span class="slider round" @click="showPass"></span>
                              </label>
                          </div>
                        </div>
                        <div class="flex flex-center checkbox-wrapper">
                          <div v-if="!checked" @click="checked=!checked" class="checkbox"></div>
                          <div v-if="checked" @click="checked=!checked" class="flex flex-center flex-center-h checkbox is-checked">
                            <img :src="checked_img" alt="checked">
                          </div>
                          <div class="show-pass">I Agree with the <span @click="showTerms='ture'" class="title">Terms &amp; Conditions</span></div>
                        </div>
                        <footer>
                            <button class="clean-btn signup-free" :class="{'not-accepted':!checked}" @click="register">SIGN UP FREE</button>
                        </footer>
                    </form>
                </div>
        </div>
        </div>
        </div>
    </div>
    <terms-of-use v-if="showTerms" v-on:terms="isTermsAccepted"></terms-of-use>
  </div>
</template>


<script>
import { mapGetters } from 'vuex';
import OnlineStatus from '../layout/OnlineStatus';
import TermsOfUse from './TermsOfUse';

export default {
  name: 'signup-input',
  props: {
    inputDetails: Object
  },
  data() {
    return {
      bg_image: 'static/img/Background_Signup.png',
      checked_img: 'static/img/footer-icons/checked-clean.svg',
      userInput: '',
      password: '',
      errMsg: false,
      errMsgStr: '',
      showMe: false,
      checked: false,
      showTerms: false
    };
  },
  mounted() {},
  components: {
    'online-status': OnlineStatus,
    'terms-of-use': TermsOfUse
  },
  created() {},
  beforeRouteEnter: function(to, from, next) {
    if (from.name === 'signup' && to.name === 'signup-input') {
      next();
    } else {
      next('/');
    }
  },
  methods: {
    showPass() {
      var x = document.getElementById('password');
      if (x.type === 'password') {
        x.type = 'text';
      } else {
        x.type = 'password';
      }
    },
    isTermsAccepted(value) {
      this.showTerms = false;
      this.checked = value;
    },
    register() {
      if (!this.checked) {
        bootbox.alert(
          'In order to continue as a registered user, Terms of Use must be accept'
        );
        return;
      } else {
        if (
          this.userInput.includes('Guest') ||
          this.userInput.includes('guest') ||
          this.userInput === '' ||
          this.userInput.length > 30
        ) {
          this.errMsgStr = 'User name is not Valid';
          this.errMsg = true;
          return;
        }
        this.errMsg = false;
        let data = {
          //once backend will be ready to get email/phone will change it to name
          // name: this.name,
          username: this.userInput,
          password: this.password
        };
        this.$store.dispatch('registerGuestUser', data).then(res => {
          if (res.success == 'true') {
            this.$store.dispatch('getRooms').then(() => {
              this.$store.dispatch('getUsers').then(() => {
                this.$router.push('/register-profile');
              });
            });
          } else {
            this.errMsgStr = 'User name already exists';
            this.errMsg = true;
          }
        });
      }
    }
  }
};
</script>


<style scoped>
.signup {
  width: 100%;
  height: calc(100vh);
  min-height: calc(100vh);
  background-image: linear-gradient(
    rgba(240, 232, 255, 0.65),
    rgb(209, 199, 228),
    rgba(192, 145, 255, 0.68)
  );
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  max-width: 800px;
  z-index: 1;
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

/**header end**/

/**main**/

.title {
  font-family: Poppins-Bold;
  color: rgb(71 35 161);
  text-align: left;
  margin: 0;
  font-size: 14px;
}
.signup-free {
  font-family: Poppins-Bold;
  background-color: rgb(231 197 129);
  padding: 10px 0;
  margin: 10px 0 0 0;
  border-radius: 6px;
  color: rgb(26 13 59);
  font-size: 14px;
  width: 100%;
  max-width: 400px;
  letter-spacing: 0.5px;
}
.not-accepted {
  background-color: #7e7d88;
}
.input::placeholder {
  color: #7e7d88;
  font-size: 14px;
}
.err-msg {
  margin: 0;
  font-size: 12px;
  color: rgb(26 13 59);
  font-family: Poppins-SemiBold;
  text-align: center;
}
.show-pass {
  font-size: 14px;
  color: rgb(40 38 56);
  margin: 0;
}
.checkbox-wrapper {
  margin: 30px 0 0 0;
}
.checkbox {
  width: 30px;
  height: 30px;
  background-color: #f4f4f5;
  border: 1px solid #bebdc3;
  border-radius: 4px;
  margin: 0 20px 0 0;
}
.is-checked {
  background-color: #6030d9;
}
.is-checked img {
  height: 20px;
}
/**main-end**/

/**footer**/

footer {
  text-align: center;
}
/**footer-end**/

@media (orientation: landscape) {
  .signup {
    height: auto;
    min-height: -webkit-fill-available;
  }
}
</style>
