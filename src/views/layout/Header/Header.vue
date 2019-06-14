<template>
<header>
      <online-status></online-status>
    <nav class="flex flex-center flex-between">
      <div>
        <router-link to="/"><img class="logoimg" src="static/img/logo.png"></router-link>
        <div @click="version" class="update-btn">{{version_number}}</div>
        <button class="clean-btn update-btn" v-on:click="check">Check for updates</button>
      </div>
      <ul>
        <li v-if="is_notifiable">Notify</li>
        <li><app-auth></app-auth></li>
        <li><a @click="update">Reinstall App</a></li>
      </ul>
    </nav>
</header>
</template>

<script>
import { mapGetters } from 'vuex';
import axios from 'axios';
import User from './User';
import OnlineStatus from '../OnlineStatus';
import { reinstallApp } from '../../../utils/reinstallApp';
import { checkUpdates } from '../../../utils/checkUpdates';

export default {
  name: 'costume-header',
  data() {
    return {
      version_number: process.env.VER_NUM
    };
  },
  components: {
    'app-auth': User,
    'online-status': OnlineStatus
  },
  computed: {
    ...mapGetters({
      rooms: 'rooms',
      is_notifiable: 'is_notifiable'
    })
  },
  created() {},
  methods: {
    update() {
      bootbox.confirm({
        message: 'Are you sure you want to update the app?',
        buttons: {
          confirm: {
            label: 'Yes'
          },
          cancel: {
            label: 'Cancel'
          }
        },
        callback: function(result) {
          if (result) {
            reinstallApp();
          }
        }
      });
    },
    check() {
      axios.get(process.env.API_URL + 'version').then(response => {
        checkUpdates(response.data, true);
      });
    },
    version() {
      bootbox.alert('Version is ' + localStorage.getItem('appVersion'));
    },
    nonSupportedWarn: function(e) {
      bootbox.alert('This button will be supported soon! Stay tuned');
    }
  }
};
</script>

<style scoped>
header {
  position: fixed;
  width: 100%;
  max-width: 800px;
  top: 0;
  background-color: rgb(233 233 235);
  color: rgb(26 13 59);
  z-index: 100;
}
nav {
  padding: 10px 10px 0 10px;
}
ul {
  list-style-type: none;
  margin: 0;
  padding: 0;
}
ul li {
  text-decoration: none;
  cursor: pointer;
  font-size: 14px;
}
ul li:hover {
  color: rgb(111 55 255);
}

.nav-link {
  color: rgb(26 13 59);
}
.nav-link:hover {
  color: rgb(111 55 255);
}
.logoimg {
  max-width: 30px;
}
.update-btn {
  font-size: 10px;
}
.update-btn:hover {
  color: rgb(111 55 255);
}
</style>
