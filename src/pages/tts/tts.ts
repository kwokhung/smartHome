import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { TextToSpeech } from '@ionic-native/text-to-speech';
import { LoggerProvider } from '../../providers/logger/logger';

@IonicPage({
  name: 'TtsPage'
})
@Component({
  selector: 'page-tts',
  templateUrl: 'tts.html',
})
export class TtsPage {

  text: string;

  constructor(public navCtrl: NavController, public navParams: NavParams, public tts: TextToSpeech, public logger: LoggerProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TtsPage');
  }

  sayText() {
    this.tts.speak(this.text)
      .then(() => {
        this.logger.addLog(JSON.stringify('Success'));
      })
      .catch((reason: any) => {
        this.logger.addLog(JSON.stringify(reason));
      });
  }

}
