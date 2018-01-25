import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ToastController, LoadingController, Loading  } from 'ionic-angular';
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

  loading: Loading;
  form: FormGroup;
  formSubmitted: boolean;

  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController, public toastCtrl: ToastController, public loadingCtrl: LoadingController, public formBuilder: FormBuilder, public http: Http, public mqtt: MqttProvider) {
    this.form = this.formBuilder.group({
      txtHost: ['', Validators.required],
      txtSsid: ['', Validators.required],
      txtPassword: ['', Validators.required],
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ConfigPage');
  }

  ionViewDidEnter() {
    this.formSubmitted = false;
  }

  public submit() {
    this.formSubmitted = true;

    this.showLoading();

    this.http.post('http://' + this.form.value.txtHost, {
      ssid: this.form.value.txtSsid,
      password: this.form.value.txtPassword
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
      this.showError(JSON.stringify(error));
    });
  }

  public reset() {
    this.mqtt.send(JSON.stringify({ what: { toDo: "reset", details: { ssid: "xxx", password: "yyy" } } }), 'nodemcu01');
  }

  showLoading() {
    this.loading = this.loadingCtrl.create({
      content: 'Please wait...',
      dismissOnPageChange: true
    });

    this.loading.present();
  }

  showError(text) {
    this.loading.dismiss();

    this.alertCtrl.create({
      title: 'System Error',
      subTitle: text,
      buttons: ['Close']
    }).present();
  }

}