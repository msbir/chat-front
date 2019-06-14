
<template>
  <div id="auth">
    <div v-if="profile.is_guest">
    {{ profile.name }} {{ profile.last_name }}
  </div>
  <div v-else>
    <li>Hello, {{ profile.username }}!</li>
    <li><a id="logout" v-on:click="handleLogout()">Sign Out</a></li>
  </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'auth',
  computed: {
    ...mapGetters({
      profile: 'profile'
    })
  },
  methods: {
    handleLogout() {
      this.$store.dispatch('logout').then(() => {
        this.$router.replace('/');
      });
    }
  }
};
</script>

<style scoped>
#auth {
  color: rgb(26 13 59);
}
#auth:hover {
  color: rgb(111 55 255);
}
#logout:hover {
  cursor: pointer;
  color: rgb(111 55 255);
}
</style>
