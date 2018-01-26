import { Component, ViewChild } from '@angular/core';
import { Platform, Nav } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { FCM } from '@ionic-native/fcm';

export interface MenuItem {
  title: string;
  component: any;
  icon: string;
}

@Component({
  templateUrl: 'app.html'
})
export class MyApp {

  @ViewChild(Nav) nav: Nav;
  rootPage: any = 'HomePage';
  appMenuItems: Array<MenuItem>;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen/*, public fcm: FCM*/) {
    platform.ready().then(() => {
      statusBar.styleDefault();
      splashScreen.hide();

      /*fcm.getToken().then(token => {
        alert(`Token: ${token}`);

        fcm.onTokenRefresh().subscribe(token => {
          alert(`Refreshed token: ${token}`);
        })

        fcm.subscribeToTopic('notification');

        fcm.onNotification().subscribe(data => {
          alert(`Data: ${JSON.stringify(data)}`);
        })
      })*/
    });

    this.appMenuItems = [
      { title: 'Home', component: 'HomePage', icon: 'home' },
      { title: 'Led', component: 'LedPage', icon: 'sunny' },
      { title: 'Scan', component: 'ScanPage', icon: 'qr-scanner' },
      { title: 'Bluetooth', component: 'BluetoothPage', icon: 'bluetooth' },
      { title: 'Speech', component: 'SpeechPage', icon: 'mic' },
      { title: 'TTS', component: 'TtsPage', icon: 'mic' },
      { title: 'Config', component: 'ConfigPage', icon: 'settings' },
      { title: 'BLE Scan', component: 'BleScanPage', icon: 'bluetooth' },
      { title: 'BLE Connect', component: 'BleConnectPage', icon: 'bluetooth' },
      { title: 'BLE Light', component: 'BleLightPage', icon: 'bluetooth' },
      { title: 'BLE Button', component: 'BleButtonPage', icon: 'bluetooth' },
      { title: 'BLE Thermo', component: 'BleThermoPage', icon: 'bluetooth' }
    ];
  }

  openPage(page) {
    this.nav.setRoot(page.component);
  }

}