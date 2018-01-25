import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BleLightDetailsPage } from './ble-light-details';

@NgModule({
  declarations: [
    BleLightDetailsPage,
  ],
  imports: [
    IonicPageModule.forChild(BleLightDetailsPage),
  ],
  exports: [
    BleLightDetailsPage
  ]
})
export class BleLightDetailsPageModule {}
