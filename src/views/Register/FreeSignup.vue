<template>
    <div class="free-signup max-container">
        <div class="main-wrapper container screen" :style="{ backgroundImage: 'url(' +bg_image + ')' }">
            <button class="clean-btn" @click="$router.push('/')">
              <img class="arrow-back back" src="static/img/footer-icons/arrowBack.png " alt="arrow-back">
            </button>
            <div class="text-center">
                <img class="img-logo" src="static/img/logo.png" alt="logo" @click="$router.push('/')">
                <p class="title">Became part of the YoHo Community, chat and meet friends across the globe.</p>
                <button class="clean-btn signup"  @click="$router.push('/signup')">SIGN UP FREE</button>
                <button class="clean-btn home" @click="$router.push('/login')">SIGN IN</button>
                  <p class="continue" @click="$router.push('/')">CONTINUE WITHOUT ACCOUNT</p>
            </div>
          </div>
    </div>
</template>
<script>
export default {
  name: 'free-signup',
  data() {
    return {
      bg_image: 'static/img/Background_Signup.png'
    };
  },
  computed: {},
  mounted() {},
  components: {},
  created() {},
  methods: {}
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
.main-wrapper {
  height: calc(100vh);
  width: 100%;
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  max-width: 800px;
  z-index: 1;
}
.back {
  margin: 15px 0 0 0;
}
.img-logo {
  width: 80px;
  margin-top: calc(21vh);
  cursor: pointer;
}
.title {
  font-size: 14px;
  color: rgb(40 38 56);
  margin: 20px 0 0 0;
}
.signup {
  font-family: Poppins-Bold;
  background-color: rgb(231 197 129);
  padding: 10px 0;
  margin: 15px 0 0 0;
  border-radius: 6px;
  color: rgb(26 13 59);
  font-size: 14px;
  width: 100%;
  max-width: 400px;
  letter-spacing: 0.5px;
}
.home {
  font-family: Poppins-Bold;
  padding: 10px 0;
  margin: 15px 0 0 0;
  border-radius: 6px;
  border: 1px solid rgb(71 35 161);
  color: rgb(71 35 161);
  font-size: 14px;
  width: 100%;
  max-width: 400px;
  background-color: rgba(249, 249, 250, 0.4);
}
.continue {
  color: rgb(71 35 161);
  font-size: 16px;
  font-family: Poppins-SemiBold;
  margin: 40px 0 0 0;
}
@media (orientation: landscape) {
  .main-wrapper {
    height: auto;
    min-height: -webkit-fill-available;
  }
}
</style>
