import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TtsPage } from './tts';

@NgModule({
  declarations: [
    TtsPage,
  ],
  imports: [
    IonicPageModule.forChild(TtsPage),
  ],
  exports: [
    TtsPage
  ]
})
export class TtsPageModule {}
