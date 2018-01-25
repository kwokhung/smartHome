import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BleScanPage } from './ble-scan';

@NgModule({
  declarations: [
    BleScanPage,
  ],
  imports: [
    IonicPageModule.forChild(BleScanPage),
  ],
  exports: [
    BleScanPage
  ]
})
export class BleScanPageModule {}
