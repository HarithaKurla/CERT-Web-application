import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Push, PushObject, PushOptions } from '@ionic-native/push';
import { AlertController } from 'ionic-angular';
import {Platform} from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(private push: Push,public navCtrl: NavController,private alert:AlertController,public platform:Platform) {
this.push.hasPermission()
  .then((res: any) => {

    if (res.isEnabled) {
      console.log('We have permission to send push notifications');
      this.initPush();
    } else {
      console.log('We do not have permission to send push notifications');
    }

  });

     if (this.platform.is('core')) {
      
      console.log('I am on a web browser')
    } else {
       
      console.log('Mobile Device')
    }
  }

   
  initPush()
  {
    const options: PushOptions = {
   android: {
     senderID:""
   },
   ios: {
       alert: 'true',
       badge: true,
       sound: 'false'
   },
   windows: {},
   browser: {
       pushServiceURL: 'http://push.api.phonegap.com/v1/push'
   }
};
  const pushObject: PushObject = this.push.init(options);
  pushObject.on('notification').subscribe((notification: any) => 
  {
    
  let alert = this.alert.create({
    title: 'Confirm purchase',
    message: notification.message,
    buttons: [
      {
        text: 'Cancel',
        role: 'cancel',
        handler: () => {
          console.log('Cancel clicked');
        }
      },
      {
        text: 'see',
        handler: () => {
          console.log('Buy clicked');
        }
      }
    ]
  });
  alert.present();

  }
  );

pushObject.on('registration').subscribe((registration: any) => console.log('Device registered', registration));

pushObject.on('error').subscribe(error => console.error('Error with Push plugin', error));
  }

}
