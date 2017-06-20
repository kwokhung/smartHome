import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';
import { SpeechRecognition, SpeechRecognitionListeningOptionsAndroid, SpeechRecognitionListeningOptionsIOS } from '@ionic-native/speech-recognition';

@IonicPage({
  name: 'SpeechPage'
})
@Component({
  selector: 'page-speech',
  templateUrl: 'speech.html',
})
export class SpeechPage {

  speechList: Array<string> = [];
  androidOptions: SpeechRecognitionListeningOptionsAndroid;
  iosOptions: SpeechRecognitionListeningOptionsIOS;

  constructor(public navCtrl: NavController, public navParams: NavParams, public platform: Platform, public speechRecognition: SpeechRecognition) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SpeechPage');
  }

  async isSpeechSupported(): Promise<boolean> {
    let isAvailable = await this.speechRecognition.isRecognitionAvailable();
    console.log(isAvailable);
    return isAvailable;
  }

  async getPermission(): Promise<void> {
    try {
      let permission = await this.speechRecognition.requestPermission();
      console.log(permission);
      return permission;
    }
    catch (e) {
      console.error(e);
    }
  }

  async hasPermission(): Promise<boolean> {
    try {
      let permission = await this.speechRecognition.hasPermission();
      console.log(permission);
      return permission;
    }
    catch (e) {
      console.error(e);
    }
  }

  async getSupportedLanguages(): Promise<Array<string>> {
    try {
      let languages = await this.speechRecognition.getSupportedLanguages();
      console.log(languages);
      return languages;
    }
    catch (e) {
      console.error(e);
    }
  }

  listenForSpeech(): void {

    this.androidOptions = {
      prompt: 'Speak into your phone!'
    }

    this.iosOptions = {
      language: 'en-US'
    }

    if (this.platform.is('android')) {
      this.speechRecognition.startListening(this.androidOptions).subscribe(data => this.speechList = data, error => console.log(error));
    }
    else if (this.platform.is('ios')) {
      this.speechRecognition.startListening(this.iosOptions).subscribe(data => this.speechList = data, error => console.log(error));
    }
  }

}
