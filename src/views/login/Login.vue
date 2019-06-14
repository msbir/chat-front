<template>
      <div class="max-container">
    <div class="login-container screen" :style="{ backgroundImage: 'url(' + bg_image + ')' }">
        <div class="container">
            <header>
              <online-status></online-status>
              <div class="flex flex-center-h flex-center">
                  <button class="clean-btn" @click="$router.go('-1')">
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
            <h1 class="signin">Sign in</h1>
            <form @submit.prevent="login">
              <main>
                    <p class="signup-text">
                        <span class="welcome">Welcome back! Sign in with your credentails.</span></p>
                        <p class="title">Enter Your User Name</p>
                        <input type="text" class="form-control input" placeholder="User Name" v-model="userName" required>
                        <p class="title">Enter a Password</p>
                        <input type="password" id="password" class="form-control input" placeholder="Password" v-model="password" required>
                        <p v-if=errMsg class="err-msg">User Name or Password are not valid</p>
                        <div class="flex flex-between flex-center btn-container">
                          <p class="btn-text">Show Password</p>
                          <div class="flex">
                              <label class="switch">
                                  <input type="checkbox" v-model="showMe">
                                  <span class="slider round" @click="showPass"></span>
                              </label>
                          </div>
                        </div>
                        <div class="flex flex-between flex-center btn-container">
                          <p class="btn-text">Remember me</p>
                          <div class="flex">
                              <label class="switch">
                                  <input type="checkbox" v-model="remember">
                                  <span class="slider round" @click="rememberMe"></span>
                              </label>
                          </div>
                        </div>
                        <p class="forgot">Forgot Password?</p>
              </main>
              <footer>
                  <button type="submit" class="next-btn">SIGNIN</button>
              </footer>
            </form>
        </div>
      </div>
    </div>
</template>

<script>
import OnlineStatus from '../layout/OnlineStatus';

export default {
  name: 'login',
  data() {
    return {
      userName: '',
      password: '',
      remember: false,
      showMe: false,
      errMsg: false,
      bg_image: 'static/img/Background_Signup.png'
    };
  },
  components: {
    'online-status': OnlineStatus
  },
  computed: {},
  methods: {
    login() {
      let data = {
        username: this.userName,
        password: this.password
      };
      this.$store.dispatch('login', data).then(result => {
        if (result.success == 'true') {
          this.$store.dispatch('getRooms').then(() => {
            this.$store.dispatch('getUsers').then(() => {
              this.initPusher();
              this.initUser(this.$pusher);
              this.errMsg = false;
              this.$router.push('/');
            });
          });
        } else {
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
    rememberMe() {
      //save token on server..
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
  left: 0;
  height: 100%;
  width: 100%;
  z-index: -1;
  background-color: rgba(249, 249, 250, 0.4);
}
.login-container {
  height: calc(100vh);
  width: 100%;
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  max-width: 800px;
  z-index: 1;
}

/**header**/
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
  padding: 15px 0 0 0;
  margin: 0 0 10px 0;
  text-align: center;
}
.welcome {
  color: rgb(40 38 56);
  font-size: 14px;
}
/**header end**/

/**main**/
main {
  margin: 0 auto;
}

.signup-text {
  font-size: 14px;
  color: rgb(126, 125, 136);
  text-align: center;
}

.title {
  font-family: Poppins-Bold;
  color: rgb(71 35 161);
  text-align: left;
  margin: 0;
}
.btn-container {
  margin: 15px 0;
}
.btn-text {
  font-size: 14px;
  color: rgb(40 38 56);
  margin: 0;
}

.err-msg {
  margin: 0;
  font-size: 12px;
  color: rgb(26 13 59);
  font-family: Poppins-SemiBold;
  text-align: center;
}
.forgot {
  font-family: Poppins-Bold;
  color: rgb(26 13 59);
  font-size: 16px;
  text-transform: uppercase;
  text-align: left;
  margin: 0 0 15px 0;
}

/**main end**/

/**footer**/
footer {
  padding: 0;
}

/**footer end**/

@media (orientation: landscape) {
  .login-container {
    height: auto;
    min-height: -webkit-fill-available;
  }
  footer {
    padding: 20px 0;
  }
}
</style>
