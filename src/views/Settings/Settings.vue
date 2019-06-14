<template>
<div class="max-container">
        <div class="container">
            <header class="flex flex-center">
                <online-status></online-status>
                <button class="clean-btn" @click="$router.go(-1)">
                          <i class="fas fa-angle-left arrow-back"></i>
                </button>
                <div class="flex flex-center flex-center-h logo-container" @click="$router.push('/')">
                    <img class="logo-img" src="static/img/logo.png" alt="Yoho" >
                    <h1 class="settings-title">Settings</h1>
                </div>
            </header>
        </div>
        <hr>

        <div class="container">
            <main>
                <p class="account-title">My Account</p>
                <div  @click="nonSupportedWarn" class="settings-container">
                    <div class="flex flex-between flex-center">
                        <div @click="nonSupportedWarn" class="flex flex-center">
                            <img class="profile-img" src="assets/img/chatImg/girl-profile-img1" alt="">
                            <p class="my-profile">My Profile</p>
                        </div>
                        <div>
                            <button class="clean-btn"><i class="fas fa-angle-right arrow-chat"></i></button>
                        </div>
                    </div>
                    <hr class="settings-hr">
                </div>
                <div  @click="nonSupportedWarn" class="settings-container" >
                    <div class="flex flex-between flex-center">
                        <div class="flex flex-center">
                            <i class="fas fa-cog profile-img setting-icon setting-icon-account"></i>
                            <p class="my-profile">My Account</p>
                        </div>
                        <div>
                            <button class="clean-btn"><i class="fas fa-angle-right arrow-chat"></i></button>
                        </div>
                    </div>
                    <hr class="settings-hr">
                </div>
                <div @click="nonSupportedWarn" class="settings-container" >
                    <div class="flex flex-between flex-center">
                        <div class="flex flex-center">
                            <i class="far fa-credit-card profile-img setting-icon setting-icon-payment"></i>
                            <p class="my-profile">Payment Information</p>
                        </div>
                        <div>
                            <button class="clean-btn"><i class="fas fa-angle-right arrow-chat"></i></button>
                        </div>
                    </div>
                    <hr class="settings-hr">
                </div>
                <p class="account-title">Notifications & Alerts</p>
                <div v-if="pushNotificationsSupported" class="settings-container">
                    <div class="flex flex-between flex-center">
                        <p class="my-profile">Push Notifications</p>
                        <div>
                            <label class="switch">
                                <input type="checkbox" v-model="pushNotificationsAlowed" @change="requestPermission">
                                <span class="slider round"></span>
                            </label>
                        </div>
                    </div>
                    <hr class="settings-hr">
                </div>
                <div  @click="nonSupportedWarn" class="settings-container">
                    <div class="flex flex-between flex-center">
                        <p class="my-profile">App Notifications</p>
                        <div >
                            <label class="switch">
                                <input type="checkbox" checked>
                                <span class="slider round"></span>
                            </label>
                        </div>
                    </div>
                    <hr class="settings-hr">
                </div>
                <div class="settings-container">
                    <div class="flex flex-between flex-center">
                        <p class="my-profile">GPS Permission</p>
                        <div >
                            <label class="switch">
                                <input type="checkbox" id="GPSbtn" @change="requestGPSPermission" v-model="GPSPermission" :disabled="flagGPS">
                                <span class="slider round"></span>
                            </label>
                        </div>
                    </div>
                    <hr class="settings-hr">
                </div>
                <div  @click="nonSupportedWarn" class="settings-container">
                    <div class="flex flex-between flex-center">
                        <p class="my-profile">Sounds</p>
                        <div>
                            <label class="switch">
                                <input type="checkbox" checked>
                                <span class="slider round"></span>
                            </label>
                        </div>
                    </div>
                    <hr class="settings-hr">
                </div>
                <div  @click="nonSupportedWarn" class="settings-container">
                    <div class="flex flex-between flex-center help">
                        <p class="my-profile">Help</p>
                        <i class="fas fa-angle-right arrow-chat"></i>
                    </div>
                </div>
                <hr class="last-hr">

            </main>
        </div>
            <app-footer></app-footer>
    </div>
