<template>
      <div class="max-container">
        <div class="signup screen" :style="{ backgroundImage: 'url(' +bg_image + ')' }">
        <div class="max-container">
        <div class="container">
            <header>
                <online-status></online-status>
                <div class="flex flex-center-h flex-center">
                    <button class="clean-btn"  @click="goBack">
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
            <h1 class="signin">Create Password</h1>
                <div>
                    <p class="signup-text">Create a Password for your account</p>
                    <form @submit.prevent="register">
                        <main>
                            <div>
                                <p class="title">Create a Password</p>
                                <input type="password" id="password" class="form-control input" placeholder="Password" v-model="password" required>
                            </div>
                        </main>
                        <p v-if=errMsg class="err-msg">{{errMsgStr}}</p>
                        <div class="flex flex-between flex-center btn-container">
                          <p class="btn-text">Show Password</p>
                          <div class="flex">
                              <label class="switch">
                                  <input type="checkbox" v-model="showMe">
                                  <span class="slider round" @click="showPass"></span>
                              </label>
                          </div>
                        </div>
                        <footer>
                            <button type="submit" class="next-btn">SIGNUP FREE</button>
                        </footer>
                    </form>
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
  name: 'signup-password',
  props: {
    name: String,
    inputDetails: Object
  },
  data() {
    return {
      bg_image: 'static/img/Background_Signup.png',
      username: '',
      password: '',
      errMsg: false,
      errMsgStr: '',
      showMe: false
    };
  },
  mounted() {},
  components: {
    'online-status': OnlineStatus
  },
  created() {},
  beforeRouteEnter: function(to, from, next) {
    if (from.name === 'signup-input' && to.name === 'signup-password') {
      next();
    } else {
      next('/');
    }
  },
  methods: {
    register() {
      this.errMsg = false;
      let data = {
        //once backend will be ready to get email/phone will change it to name
        // name: this.name,
        username: this.name,
        password: this.password
      };
      this.$store.dispatch('registerGuestUser', data).then(res => {
        if (res.success == 'true') {
          this.$store.dispatch('getRooms').then(() => {
            this.$store.dispatch('getUsers').then(() => {
              this.$router.push('/terms-of-use');
              // this.$router.push('/register-profile');
            });
          });
        } else {
          this.errMsgStr = 'User name already exists';
          this.errMsg = true;
        }
      });
    },
    showPass() {
      var x = document.getElementById('password');
      if (x.type === 'password') {
        x.type = 'text';
      } else {
        x.type = 'password';
      }
    },
    goBack() {
      this.$router.push({
        name: 'signup-input',
        params: { name: this.userInput, inputDetails: this.inputDetails }
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

/**main**/

.title {
  font-family: Poppins-Bold;
  color: rgb(71 35 161);
  text-align: left;
  margin: 0;
  font-size: 14px;
}
.next-btn {
  background-color: rgb(71 35 161);
  padding: 10px;
  letter-spacing: 0.5px;
}
.err-msg {
  margin: 0;
  font-size: 12px;
  color: rgb(26 13 59);
  font-family: Poppins-SemiBold;
  text-align: center;
}
.btn-container {
  margin: 15px 0;
}
.btn-text {
  font-size: 14px;
  color: rgb(40 38 56);
  margin: 0;
}
/**main-end**/

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
