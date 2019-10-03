import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { CreateUserPage } from '../create-user/create-user';

import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { AngularFireAuth } from '@angular/fire/auth';
// import { AlertController } from 'ionic-angular';
import { LoginPage } from '../login/login';
import { StatusBar } from '@ionic-native/status-bar';
import { AboutPage } from '../about/about';
import { SelectPerfilPage } from '../select-perfil/select-perfil';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  loginForm: FormGroup;

  constructor(
    public navCtrl: NavController,
    public afAuth: AngularFireAuth,
    public formBuilder: FormBuilder,
    private statusBar: StatusBar) {
      this.statusBar.overlaysWebView(true)
      this.statusBar.backgroundColorByHexString("#ffffff")
  }

  openCreateUser() {
    this.navCtrl.push(SelectPerfilPage)
  }

  openAboutScreen() {
    this.navCtrl.push(AboutPage)
  }

  openLoginUser() {
    this.navCtrl.push(LoginPage)
  }

}
