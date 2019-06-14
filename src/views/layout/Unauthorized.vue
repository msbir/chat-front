<template>
    <div class="unauthorized">
        <h4 class="pointer text-center">Can not change URL address</h4>
        <h5 class="pointer text-center" @click="$router.push('/')">Click to return to YoHo App</h5>
        <div class="pointer text-center">
            <img  src="static/img/logo.png" alt="YoHo" @click="$router.push('/')">
        </div>
    </div>
</template>


<script>
export default {
  name: 'unauthorized',
  props: {},
  data() {
    return {};
  },
  computed: {},
  created() {},
  methods: {}
};
</script>


<style scoped>
.unauthorized {
  margin: 50px;
}
img {
  margin: 0 auto;
}
</style>
