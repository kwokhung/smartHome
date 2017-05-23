import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Paho } from 'ng2-mqtt/mqttws31';

@IonicPage({
  name: 'LedPage'
})
@Component({
  selector: 'page-led',
  templateUrl: 'led.html',
})
export class LedPage {
  contrast: number = 0;
  message: string;
  client: any;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.client = new Paho.MQTT.Client("mbltest01.mqtt.iot.gz.baidubce.com", Number("8884"), "/mqtt", "DeviceId-s42mw9zs48");

    this.client.onConnectionLost = (response) => {
      console.log("onConnectionLost: " + response.errorCode);
      console.log("onConnectionLost: " + response.errorMessage);
    };

    this.client.onMessageArrived = (message) => {
      console.log("onMessageArrived: " + message.payloadString);
      console.log(message);

      this.message = message.payloadString;

      let contrast: number = Number(this.message);

      if (contrast >= 0 && contrast <= 1023) {
        this.contrast = contrast;
      }
      else if (contrast < 0) {
        this.contrast = 0;
      }
      else if (contrast > 1023) {
        this.contrast = 1023;
      }
    };

    this.client.onMessageDelivered = (message) => {
      console.log("onMessageDelivered: " + message.payloadString);
      console.log(message);
    };

    this.client.connect({
      useSSL: true,
      userName: "mbltest01/letv1s01",
      password: "hzrU8ekRn7MR7X4ycTO6OzbKbRDaaK5tmaLVY+Ue/58=",
      invocationContext: {
        userName: "mbltest01/letv1s01"
      },
      onSuccess: (context) => {
        console.log("connect.onSuccess");
        console.log(context);
        console.log(this);

        this.client.subscribe("letv1s01", {
          invocationContext: {
            topic: "letv1s01"
          },
          onSuccess: (response) => {
            console.log("subscribe.onSuccess: " + response.grantedQos);
            console.log(response.invocationContext);
          },
          onFailure: (response) => {
            console.log("subscribe.onFailure: " + response.errorCode);
            console.log(response.invocationContext);
          }
        });

        let message: any = new Paho.MQTT.Message("Hello");
        message.destinationName = "nodemcu01";

        this.client.send(message);
      },
      onFailure: (response) => {
        console.log("connect.onFailure: " + response.errorCode);
        console.log("connect.onFailure: " + response.errorMessage);
        console.log(response.invocationContext);
      }
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LedPage');
  }

  slide(event) {
    console.log(event);

    let message: any = new Paho.MQTT.Message(String(event.value));
    message.destinationName = "nodemcu01";

    this.client.send(message);
  }
}