<template>
    <footer >
        <div class="flex flex-center flex-around nav-container">
                <router-link class="svg-icon settings" to="/settings"></router-link>
                <router-link class="compass" to="/"><i class="fas fa-compass nav-icon"></i></router-link>
                <router-link class="svg-icon rooms" to="/rooms"></router-link>
                <div @click="$router.push('/rooms')" class="new-msg-flag flex flex-center flex-center-h" :class="{'hide': this.$_.isEmpty(new_messages) }">{{Object.keys(new_messages).length}}</div>
                <!-- <router-link class="svg-icon search" to="/"></router-link> -->
                <a @click="search" class="svg-icon search"></a>
        </div>
        <div class="fav-wrapper" :style="{ backgroundImage: 'url(' + bg_image + ')' }"></div>
                <router-link class="favorites" to="/favorites-user" ></router-link>
    </footer>
</template>


<script>
import { mapGetters } from 'vuex';
import _ from 'lodash';

export default {
  name: 'app-footer',
  data() {
    return {
      bg_image: 'static/img/footer-icons/surface.svg'
    };
  },
  computed: {
    new_messages() {
      let new_messages = this.$store.getters.new_messages;
      if (new_messages) {
        return new_messages;
      }
    }
  },
  mounted() {},
  components: {},
  created() {},
  methods: {
    search() {
      bootbox.alert('This button will be supported soon! Stay tuned');
    }
  }
};
</script>


<style scoped>
/**footer**/

footer {
  position: fixed;
  width: 100%;
  max-width: 800px;
  height: 45px;
  bottom: 0px;
  z-index: 100;
  /* background-color: rgb(233 233 235); */
}
.nav-container {
  width: 60%;
  height: 100%;
  background-color: rgb(233 233 235);
}
.fav-wrapper {
  width: 40%;
  height: 45px;
  position: absolute;
  background-repeat: no-repeat;
  background-position: right;
  top: 0px;
  right: 0;
}
/**svg-icon style**/

a.svg-icon {
  height: 24px;
  width: 24px;
}
a.settings {
  background-image: url('../../../assets/footer-icons/bar.svg');
}
footer .router-link-exact-active.settings {
  background-image: url('../../../assets/footer-icons/barGold.svg');
}
a.rooms {
  background-image: url('../../../assets/footer-icons/message.svg');
}
footer .router-link-exact-active.rooms {
  background-image: url('../../../assets/footer-icons/messageGold.svg');
}
a.search {
  background-image: url('../../../assets/footer-icons/search.svg');
  transform: scaleY(-1);
}
footer .router-link-exact-active.search {
  background-image: url('../../../assets/footer-icons/searchGold.svg');
}
.new-msg-flag {
  font-size: 10px;
  height: 20px;
  width: 20px;
  color: #ffffff;
  border-radius: 50%;
  background-color: rgb(96 48 217);
  position: absolute;
  bottom: 16%;
  left: 37%;
}
.hide {
  display: none;
}
a.favorites {
  position: absolute;
  top: -30px;
  right: 15px;
  background-image: url('../../../assets/footer-icons/favorites.svg');
  height: 60px;
  width: 60px;
  border-radius: 50%;
  background-repeat: no-repeat;
}
footer .router-link-exact-active.favorites {
  background-image: url('../../../assets/footer-icons/favoritesGold.svg');
}
/**svg-icon style end**/

/**font-cons**/

footer .router-link-exact-active i {
  color: rgb(231, 197, 129);
  outline: 0;
}
.compass {
  margin: 5px 0 0 0;
}
.nav-icon {
  color: rgb(26 13 59);
  font-size: 20px;
}

/**font-cons end**/

/**footer and**/
</style>
