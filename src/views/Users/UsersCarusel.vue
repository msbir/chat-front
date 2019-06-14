<template>
<div>
    <carousel :perPageCustom="[[0, 3],[400, 5],[600, 6]]" :paginationEnabled="false">
      <slide v-for="user in users" :key="user._id" v-if="profile.chat_id!==user.chat_id">
        <User :user="user" :userWindow="userWindow" ></User>
      </slide>
    </carousel>
  </div>
</template>

<script>
import User from '../Users/User.vue';
import { mapGetters } from 'vuex';

export default {
  name: 'UserCarousel',
  components: {
    User: User
  },
  props: {
    users: Object
  },
  data() {
    return {
      userWindow: {
        width: '75px',
        height: '75px'
      },
      num: 0
    };
  },
  mounted() {},
  created() {},
  computed: {
    ...mapGetters({
      profile: 'profile'
    })
  },
  methods: {}
};
</script>

<style scoped>
.VueCarousel-slide {
  flex-basis: 0 !important;
  margin: 0 2px 0 0;
}
</style>
