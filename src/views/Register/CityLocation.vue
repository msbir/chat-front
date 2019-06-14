<template>
    <div class="max-container city-location">
      <div class="fixed">
        <div class="container">
            <header>
              <div class="flex flex-center-h flex-center">
                  <img @click="goBack" class="arrow-back" src="static/img/footer-icons/arrowBack.png " alt="arrow-back">
                  <div class="logo-container">
                      <img class="logo-img" src="static/img/logo.png" alt="Yoho" @click="$router.push('/')">
                  </div>
              </div>
            </header>
        </div>
        <hr>
        <div class="container">
            <h1 class="title">Choose Your Location</h1>
            <p class="second-title">Search a City to locate</p>
            <div id="app" class="input-group">
                <input type="text" ref="autocomplete" class="form-control input search-input" placeholder="Type name of a city or country">
                <div class="input-group-append">
                    <button id="search" class="clean-btn search-btn" type="button">
                        <img class="search" src="static/img/footer-icons/search.svg" alt="search">
                    </button>
                </div>
            </div>
        </div>
      </div>
      <footer class="text-center container">
        <button class="clean-btn skip" @click="remove">Remove</button>
        <button @click="goBack" class="clean-btn next">Save</button>
      </footer>
    </div>
</template>


<script>
export default {
  name: 'city-location',
  props: {},

  data() {
    return {};
  },
  mounted() {
    this.autocomplete = new google.maps.places.Autocomplete(
      this.$refs.autocomplete,
      { types: ['geocode'] }
    );

    this.autocomplete.addListener('place_changed', () => {
      let place = this.autocomplete.getPlace();
      let ac = place.address_components;
      let city = ac[0]['long_name'];
      let fullAdd = place.formatted_address;
      this.$emit('shareCity', fullAdd);
    });
  },
  methods: {
    remove() {
      this.$emit('shareCity', '');
      this.goBack();
    },
    goBack() {
      this.$emit('goBack', false);
    }
  }
};
</script>


<style scoped>
/**header**/

header {
  padding: 20px 0 0 0;
}
.logo-container {
  text-align: center;
  width: 100%;
}
.logo-img {
  width: 30px;
}
.fixed {
  position: fixed;
  width: 100%;
  z-index: 1;
  margin: 0 auto;
  max-width: 600px;
  background-color: #ffffffd4;
  left: 0;
  right: 0;
}
/**header end**/
.title {
  color: #1a0d3b;
  font-size: 20px;
  font-family: Poppins-black;
  text-align: center;
  text-transform: capitalize;
  margin: 25px 0;
}
.second-title {
  font-size: 14px;
  color: #4723a1;
  font-family: Poppins-Bold;
  margin: 5px 0;
  text-transform: capitalize;
}
.search-input {
  margin: 0 !important;
  border-right: none;
  border-top-left-radius: 8px;
  border-bottom-left-radius: 8px;
  background: none !important;
}
.search-input:focus {
  -webkit-box-shadow: inset 0 0 0px 0px rgb(249 249 250) !important;
  border: 1px solid #ced4da;
  border-right: none;
  border-top-left-radius: 8px;
  border-bottom-left-radius: 8px;
}
.search-input::placeholder {
  font-size: 14px;
}
.search-btn {
  border-color: #ced4da;
  color: #ced4da;
  border-top-right-radius: 8px;
  border-bottom-right-radius: 8px;
  border: 1px solid #ced4da;
  border-left: none;
}
.search-btn:focus {
  background-color: none !important;
  border-color: none !important;
}
.search {
  transform: scaleY(-1);
  margin: 0 10px 0 0;
}
.pac-container {
  border: 1px solid #ccc !important;
  border-bottom-left-radius: 6px !important;
  border-bottom-right-radius: 6px !important;
  padding: 0 !important;
  margin: 0 0 50px 0 !important;
}
.pac-item {
  background-color: #f4f4f5 !important;
  padding: 10px 10px 10px 15px !important;
  border-bottom: 1px solid #ccc !important;
  color: #7e7d88 !important;
  font-size: 14px !important;
}

/**footer**/
footer {
  padding: 20px 0;
  position: fixed;
  bottom: 0;
  width: 100%;
  left: 0;
  right: 0;
}
.next {
  font-family: Poppins-Bold;
  background-color: rgb(71 35 161);
  padding: 10px 0;
  border-radius: 6px;
  color: #ffffff;
  font-size: 14px;
  width: 48%;
  max-width: 500px;
  letter-spacing: 0.5px;
}
.skip {
  font-family: Poppins-Bold;
  padding: 10px 0;
  border-radius: 6px;
  border: 1px solid #7e7d88;
  color: #7e7d88;
  font-size: 14px;
  width: 48%;
  background-color: #bebdc361;
}
/**footer and**/
</style>
