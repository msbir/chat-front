import Vue from 'vue';

const TOKEN = 'token';

export function isLoggedIn() {
  const token = getAccessToken();
  return !!token;
}

export function getAccessToken() {
  return Vue.cookie.get(TOKEN);
}


export function isAppWindowOpen() {
  localStorage.openpages = Date.now();
  var onLocalStorageEvent = function(e){
    if(e.key == "openpages"){
      // Listen if anybody else opening the same page!
      localStorage.page_available = Date.now();
    }
    if(e.key == "page_available"){
      alert("It seems like you already have an open tab for this App." +
        " Please close those tabs as this app works with only one tab open. " +
        "Thanks");
    }
  };
  window.addEventListener('storage', onLocalStorageEvent, false);
}
