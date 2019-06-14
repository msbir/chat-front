import { reinstallApp } from "./reinstallApp";

export function checkUpdates(newVersion = null, notifyUser = false) {
    const oldVersion = localStorage.getItem('appVersion');
    
    if(newVersion != oldVersion)  {
        bootbox.confirm({
            message: "There is new update. Need to update app ...",
            buttons: {
              confirm: {
                label: "Yes"
              },
              cancel: {
                label: "Cancel"
              }
            },
            callback: result => {
              if (result) {
                reinstallApp(false, newVersion);
              }
            }
          });
    }
    else {
      if(notifyUser) bootbox.alert("App is up to date");
    }
}
