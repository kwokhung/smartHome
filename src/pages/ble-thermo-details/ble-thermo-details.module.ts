import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BleThermoDetailsPage } from './ble-thermo-details';

@NgModule({
  declarations: [
    BleThermoDetailsPage,
  ],
  imports: [
    IonicPageModule.forChild(BleThermoDetailsPage),
  ],
  exports: [
    BleThermoDetailsPage
  ]
})
export class BleThermoDetailsPageModule {}
