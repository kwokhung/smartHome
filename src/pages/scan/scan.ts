import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';

@IonicPage({
  name: 'ScanPage'
})
@Component({
  selector: 'page-scan',
  templateUrl: 'scan.html',
})
export class ScanPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController, public barcodeScanner: BarcodeScanner) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ScanPage');
  }

  scan() {
    this.barcodeScanner.scan().then((barcodeData) => {
      this.alertCtrl.create({
        title: "Scan Results",
        subTitle: JSON.stringify(barcodeData),
        buttons: ["Close"]
      }).present();
    }, (err) => {
      this.alertCtrl.create({
        title: "Attention!",
        subTitle: JSON.stringify(err),
        buttons: ["Close"]
      }).present();
    });
  }
  
}
