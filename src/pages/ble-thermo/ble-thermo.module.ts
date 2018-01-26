import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BleThermoPage } from './ble-thermo';

@NgModule({
  declarations: [
    BleThermoPage,
  ],
  imports: [
    IonicPageModule.forChild(BleThermoPage),
  ],
  exports: [
    BleThermoPage
  ]
})
export class BleThermoPageModule {}
