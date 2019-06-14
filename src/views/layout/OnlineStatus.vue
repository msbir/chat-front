<template>
    <div class="on-off-line">
        <div v-if="!onlineStatus" class="offline">
            You are Offline
        </div>
        <div v-else class="online">You are Online</div>
    </div>
</template>


<script>
export default {
  name: 'on-off-line',
  data() {
    return {};
  },
  computed: {
    onlineStatus() {
      return this.$store.getters.getOnlineStatus;
    }
  },
  mounted() {},
  components: {},
  created() {},
  methods: {}
};
</script>


<style scoped>
.on-off-line {
  position: absolute;
  right: 0;
  top: 0;
  font-size: 10px;
}
.online {
  background-color: #8bc34a;
}

.offline {
  background-color: #f44336d6;
}
</style>
