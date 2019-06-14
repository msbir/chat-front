<template>
  <div>
    <div  v-if="!isSelected && !citySelected" class="register-profile">
        <div class="max-container">
        <div class="container">
            <header>
              <online-status></online-status>
              <div class="flex flex-center-h flex-center">
                  <div class="logo-container">
                      <img class="logo-img" src="static/img/logo.png" alt="Yoho" @click="$router.push('/')">
                  </div>
              </div>
            </header>
        </div>
        <hr>
          <form @submit.prevent="registerProfile">
              <main>
                <div class="container"> <!-- General details -->
                      <p class="title">Complete your Profile</p>
                      <p class="second-title text-center">Add Up to 5 Pictures</p>
                      <!-- upload images -->
                      <div class="input-wrapper">
                        <input type="text"  @click="nonSupportedWarn" name="file" id="file" class="inputfile" @change="hendleFileSelected"/>
                        <label class="second-title" for="file">Upload Pictures</label>
                      </div>
                      <hr>

                      <p class="second-title">Display Name</p>
                      <input type="text" class="form-control input cmp-input"  v-model="data.name">

                      <p class="second-title">Status</p>
                      <textarea class="form-control cmp-input about-area" aria-label="With textarea" v-model="data.about"></textarea>

                      <p class="second-title">Birthdate</p>
                      <input type="date" class="form-control input cmp-input "  v-model="data.birthdate">

                      <p class="second-title">Weight</p>
                      <input type="number" class="form-control input cmp-input"  v-model="data.weight">

                      <p class="second-title">Height</p>
                      <input type="number" class="form-control input cmp-input"  v-model="data.height">
                </div>

                <div><!-- slected details -->
                      <div v-for="(item) in selectedList" :key="item">
                        <p class="second-title third-title">{{item}}</p>
                        <div @click="isSelected='ture';openIsSelected(item)" class="before-select flex flex-center flex-between">
                          <div class="item">{{data[item]}}</div>
                          <div class="arrow-wrapper">
                            <img class="arrow-right" src="static/img/footer-icons/arrowRight.png" alt="arrowRight">
                          </div>
                        </div>
                      </div>

                      <p class="second-title third-title">City</p>
                      <div @click="citySelected='true'" class="before-select flex flex-center flex-between">
                        <div class="item">{{data.city}}</div>
                        <div class="arrow-wrapper">
                          <img class="arrow-right" src="static/img/footer-icons/arrowRight.png" alt="arrowRight">
                        </div>
                      </div>

                </div>

                    <div><!-- preferences -->
                      <p class="third-title preferences">Preferences</p>

                      <!-- <p class="second-title third-title">Gender</p>
                      <div @click="isSelected='ture';openIsSelected('preferences')" class="before-select flex flex-center flex-between">
                        <div class="item">{{data.preferences.gender}}</div>
                        <div class="arrow-wrapper">
                          <img class="arrow-right" src="static/img/footer-icons/arrowRight.png" alt="arrowRight">
                        </div>
                      </div> -->

                      <p class="second-title third-title looking-title ">Looking for</p>
                      <div v-for="item in lookingForData" :key="item">
                        <div @click="setLookingFor(item)" class="flex flex-center flex-between arrow-wrapper before-select looking-for">
                          <div>{{item}}</div>
                          <img v-if="data.preferences.lookingFor[item]" class="checked" :src="checked" alt="checked">
                        </div>
                      </div>

                      <div class="flex flex-center flex-between age-wrapper">
                        <p class="second-title">Age Range</p>
                        <div class="range">{{data.ageRange.value[0]}} - {{data.ageRange.value[1]}}<span v-if="data.ageRange.value[1]===65">+</span></div>
                      </div>
                      <div class="third-title">
                        <slider :sliderData="sliderData" v-on:shareValues="setAgeValue" ></slider>
                      </div>
                    </div>

              </main>
              <footer class="text-center container">
                  <button class="clean-btn skip" @click="$router.push('/')">Skip</button>
                  <button type="submit" class="clean-btn next">Next</button>
              </footer>
            </form>
    </div>
    </div>
    <select-details v-if="isSelected" v-on:goBack="goBack" v-on:shareSelected="setSelected" :title="titleToPass" :items="valueToPass"></select-details>
    <city-location v-if="citySelected" v-on:goBack="goBack" v-on:shareCity="setCity"></city-location>
  </div>
