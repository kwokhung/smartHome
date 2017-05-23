import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LedPage } from './led';

@NgModule({
  declarations: [
    LedPage,
  ],
  imports: [
    IonicPageModule.forChild(LedPage),
  ],
  exports: [
    LedPage
  ]
})
export class LedPageModule {}
