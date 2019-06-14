<template>
    <div>
        <div class="socoal-info flex flex-center flex-between flex-wrap">
            <p class="media">Facebook</p>
            <p class="address"></p>
        </div>
      </div>
</template>


<script>
import { mapGetters } from 'vuex';
import moment from 'moment';

export default {
  name: 'socoal-info',
  props: {
    name: String
  },
  data() {
    return {};
  },
  computed: {},
  mounted() {},
  components: {},
  created() {},
  methods: {}
};
</script>


<style scoped>
.socoal-info {
  border-bottom: 1.5px solid #bebdc3;
  padding: 5px 0;
}
.media {
  font-size: 12px;
  color: #282638;
}
.address {
  font-size: 12px;
  color: #7e7d88;
}
p {
  margin: 0;
}
</style>
