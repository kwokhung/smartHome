import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { BluetoothSerial } from '@ionic-native/bluetooth-serial';
import { TextToSpeech } from '@ionic-native/text-to-speech';

import { MyApp } from './app.component';
import { LoggerProvider } from '../providers/logger/logger';

@NgModule({
  declarations: [
    MyApp
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    BarcodeScanner,
    BluetoothSerial,
    TextToSpeech,
    LoggerProvider
  ]
})
export class AppModule { }
