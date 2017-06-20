import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { TextToSpeech } from '@ionic-native/text-to-speech';

@IonicPage({
  name: 'TtsPage'
})
@Component({
  selector: 'page-tts',
  templateUrl: 'tts.html',
})
export class TtsPage {

  text: string;

  constructor(public navCtrl: NavController, public navParams: NavParams, public tts: TextToSpeech) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TtsPage');
  }

  sayText() {
    this.tts.speak(this.text)
      .then(() => console.log('Success'))
      .catch((reason: any) => console.log(reason));
  }

}
