import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { BluetoothSerial } from '@ionic-native/bluetooth-serial';

@IonicPage({
  name: 'BluetoothPage'
})
@Component({
  selector: 'page-bluetooth',
  templateUrl: 'bluetooth.html',
})
export class BluetoothPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController, public bluetoothSerial: BluetoothSerial) {
    bluetoothSerial.isEnabled().then((data) => {
      this.alertCtrl.create({
        title: "Bluetooth is enable",
        subTitle: JSON.stringify(data),
        buttons: ["Close"]
      }).present();

      bluetoothSerial.list().then((allDevices) => {
        this.alertCtrl.create({
          title: "Device List",
          subTitle: JSON.stringify(allDevices),
          buttons: ["Close"]
        }).present();
      });
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad BluetoothPage');
  }

}
