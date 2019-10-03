import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';

import { AngularFireDatabase } from '@angular/fire/database';

@IonicPage()
@Component({
  selector: 'page-home-user',
  templateUrl: 'home-user.html',
})
export class HomeUserPage {

  private uid: string;
  private user = {
    name: "Hello",
    email: "teste@gmail.com",
  };
  private teste;
  
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public storage: Storage,
    public db: AngularFireDatabase) {
    }
    
    ionViewDidLoad() {
      console.log('ionViewDidLoad HomeUserPage');
    this.storage.get("user").then((response) => {
      if (response != null) {
        this.uid = response;
        console.log("recebeu o uid "+this.uid)
        this.teste = this.db.database.ref('patients/'+this.uid);
        this.teste.on('value', (snap) => {
          this.setChanges(snap.val())
          console.log(snap.val())
        })
      }
    })
  }
  
  setChanges(patient) {
    this.user.name = patient.name
    this.user.email = patient.email
  }
}
