<template>
      <vue-slider class="age-slider" @callback="getValue" v-model="sliderData.value" :tooltip="sliderData.tooltip" :dotSize="sliderData.dotSize" :height="sliderData.height" :min="sliderData.min" :max="sliderData.max" :processStyle="sliderData.processStyle"></vue-slider>      
</template>


<script>
import vueSlider from 'vue-slider-component';

export default {
  name: 'slider',
  props: { sliderData: Object },

  data() {
    return {};
  },
  components: { vueSlider },
  methods: {
    getValue() {
      this.$emit('shareValues', this.sliderData.value);
    }
  }
};
</script>


<style scoped>
</style>
