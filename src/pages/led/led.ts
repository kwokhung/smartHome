import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Paho } from 'ng2-mqtt/mqttws31';

interface BrightnessParameter {
  RVALUE: number;
  GVALUE: number;
  BVALUE: number;
}

@IonicPage({
  name: 'LedPage'
})
@Component({
  selector: 'page-led',
  templateUrl: 'led.html',
})
export class LedPage {
  client: any;
  redBrightness: number = 0;
  greenBrightness: number = 0;
  blueBrightness: number = 0;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.client = new Paho.MQTT.Client("mbltest01.mqtt.iot.gz.baidubce.com", Number("8884"), "/mqtt", "DeviceId-s42mw9zs48");

    this.client.onConnectionLost = (response) => {
      console.log("onConnectionLost: " + response.errorCode);
      console.log("onConnectionLost: " + response.errorMessage);
    };

    this.client.onMessageArrived = (message) => {
      console.log("onMessageArrived: " + message.payloadString);
      console.log(message);

      let brightness: BrightnessParameter = JSON.parse(message.payloadString);

      this.redBrightness = this.constraint(brightness.RVALUE);
      this.greenBrightness = this.constraint(brightness.GVALUE);
      this.blueBrightness = this.constraint(brightness.BVALUE);
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

  constraint(brightness: number): number {
    if (brightness >= 0 && brightness <= 1023) {
      return brightness;
    }
    else if (brightness < 0) {
      return 0;
    }
    else if (brightness > 1023) {
      return 1023;
    }
  }

  slide(event) {
    console.log(event);

    let brightness: BrightnessParameter = {
      RVALUE: this.redBrightness,
      GVALUE: this.greenBrightness,
      BVALUE: this.blueBrightness
    };

    let message: any = new Paho.MQTT.Message(JSON.stringify(brightness));
    message.destinationName = "nodemcu01";

    this.client.send(message);
  }
}