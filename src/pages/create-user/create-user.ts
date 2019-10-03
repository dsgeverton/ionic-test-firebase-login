import { HomeUserPage } from './../home-user/home-user';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';

import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireDatabase } from '@angular/fire/database';
import { AlertController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
const uuidv1 = require('uuid/v4');

import CryptoJS from 'crypto-js';

@IonicPage()
@Component({
  selector: 'page-create-user',
  templateUrl: 'create-user.html',
})
export class CreateUserPage {

  registerUserForm: FormGroup;
  uid: string;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public formBuilder: FormBuilder,
    public afAuth: AngularFireAuth,
    private alertCtrl: AlertController,
    public storage: Storage,
    public db: AngularFireDatabase) {
    this.validateForm()
  }

  validateForm() {
    this.registerUserForm = this.formBuilder.group({
      name: ['', Validators.compose([Validators.required, Validators.minLength(5)])],
      cpf: ['', Validators.compose([Validators.required])],
      dataNascimento: ['', Validators.compose([Validators.required])],
      email: ['', Validators.compose([Validators.required, Validators.email])],
      // Validators.pattern('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{6,16}$') regex to password
      password: ['', Validators.compose([Validators.required, Validators.minLength(6), Validators.maxLength(12)])],
      confirmPassword: ['', Validators.required]
    }, {validator: this.matchingPasswords('password', 'confirmPassword')});
  }

  matchingPasswords(passwordKey: string, confirmPasswordKey: string) {
    return (group: FormGroup): {[key: string]: any} => {
      let password = group.controls[passwordKey];
      let confirmPassword = group.controls[confirmPasswordKey];

      if (password.value !== confirmPassword.value) {
        return {
          mismatchedPasswords: true
        };
      }
    }
  }

  submitForm() {
   console.log(this.registerUserForm.value)
    this.afAuth.auth.createUserWithEmailAndPassword(
      this.registerUserForm.value.email, this.registerUserForm.value.password)
      .then((response) => {
        this.addUserToFirebase()
      })
      .catch((error) => {
        console.log("Deu erro: "+error.code)
        if (error.code == "auth/email-already-in-use")
          this.presentAlert("Ops...", "O endereço de email já está sendo utilizado por outra conta")
      })
  }

  addUserToFirebase() {
    this.uid = uuidv1()
    console.log("Criou o usuário "+this.uid+".");
    this.db.database.ref("/patients").child(this.uid).set({
      name: this.registerUserForm.value.name,
      cpf: this.registerUserForm.value.cpf,
      email: this.registerUserForm.value.email,
      password: CryptoJS.SHA256(this.registerUserForm.value.password).toString(CryptoJS.enc.Hex)
    })
    .then(() => {
      console.log("Usuário adicionado!")
      this.db.database.ref("/cpfs").child(CryptoJS.SHA256(this.registerUserForm.value.cpf).toString(CryptoJS.enc.Hex)).set({
        string_value: this.registerUserForm.value.cpf
      })
      this.storage.set("user", this.uid).then(() => {
        this.presentAlert("Criação de usuário...", "Bem-vindo ao app " + this.registerUserForm.value.name + "!")
        this.navCtrl.setRoot(HomeUserPage)
      })
    })
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
