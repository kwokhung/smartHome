import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';
import { SpeechRecognition, SpeechRecognitionListeningOptionsAndroid, SpeechRecognitionListeningOptionsIOS } from '@ionic-native/speech-recognition';
import { LoggerProvider } from '../../providers/logger/logger';

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

  constructor(public navCtrl: NavController, public navParams: NavParams, public platform: Platform, public speechRecognition: SpeechRecognition, public logger: LoggerProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SpeechPage');
  }

  /*isSpeechSupported() {
    this.speechRecognition.isRecognitionAvailable()
      .then((available: boolean) => {
        this.logger.addLog(JSON.stringify(available));
      }).catch((reason: any) => {
        this.logger.addLog(JSON.stringify(reason));
      });
  }*/
  async isSpeechSupported(): Promise<boolean> {
    let isAvailable = await this.speechRecognition.isRecognitionAvailable();
    this.logger.addLog(JSON.stringify(isAvailable));

    return isAvailable;
  }

  async getPermission(): Promise<void> {
    try {
      let permission = await this.speechRecognition.requestPermission();
      this.logger.addLog(JSON.stringify(permission));

      return permission;
    }
    catch (e) {
      this.logger.addLog(JSON.stringify(e));
    }
  }

  async hasPermission(): Promise<boolean> {
    try {
      let permission = await this.speechRecognition.hasPermission();
      this.logger.addLog(JSON.stringify(permission));

      return permission;
    }
    catch (e) {
      this.logger.addLog(JSON.stringify(e));
    }
  }

  async getSupportedLanguages(): Promise<Array<string>> {
    try {
      let languages = await this.speechRecognition.getSupportedLanguages();
      this.logger.addLog(JSON.stringify(languages));

      return languages;
    }
    catch (e) {
      this.logger.addLog(JSON.stringify(e));
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
      this.speechRecognition.startListening(this.androidOptions).subscribe((data) => {
        this.speechList = data;
      }, (error) => {
        this.logger.addLog(JSON.stringify(error));
      });
    }
    else if (this.platform.is('ios')) {
      this.speechRecognition.startListening(this.iosOptions).subscribe((data) => {
        this.speechList = data;
      }, (error) => {
        this.logger.addLog(JSON.stringify(error));
      });
    }
  }

}
