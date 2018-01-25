import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BleConnectDetailsPage } from './ble-connect-details';

@NgModule({
  declarations: [
    BleConnectDetailsPage,
  ],
  imports: [
    IonicPageModule.forChild(BleConnectDetailsPage),
  ],
  exports: [
    BleConnectDetailsPage
  ]
})
export class BleConnectDetailsPageModule {}
