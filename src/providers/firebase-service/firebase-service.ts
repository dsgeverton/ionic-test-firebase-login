import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';

/*
  Generated class for the FirebaseServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class FirebaseServiceProvider {

  constructor(public db: AngularFireDatabase) {
    console.log('Hello FirebaseServiceProvider Provider');
  }

  save(patient: any) {
    this.db.list('patients')
    .push(patient)
    .then(r => console.log(r));
  }

}
