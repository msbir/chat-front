<template>
      <div :class="[checkOnline ? 'online-icon' : 'offline-icon']" class="on-off-icon"></div>
</template>


<script>
import moment from 'moment';

export default {
  name: 'user-online',
  props: {
    isOnline: String
  },
  data() {
    return {};
  },
  computed: {
    checkOnline() {
      var userLastUpdate = moment
        .utc(this.isOnline, 'YYYY-MM-DD HH:mm:ss')
        .local()
        .format('YYYY-MM-DD HH:mm:ss');
      var nowTime = moment().format('YYYY-MM-DD HH:mm:ss');
      var duration = moment(nowTime) - moment(userLastUpdate);
      if (duration <= 120000) return true;
      else return false;
      return true;
    }
  },
  mounted() {},
  components: {},
  created() {},
  methods: {}
};
</script>


<style scoped>
.on-off-icon {
  border-radius: 50%;
  width: 10px;
  height: 10px;
  position: absolute;
  /* margin: 15px 0 0 0; */
}
.online-icon {
  background-color: rgb(116 202 23);
  margin: 0;
}
.offline-icon {
  background-color: rgb(169 168 175);
  margin: 0;
}
</style>