</template>

<script>
import OnlineStatus from '../layout/OnlineStatus';
import SliderBar from '../helpers/common/SliderBar';
import SelectDetails from './SelectDetails';
import CityLocation from './CityLocation';

export default {
  name: 'register-profile',
  data() {
    return {
      isSelected: false,
      citySelected: false,
      data: {
        images: [],
        name: '',
        about: '',
        birthdate: null,
        weight: null,
        height: null,
        gender: '',
        ethnicity: '',
        'relationship-status': '',
        city: '',
        preferences: {
          // gender: '',
          lookingFor: {
            friends: false,
            relationship: false,
            networking: false,
            sex: false
          }
        },
        ageRange: {
          value: [18, 35]
        }
      },
      sliderData: {
        value: [18, 35],
        tooltip: false,
        dotSize: 28,
        height: 3,
        min: 18,
        max: 65,
        processStyle: {
          backgroundImage: '-webkit-linear-gradient(left, #6030d9, #c2aaff)'
        }
      },
      selectedList: ['gender', 'ethnicity', 'relationship-status'],
      lookingForData: ['friends', 'relationship', 'networking', 'sex'],
      checked: 'static/img/footer-icons/checked.svg',
      valueToSet: '',
      valueToPass: [],
      titleToPass: '',
      genderValues: [
        { name: 'male', isSelcted: false },
        { name: 'female', isSelcted: false },
        { name: 'trans-male', isSelcted: false },
        { name: 'trans-female', isSelcted: false },
        { name: 'non-binary', isSelcted: false },
        { name: 'other', isSelcted: false }
      ],
      ethnicityValues: [
        { name: 'black', isSelcted: false },
        { name: 'white', isSelcted: false },
        { name: 'latino', isSelcted: false },
        { name: 'asian', isSelcted: false },
        { name: 'mixed', isSelcted: false }
      ],
      statusValues: [
        { name: 'single', isSelcted: false },
        { name: 'married', isSelcted: false },
        { name: 'open-Relationship', isSelcted: false },
        { name: 'serious', isSelcted: false },
        { name: 'exclusive', isSelcted: false }
      ]
      // genderPreferencesValues: [
      //   { name: 'male', isSelcted: false },
      //   { name: 'female', isSelcted: false },
      //   { name: 'trans-male', isSelcted: false },
      //   { name: 'bon-binary', isSelcted: false }
      // ]
    };
  },
  components: {
    'online-status': OnlineStatus,
    slider: SliderBar,
    'select-details': SelectDetails,
    'city-location': CityLocation
  },
  beforeRouteEnter: function(to, from, next) {
    if (from.name === 'signup-input' && to.name === 'register-profile') {
      next();
    } else {
      next('/');
    }
  },
  methods: {
    hendleFileSelected(event) {},
    nonSupportedWarn: function(e) {
      bootbox.alert('This button will be supported soon! Stay tuned');
    },
    openIsSelected(value) {
      this.valueToSet = value;
      this.titleToPass = value;
      if (value === 'gender') {
        this.valueToPass = this.genderValues;
      } else if (value === 'ethnicity') {
        this.valueToPass = this.ethnicityValues;
        // } else if (value === 'preferences') {
        //   this.titleToPass = value;
        //   this.valueToPass = this.genderPreferencesValues;
      } else {
        this.valueToPass = this.statusValues;
      }
    },
    setSelected(value) {
      // if (this.valueToSet !== 'preferences') this.data[this.valueToSet] = value;
      // else this.data.preferences.gender = value;
      this.data[this.valueToSet] = value;
    },
    setLookingFor(value) {
      this.data.preferences.lookingFor[value] = !this.data.preferences
        .lookingFor[value];
    },
    setAgeValue(value) {
      this.data.ageRange.value = value;
    },
    setCity(value) {
      this.data.city = value;
    },
    goBack() {
      this.isSelected = false;
      this.citySelected = false;
    },
    registerProfile() {
      let data = JSON.parse(JSON.stringify(this.data));
      console.log(data);

      this.$store.dispatch('registerInfo', data).then(res => {
        this.$router.push('/');
      });
    }
  }
};
</script>


