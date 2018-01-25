import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BleLightPage } from './ble-light';

@NgModule({
  declarations: [
    BleLightPage,
  ],
  imports: [
    IonicPageModule.forChild(BleLightPage),
  ],
  exports: [
    BleLightPage
  ]
})
export class BleLightPageModule {}
