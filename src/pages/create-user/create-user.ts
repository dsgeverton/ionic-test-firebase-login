import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';

import { AngularFireAuth } from '@angular/fire/auth';

@IonicPage({
  name: "create-user"
})
@Component({
  selector: 'page-create-user',
  templateUrl: 'create-user.html',
})
export class CreateUserPage {

  registerForm: FormGroup;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public formBuilder: FormBuilder,
    public afAuth: AngularFireAuth) {

      this.registerForm = formBuilder.group({
        name: ['', Validators.compose([Validators.required, Validators.minLength(5)])],
        email: ['', Validators.compose([Validators.required, Validators.email])],
        password: ['', Validators.compose([Validators.required, Validators.minLength(6), Validators.maxLength(12), Validators.pattern('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{6,16}$')])],
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
   console.log(this.registerForm.value)
    this.afAuth.auth.createUserWithEmailAndPassword(
      this.registerForm.value.email, this.registerForm.value.password)
      .then((response) => {
        console.log("Criou o usuário.");
      })
      .catch((error) => {
        console.log("Deu erro")
      })
  }
}
