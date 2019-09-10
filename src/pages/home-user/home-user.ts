import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';

@IonicPage()
@Component({
  selector: 'page-home-user',
  templateUrl: 'home-user.html',
})
export class HomeUserPage {

  private uid: string;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public storage: Storage) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HomeUserPage');
    this.storage.get("user").then((response) => {
      if (response != null) {
        this.uid = response;
        console.log("recebeu o uid "+this.uid)
      }
    })
  }

}
