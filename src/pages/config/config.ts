import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/Rx';

@IonicPage({
  name: 'ConfigPage'
})
@Component({
  selector: 'page-config',
  templateUrl: 'config.html',
})
export class ConfigPage {

  data: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public http: Http) {
    this.data = {};
    this.data.username = '';
    this.data.response = '';
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ConfigPage');
  }

  submit() {
    let body = JSON.stringify({ username: this.data.username });
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    this.http.post('http://192.168.4.1', body, options).toPromise().then(data => {
      this.data.response = JSON.stringify(data);
    });;
  }

}