<style scoped>
.register-profile {
  min-height: calc(100vh);
  background-image: linear-gradient(
    rgba(240, 232, 255, 0.25),
    rgba(209, 199, 228, 0.55),
    rgba(192, 145, 255, 0.39)
  );
  background-repeat: no-repeat;
}

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
/**header end**/

/**main**/
.title {
  font-family: Poppins-black;
  text-align: center;
  font-size: 20px;
  padding: 10px 0 0 0;
  color: #1a0d3b;
}
.second-title {
  font-size: 14px;
  color: #4723a1;
  font-family: Poppins-Bold;
  margin: 5px 0;
  text-transform: capitalize;
}
.third-title {
  max-width: 600px;
  padding: 0 15px;
  margin: 5px auto;
}
.input-wrapper {
  border: 1px solid #4723a1;
  width: 100%;
  max-width: 500px;
  margin: 15px auto;
  border-radius: 6px;
  background-color: rgba(255, 255, 255, 0.4);
  padding: 8px 0;
  text-align: center;
}
.inputfile {
  width: 0.1px;
  height: 0.1px;
  opacity: 0;
  overflow: hidden;
  position: absolute;
  z-index: -1;
}

.inputfile + label {
  cursor: pointer; /* "hand" cursor */
  margin: 0;
}
.cmp-input {
  background-color: rgba(249, 249, 250, 0.5) !important;
  border: 1px solid #b5b5b7d1 !important;
  padding: 15px;
  color: #282638;
  font-size: 14px;
  cursor: pointer;
}
.before-select {
  padding: 6px 0;
  background-color: rgba(249, 249, 250, 0.5) !important;
  border-top: 1px solid #b5b5b7d1 !important;
  border-bottom: 1px solid #b5b5b7d1 !important;
  max-width: 600px;
  margin: 10px auto;
  cursor: pointer;
}
.arrow-wrapper {
  text-align: right;
}
.arrow-right {
  width: 15px;
  margin: 0 10px 0 0;
}
.about-area {
  border-radius: 20px;
  margin-top: 0px !important;
  margin-bottom: 0px !important;
  height: 76px !important;
  outline: 0;
  box-shadow: 0 0 0 0 rgb(233 233 235);
  color: rgb(48 24 110);
  resize: none;
}
.about-area::placeholder {
  color: rgb(190 189 195);
  opacity: 1;
}

.item {
  text-transform: capitalize;
  color: #7e7d88;
  font-size: 14px;
  margin: 0 0 0 15px;
}
.preferences {
  font-size: 20px;
  color: #3d3b4b;
  font-family: Poppins-SemiBold;
  margin: 20px auto;
}
.looking-title {
  margin: 20px auto;
}
.looking-for {
  cursor: pointer;
  color: #7e7d88;
  font-size: 14px;
  padding: 5px 15px;
  text-align: left;
  margin: -1px auto;
  text-transform: capitalize;
}
.checked {
  height: 14px;
}
/**age slider**/
.age-wrapper {
  max-width: 600px;
  padding: 0 15px;
  margin: 5px auto;
}
.age-slider {
}
.range {
  color: #93929b;
  font-size: 14px;
}

/**main and**/

/**footer**/
footer {
  padding: 30px 0;
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
  border: 1px solid #4723a1;
  color: #4723a1;
  font-size: 14px;
  width: 48%;
  background-color: rgba(249, 249, 250, 0.4);
}
/**footer and**/

@media (orientation: landscape) {
  .register-profile {
    height: auto;
    min-height: -webkit-fill-available;
  }
  footer {
    padding: 20px 0;
  }
}
</style>
