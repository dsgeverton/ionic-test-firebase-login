import { Component } from '@angular/core';
import { IonicPage, NavController, AlertController } from 'ionic-angular';
import { AngularFireAuth } from '@angular/fire/auth';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HomeUserPage } from '../home-user/home-user';
import { CreateUserPage } from '../create-user/create-user';
import { Storage } from '@ionic/storage';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

 
  loginForm: FormGroup;

  constructor(
    public navCtrl: NavController,
    public afAuth: AngularFireAuth,
    private alertCtrl: AlertController,
    public formBuilder: FormBuilder,
    public storage: Storage) {
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
        console.log("Autenticou porra!")
        this.storage.get("user").then((response) => {
          if (response == null) {
            this.storage.set("user", "empty")
          }
        })
        this.navCtrl.setRoot(HomeUserPage)
        this.afAuth.auth.signOut()
      })
      .catch((error) => {
        console.log("deu merda no login")
        this.presentAlert("Ops...", "Usuário ou senha incorretos")
      })
    } else {
      console.log("Form inválido: "+this.loginForm.status)
      this.presentAlert("Acho que tem algo errado...", "Preencha o login de forma correta")
    }
  }

  abrirCreateUser() {
    this.navCtrl.push(CreateUserPage)
  }

  presentAlert(title:string, subtitle: string) {
    let alert = this.alertCtrl.create({
      title: title,
      subTitle: subtitle,
      buttons: ['OK']
    });
    alert.present();
  }

}
