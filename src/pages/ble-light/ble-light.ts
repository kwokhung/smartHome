import { BLE } from '@ionic-native/ble';
import { Component, NgZone } from '@angular/core';
import { IonicPage } from 'ionic-angular';
import { NavController } from 'ionic-angular';
import { ToastController } from 'ionic-angular';

const LIGHTBULB_SERVICE = '6E400001-B5A3-F393-E0A9-E50E24DCCA9E';

@IonicPage({
  name: 'BleLightPage'
})
@Component({
  selector: 'page-ble-light',
  templateUrl: 'ble-light.html'
})
export class BleLightPage {

  devices: any[] = [];
  statusMessage: string;

  constructor(public navCtrl: NavController,
    private toastCtrl: ToastController,
    private ble: BLE,
    private ngZone: NgZone) {
  }

  ionViewDidEnter() {
    console.log('ionViewDidEnter');
    this.scan();
  }

  scan() {
    this.setStatus('Scanning for Bluetooth LE Devices');
    this.devices = [];  // clear list

    this.ble.scan([], 5).subscribe(
      device => this.onDeviceDiscovered(device),
      error => this.scanError(error)
    );

    setTimeout(this.setStatus.bind(this), 5000, 'Scan complete');
  }

  onDeviceDiscovered(device) {
    console.log('Discovered ' + JSON.stringify(device, null, 2));
    this.ngZone.run(() => {
      this.devices.push(device);
    });
  }

  // If location permission is denied, you'll end up here
  scanError(error) {
    this.setStatus('Error ' + error);
    let toast = this.toastCtrl.create({
      message: 'Error scanning for Bluetooth low energy devices',
      position: 'middle',
      duration: 5000
    });
    toast.present();
  }

  setStatus(message) {
    console.log(message);
    this.ngZone.run(() => {
      this.statusMessage = message;
    });
  }

  deviceSelected(device) {
    console.log(JSON.stringify(device) + ' selected');
    this.navCtrl.push('BleLightDetailsPage', {
      device: device
    });
  }

}