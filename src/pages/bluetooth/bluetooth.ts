import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';
import { BluetoothSerial } from '@ionic-native/bluetooth-serial';

@IonicPage({
  name: 'BluetoothPage'
})
@Component({
  selector: 'page-bluetooth',
  templateUrl: 'bluetooth.html',
})
export class BluetoothPage {
  devices: Array<any>;

  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController, public loadingCtrl: LoadingController, public bluetoothSerial: BluetoothSerial) {
    this.bluetoothSerial.isEnabled().then((data) => {
      this.bluetoothSerial.list().then((devices) => {
        this.devices = devices;
      }, (err) => {
        this.alertCtrl.create({
          title: "Attention!",
          subTitle: JSON.stringify(err),
          buttons: ["Close"]
        }).present();
      });
    }, (err) => {
      this.alertCtrl.create({
        title: "Attention!",
        subTitle: JSON.stringify(err),
        buttons: ["Close"]
      }).present();
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad BluetoothPage');
  }

  openDeviceDetails(device) {
    let loading = this.loadingCtrl.create({
      content: 'Connecting...'
    });

    loading.present();

    this.bluetoothSerial.connect(device.address).subscribe((data) => {
      loading.dismiss();

      this.alertCtrl.create({
        title: device.name,
        subTitle: JSON.stringify(data),
        buttons: ["Close"]
      }).present();

      this.bluetoothSerial.subscribe('\n').subscribe((data) => {
        this.alertCtrl.create({
          title: device.name,
          subTitle: JSON.stringify(data),
          buttons: ["Close"]
        }).present();
      });
    }, (err) => {
      loading.dismiss();

      this.alertCtrl.create({
        title: device.name,
        subTitle: JSON.stringify(err),
        buttons: ["Close"]
      }).present();
    });
  }

}
