import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Http, Headers, RequestOptions } from '@angular/http';

@IonicPage({
  name: 'ConfigPage'
})
@Component({
  selector: 'page-config',
  templateUrl: 'config.html',
})
export class ConfigPage {

  config: FormGroup;
  response: string;

  constructor(public navCtrl: NavController, public navParams: NavParams, public formBuilder: FormBuilder, public http: Http) {
    this.config = this.formBuilder.group({
      host: ['', Validators.required],
      ssid: ['', Validators.required],
      password: ['', Validators.required],
    });

    this.response = '';
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ConfigPage');
  }

  submit() {
    //jsonplaceholder.typicode.com/posts
    //let body = JSON.stringify({ title: this.config.value.ssid, body: this.config.value.password, userId: 1 });
    let body = JSON.stringify({ ssid: this.config.value.ssid, password: this.config.value.password });

    this.http.post('http://' + this.config.value.host, body, new RequestOptions({
      headers: new Headers({ 'Content-Type': 'application/json' })
    })).subscribe(data => {
      this.response = JSON.stringify(data.json());
    }, error => {
      this.response = JSON.stringify(error);
    });
  }

}