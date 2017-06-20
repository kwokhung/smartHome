import { Component, ViewChild } from '@angular/core';
import { Platform, Nav } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

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

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {
    platform.ready().then(() => {
      statusBar.styleDefault();
      splashScreen.hide();
    });

    this.appMenuItems = [
      { title: 'Home', component: 'HomePage', icon: 'home' },
      { title: 'Led', component: 'LedPage', icon: 'sunny' },
      { title: 'Scan', component: 'ScanPage', icon: 'qr-scanner' },
      { title: 'Bluetooth', component: 'BluetoothPage', icon: 'bluetooth' },
      { title: 'Speech', component: 'SpeechPage', icon: 'mic' }
    ];
  }

  openPage(page) {
    this.nav.setRoot(page.component);
  }
}