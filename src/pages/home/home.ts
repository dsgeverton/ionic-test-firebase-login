import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { CreateUserPage } from '../create-user/create-user';

import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { AngularFireAuth } from '@angular/fire/auth';
import { AlertController } from 'ionic-angular';
import { HomeUserPage } from '../home-user/home-user';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  loginForm: FormGroup;

  constructor(
    public navCtrl: NavController,
    public afAuth: AngularFireAuth,
    private alertCtrl: AlertController,
    public formBuilder: FormBuilder) {
      this.loginForm = formBuilder.group({
        email: ['', Validators.compose([Validators.required, Validators.email])],
        // Validators.pattern('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{6,16}$') regex to password
        password: ['', Validators.compose([Validators.required, Validators.minLength(6), Validators.maxLength(12)])]
      })
  }

  loginFirebase() {
    if (this.loginForm.valid) {
      console.log(this.loginForm.value)
      this.afAuth.auth.signInWithEmailAndPassword(this.loginForm.value.email, this.loginForm.value.password)
      .then((response) => {
        console.log("Autenticou!")
        this.navCtrl.setRoot(HomeUserPage)
        this.afAuth.auth.signOut()
      })
      .catch((error) => {
        console.log("deu merda no login")
        let alert = this.alertCtrl.create({
          title: 'Ops...',
          subTitle: "Usuário os senha incorretos",
          buttons: ['OK']
        });
        alert.present();
      })
    } else {
      console.log("Form inválido: "+this.loginForm.status)
      let alert = this.alertCtrl.create({
        title: 'Acho que tem algo errado...',
        subTitle: "Preencha o login de forma correta",
        buttons: ['OK']
      });
      alert.present();
    }
  }

  abrirCreateUser() {
    this.navCtrl.push(CreateUserPage)
  }

}
