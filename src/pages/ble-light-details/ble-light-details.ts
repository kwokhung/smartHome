import { Component, NgZone } from '@angular/core';
import { IonicPage } from 'ionic-angular';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { BLE } from '@ionic-native/ble';

// Bluetooth UUIDs
const LIGHTBULB_SERVICE = '6E400001-B5A3-F393-E0A9-E50E24DCCA9E';
const SWITCH_CHARACTERISTIC = 'ff11';
const DIMMER_CHARACTERISTIC = '6E400003-B5A3-F393-E0A9-E50E24DCCA9E';

@IonicPage({
  name: 'BleLightDetailsPage'
})
@Component({
  selector: 'page-ble-light-details',
  templateUrl: 'ble-light-details.html',
})
export class BleLightDetailsPage {

  peripheral: any = {};
  power: boolean;
  brightness: number;
  statusMessage: string;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private ble: BLE,
    private alertCtrl: AlertController,
    private ngZone: NgZone) {

    let device = navParams.get('device');

    this.setStatus('Connecting to ' + device.name || device.id);

    this.ble.connect(device.id).subscribe(
      peripheral => this.onConnected(peripheral),
      peripheral => this.showAlert('Disconnected', 'The peripheral unexpectedly disconnected')
    );

  }

  onConnected(peripheral) {

    this.peripheral = peripheral;

    this.alertCtrl.create({
      title: "peripheral!",
      subTitle: JSON.stringify(peripheral),
      buttons: ["Close"]
    }).present();

    this.setStatus('Connected to ' + (peripheral.name || peripheral.id));

    // Update the UI with the current state of the switch characteristic
    this.ble.read(this.peripheral.id, LIGHTBULB_SERVICE, SWITCH_CHARACTERISTIC).then(
      buffer => {
        let data = new Uint8Array(buffer);
        console.log('switch characteristic ' + data[0]);
        this.ngZone.run(() => {
          this.power = data[0] !== 0;
        });
      }
    )

    // Update the UI with the current state of the dimmer characteristic
    this.ble.read(this.peripheral.id, LIGHTBULB_SERVICE, DIMMER_CHARACTERISTIC).then(
      buffer => {
        this.alertCtrl.create({
          title: "buffer!",
          subTitle: JSON.stringify(buffer),
          buttons: ["Close"]
        }).present();
        let data = new Uint8Array(buffer);
        console.log('dimmer characteristic ' + data[0]);
        this.ngZone.run(() => {
          this.brightness = data[0];
        });
      },
      (err) => {
        this.alertCtrl.create({
          title: "err!",
          subTitle: JSON.stringify(err),
          buttons: ["Close"]
        }).present();
      }
    )
  }

  onPowerSwitchChange(event) {
    console.log('onPowerSwitchChange');
    let value = this.power ? 1 : 0;
    let buffer = new Uint8Array([value]).buffer;
    console.log('Power Switch Property ' + this.power);
    this.ble.write(this.peripheral.id, LIGHTBULB_SERVICE, SWITCH_CHARACTERISTIC, buffer).then(
      () => this.setStatus('Light is ' + (this.power ? 'on' : 'off')),
      e => this.showAlert('Unexpected Error', 'Error updating power switch')
    );
  }

  setBrightness(event) {
    let buffer = new Uint8Array([this.brightness]).buffer;
    this.ble.write(this.peripheral.id, LIGHTBULB_SERVICE, DIMMER_CHARACTERISTIC, buffer).then(
      () => this.setStatus('Set brightness to ' + this.brightness),
      e => this.showAlert('Unexpected Error', 'Error updating dimmer characteristic ' + e)
    );
  }

  // Disconnect peripheral when leaving the page
  ionViewWillLeave() {
    console.log('ionViewWillLeave disconnecting Bluetooth');
    this.ble.disconnect(this.peripheral.id).then(
      () => console.log('Disconnected ' + JSON.stringify(this.peripheral)),
      () => console.log('ERROR disconnecting ' + JSON.stringify(this.peripheral))
    )
  }

  showAlert(title, message) {
    let alert = this.alertCtrl.create({
      title: title,
      subTitle: message,
      buttons: ['OK']
    });
    alert.present();
  }

  setStatus(message) {
    console.log(message);
    this.ngZone.run(() => {
      this.statusMessage = message;
    });
  }

}