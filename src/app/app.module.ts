import { HomeUserPageModule } from './../pages/home-user/home-user.module';
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';

import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabase } from '@angular/fire/database';
import { environment } from '../environments/environment';
import { AngularFireAuth } from '@angular/fire/auth';
import { CreateUserPageModule } from '../pages/create-user/create-user.module';
import { LoginPageModule } from '../pages/login/login.module';
import { AboutPageModule } from '../pages/about/about.module';

import { IonicStorageModule } from '@ionic/storage';
import { FirebaseServiceProvider } from '../providers/firebase-service/firebase-service';
import { SelectPerfilPageModule } from '../pages/select-perfil/select-perfil.module';
import { TicketValidationPageModule } from '../pages/ticket-validation/ticket-validation.module';

@NgModule({
  declarations: [
    MyApp,
    HomePage
  ],
  imports: [
    BrowserModule,
    HomeUserPageModule,
    CreateUserPageModule,
    SelectPerfilPageModule,
    LoginPageModule,
    TicketValidationPageModule,
    AboutPageModule,
    IonicStorageModule.forRoot(),
    AngularFireModule.initializeApp(environment.firebase),
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    AngularFireAuth,
    AngularFireDatabase,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    FirebaseServiceProvider
  ]
})
export class AppModule {}
