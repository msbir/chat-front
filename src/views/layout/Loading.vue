<template>
    <div class="loading">
         <div class="main-wrapper" :style="{ backgroundImage: 'url(' +bg_image + ')' }">
             <div class="title-wrapper">
                <h1>Welcome</h1>
                <h2>to YoHo</h2>
             </div>
         </div>
       
    </div>
</template>


<script>
export default {
  name: 'loading',
  data() {
    return {
      bg_image: 'static/img/chat_bg_picture.png'
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
.main-wrapper {
  height: 100%;
  width: 100%;
  position: fixed;
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  max-width: 800px;
  top: 30px;
}
.title-wrapper {
  position: absolute;
  margin-left: auto;
  margin-right: auto;
  left: 0;
  right: 0;
  top: calc(25vh);
}
h1 {
  font-size: 50px;
  font-family: Poppins-Bold;
  color: rgb(26 13 59);
  text-align: center;
}
h2 {
  font-size: 20px;
  font-family: Poppins-black;
  color: rgb(26 13 59);
  text-align: center;
}
</style>
