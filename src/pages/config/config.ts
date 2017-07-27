import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ToastController } from 'ionic-angular';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { MqttProvider } from '../../providers/mqtt/mqtt';

@IonicPage({
  name: 'ConfigPage'
})
@Component({
  selector: 'page-config',
  templateUrl: 'config.html',
})
export class ConfigPage {

  config: FormGroup;

  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController, public toastCtrl: ToastController, public formBuilder: FormBuilder, public http: Http, public mqtt: MqttProvider) {
    this.config = this.formBuilder.group({
      host: ['', Validators.required],
      ssid: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ConfigPage');
  }

  submit() {
    this.http.post('http://' + this.config.value.host, {
      ssid: this.config.value.ssid,
      password: this.config.value.password
    }, new RequestOptions({
      headers: new Headers({
        'Content-Type': 'application/json',
        'X-Requested-With': 'XMLHttpRequest'
      })
    })).subscribe((data: Response) => {
      this.toastCtrl.create({
          message: JSON.stringify(data.json()),
          duration: 1000,
          position: 'middle'
        }).present();
    }, (error: any) => {
      this.alertCtrl.create({
        title: 'System Error',
        subTitle: JSON.stringify(error),
        buttons: ["Close"]
      }).present();
    });
  }

  reset() {
    this.mqtt.send(JSON.stringify({ what: { toDo: "reset", details: { ssid: "xxx", password: "yyy" } } }), 'nodemcu01');
  }

}