import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { TicketValidationPage } from '../ticket-validation/ticket-validation';
import { LoginPage } from '../login/login';

/**
 * Generated class for the SelectPerfilPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-select-perfil',
  templateUrl: 'select-perfil.html',
})
export class SelectPerfilPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SelectPerfilPage');
  }

  openLoginUser() {
    this.navCtrl.push(LoginPage)
  }

  vilidarTicket() {
    this.navCtrl.push(TicketValidationPage)
  }
}
