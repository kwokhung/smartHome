import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BleButtonPage } from './ble-button';

@NgModule({
  declarations: [
    BleButtonPage,
  ],
  imports: [
    IonicPageModule.forChild(BleButtonPage),
  ],
  exports: [
    BleButtonPage
  ]
})
export class BleButtonPageModule {}
