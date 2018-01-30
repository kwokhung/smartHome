import { Component, NgZone } from '@angular/core';
import { IonicPage } from 'ionic-angular';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { BLE } from '@ionic-native/ble';

// Bluetooth UUIDs
const THERMOMETER_SERVICE = '4fafc201-1fb5-459e-8fcc-c5c9c331914b';
const TEMPERATURE_CHARACTERISTIC = 'beb5483e-36e1-4688-b7f5-ea07361b26a8';

@IonicPage({
  name: 'BleThermoDetailsPage'
})
@Component({
  selector: 'page-ble-thermo-details',
  templateUrl: 'ble-thermo-details.html',
})
export class BleThermoDetailsPage {

  peripheral: any = {};
  temperature: number;
  statusMessage: string;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private ble: BLE,
    private alertCtrl: AlertController,
    private ngZone: NgZone) {

    let device = navParams.get('device');

    this.setStatus('Connecting to ' + device.name || device.id);

    // This is not a promise, the device can call disconnect after it connects, so it's an observable
    this.ble.connect(device.id).subscribe(
      peripheral => this.onConnected(peripheral),
      peripheral => this.showAlert('Disconnected', 'The peripheral unexpectedly disconnected')
    );

  }

  // the connection to the peripheral was successful
  onConnected(peripheral) {

    this.peripheral = peripheral;
    this.setStatus('Connected to ' + (peripheral.name || peripheral.id));

    //this.showAlert("id", peripheral.id);
    //this.showAlert("service", peripheral.services[2]);
    //this.showAlert("characteristic", peripheral.characteristics[4].characteristic);
    
    // Subscribe for notifications when the temperature changes
    this.ble.startNotification(this.peripheral.id, THERMOMETER_SERVICE, TEMPERATURE_CHARACTERISTIC).subscribe(
      data => this.onTemperatureChange(data),
      () => this.showAlert('Unexpected Error', 'Failed to subscribe for temperature changes')
    )

    // Read the current value of the temperature characteristic
    this.ble.read(this.peripheral.id, peripheral.services[2], peripheral.characteristics[4].characteristic).then(
      data => this.onTemperatureChange(data),
      () => this.showAlert('Unexpected Error', 'Failed to get temperature')
    )

  }

  onTemperatureChange(buffer: ArrayBuffer) {

    // var data = new Uint8Array(1);
    // data[0] = 1;
    // BLE.write(device_id, 'FF10', 'FF11', data.buffer);

    // Temperature is a 1 byte floating point value
    var data = new Uint8Array(buffer);
    //this.showAlert("buffer", data[0]);
    this.setStatus('Temperature (degree): ' + data[0]);

    console.log(data[0]);

    this.ngZone.run(() => {
      this.temperature = data[0];
    });

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