import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BleButtonDetailsPage } from './ble-button-details';

@NgModule({
  declarations: [
    BleButtonDetailsPage,
  ],
  imports: [
    IonicPageModule.forChild(BleButtonDetailsPage),
  ],
  exports: [
    BleButtonDetailsPage
  ]
})
export class BleButtonDetailsPageModule {}
