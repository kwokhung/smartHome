import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { SpeechRecognition } from '@ionic-native/speech-recognition';

@IonicPage({
  name: 'SpeechPage'
})
@Component({
  selector: 'page-speech',
  templateUrl: 'speech.html',
})
export class SpeechPage {

  text: string;

  constructor(public navCtrl: NavController, public navParams: NavParams, public speechRecognition: SpeechRecognition) {
    // Check feature available
    this.speechRecognition.isRecognitionAvailable()
      .then((available: boolean) => console.log(available))

    // Start the recognition process
    this.speechRecognition.startListening({})
      .subscribe(
      (matches: Array<string>) => console.log(matches),
      (onerror) => console.log('error:', onerror)
      );

    // Stop the recognition process (iOS only)
    this.speechRecognition.stopListening()

    // Get the list of supported languages
    this.speechRecognition.getSupportedLanguages()
      .then(
      (languages: Array<string>) => console.log(languages),
      (error) => console.log(error)
      );

    // Check permission
    this.speechRecognition.hasPermission()
      .then((hasPermission: boolean) => console.log(hasPermission));

    // Request permissions
    this.speechRecognition.requestPermission()
      .then(
      () => console.log('Granted'),
      () => console.log('Denied')
      );
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SpeechPage');
  }

}
