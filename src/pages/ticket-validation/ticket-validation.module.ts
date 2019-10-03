import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TicketValidationPage } from './ticket-validation';

@NgModule({
  declarations: [
    TicketValidationPage,
  ],
  imports: [
    IonicPageModule.forChild(TicketValidationPage),
  ],
})
export class TicketValidationPageModule {}
