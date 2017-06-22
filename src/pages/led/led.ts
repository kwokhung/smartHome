import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { LoggerProvider } from '../../providers/logger/logger';
import { MqttProvider } from '../../providers/mqtt/mqtt';

interface BrightnessParameter {
  RVALUE: number;
  GVALUE: number;
  BVALUE: number;
}

@IonicPage({
  name: 'aLedPage'
})
@Component({
  selector: 'page-led',
  templateUrl: 'led.html',
})
export class LedPage {
  redBrightness: number = 0;
  greenBrightness: number = 0;
  blueBrightness: number = 0;

  constructor(public navCtrl: NavController, public navParams: NavParams, public logger: LoggerProvider, public mqtt: MqttProvider) {
    mqtt.client.onMessageArrived = (message) => {
      console.log("onMessageArrived: " + message.payloadString);
      console.log(message);

      let brightness: BrightnessParameter = JSON.parse(message.payloadString);

      this.redBrightness = this.constraint(brightness.RVALUE);
      this.greenBrightness = this.constraint(brightness.GVALUE);
      this.blueBrightness = this.constraint(brightness.BVALUE);
    };

    mqtt.send('{\"RVALUE\":0,\"GVALUE\":0,\"BVALUE\":0}', 'nodemcu01');
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

    this.mqtt.send(JSON.stringify(brightness), 'nodemcu01');
  }

}