</template>


<script>
import Footer from '../layout/Footer/Footer.vue';
import OnlineStatus from '../layout/OnlineStatus';

export default {
  name: 'settings',
  data() {
    return {
      GPSPermission: false,
      flagGPS: false,
      pushNotificationsSupported: window.Notification,
      pushNotificationsAlowed: Notification.permission === 'granted'
    };
  },
  computed: {},
  mounted() {},
  components: {
    'app-footer': Footer,
    'online-status': OnlineStatus
  },
  created() {
    this.getGPSPermission();
  },
  methods: {
    nonSupportedWarn: function(e) {
      bootbox.alert('This button will be supported soon! Stay tuned');
    },
    requestPermission(event) {
      const defPerm = Notification.permission === 'default';
      Notification.requestPermission().then(perm => {
        this.pushNotificationsAlowed = perm === 'granted';
        if (!defPerm) {
          bootbox.alert(
            "You can change notification permission by clicking 'View site information' icon near URL address"
          );
        }
      });
    },
    getGPSPermission() {
      var res;
      navigator.permissions
        .query({ name: 'geolocation' })
        .then(function(result) {
          if (result.state == 'granted') {
            console.log('granted');
            res = true;
          } else if (result.state == 'prompt') {
            console.log('prompt');
            res = false;
          }
          // Don't do anything if the permission was denied.
        })
        .then(x => {
          console.log('res', res);
          this.GPSPermission = res;
        });
    },
    requestGPSPermission() {
      if (navigator.geolocation) {
        console.log('Geolocation is supported!');

        var getPosition = function(options) {
          return new Promise(function(resolve, reject) {
            navigator.geolocation.getCurrentPosition(resolve, reject, options);
          });
        };

        getPosition()
          .then(position => {
            console.log(position);
            this.GPSPermission = true;
            this.flagGPS = true;
          })
          .catch(err => {
            console.error(err.message);
            this.GPSPermission = false;
            this.flagGPS = false;
            if (this.GPSPermission === false) {
              bootbox.alert(
                "You can change location permission by clicking 'View site information' icon near URL address"
              );
            }
          });
      } else {
        console.log('Geolocation is not supported for this Browser/OS.');
      }
    }
  }
};
</script>


<style scoped>
/**header**/

header {
  padding: 20px 0 0 0;
}
.settings-title {
  font-family: Poppins-SemiBold;
  font-size: 20px;
  color: rgb(61 59 75);
  text-align: center;
}
.logo-container {
  margin: 0 auto;
  cursor: pointer;
}
.logo-img {
  width: 40px;
}
/**header end**/

/**main**/

.account-title {
  color: rgb(40 38 56);
  font-size: 20px;
  font-family: Poppins-SemiBold;
  text-align: left;
}
.settings-container {
  margin: 10px 0;
  padding: 10px 0;
}
.settings-container:hover {
  background-color: #cccccc40;
}
.profile-img {
  height: 30px;
  width: 30px;
  border-radius: 50%;
  margin: 0 10px 0 0;
}
.my-profile {
  color: rgb(126 125 136);
  font-size: 16px;
  font-family: Poppins-SemiBold;
  margin: 0;
}
.setting-icon {
  color: #ffffff;
  display: flex;
  justify-content: center;
  align-items: center;
}
.setting-icon-account {
  background-color: rgb(54 216 249);
}
.setting-icon-payment {
  background-color: rgb(180 236 81);
}
.arrow-chat {
  color: rgb(190 189 195);
  font-size: 20px;
}
.help {
  margin: 30px 0 10px 0;
}

.settings-hr {
  margin: 10px 0 0 0;
}

/**main end**/
</style>
