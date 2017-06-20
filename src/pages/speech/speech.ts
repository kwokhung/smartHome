import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { TextToSpeech } from '@ionic-native/text-to-speech';

@IonicPage({
  name: 'SpeechPage'
})
@Component({
  selector: 'page-speech',
  templateUrl: 'speech.html',
})
export class SpeechPage {

  text: string;

  constructor(public navCtrl: NavController, public navParams: NavParams, public tts: TextToSpeech) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SpeechPage');
  }

  async sayText(): Promise<any> {
    try {
      await this.tts.speak(this.text);
    }
    catch (e) {
      console.log(e);
    }
  }

}
