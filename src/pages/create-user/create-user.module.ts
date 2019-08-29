import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CreateUserPage } from './create-user';
import { BrMaskerModule } from 'brmasker-ionic-3';

@NgModule({
  declarations: [
    CreateUserPage,
    // BrMaskerModule
  ],
  imports: [
    BrMaskerModule,
    IonicPageModule.forChild(CreateUserPage),
  ],
})
export class CreateUserPageModule {}
