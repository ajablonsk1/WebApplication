import { Injectable } from '@angular/core';
import {AngularFireDatabase} from "@angular/fire/database";
import {JsonArray, JsonObject} from '@angular/compiler-cli/ngcc/src/packages/entry_point';
import {map} from "rxjs/operators";


@Injectable({
  providedIn: 'root'
})
export class TripService {

  List!: any[];

  constructor(private db: AngularFireDatabase) {
  }

  ListPozostalych: Array<number> = [];

  ListPozostalych_2: Array<number> = [];

  Selected: Array<number> = [];

  flag: boolean = false;

  Zarezerwowane: any[] = [];

  licznik = 0;

  Costs: any[] = [];

  Cost: any = 0;

  Flags: boolean[] = [];

  Seats = 0;

  Actual!: JsonObject;

  indexes:number[] = [];

  addTripPlus(JSONObject: JsonObject){
    const daneRef = this.db.list('zamowione');
    daneRef.push(JSONObject);
  }

  addTrip(JSONObject: JsonObject): void{
    const daneRef = this.db.list('trips');
    daneRef.push(JSONObject);
  }

  addToDeleted(jsonFile: any){
    const daneRef2 = this.db.list('deletedTrips');
    daneRef2.push(jsonFile);
  }

  deleteTrip(key: string): void {
    const daneRef = this.db.list('trips');
    daneRef.remove(key);
  }


  updateTrp(key: string, value: any){
    const daneRef = this.db.list('trips');
    daneRef.update(key, value);
  }

  getTripList(){
    const daneRef = this.db.list('trips').snapshotChanges();
    return daneRef;
  }

  getDelTripList(){
    const daneRef = this.db.list('deletedTrips').snapshotChanges();
    return daneRef;
  }

  deleteAll(){
    const daneRef = this.db.list('trips');
    daneRef.remove();
  }

  changed(){
    this.flag = true;
  }

  addReservation(JSONObject: JsonObject, index: number){
    this.Zarezerwowane.push(JSONObject);
    this.indexes.push(index);
  }

  removeReservation(JSONObject: JsonObject, index: number){
    this.Zarezerwowane.splice(this.Zarezerwowane.indexOf(JSONObject), 1);
    this.indexes.splice(this.indexes.indexOf(index), 1);
  }

  actual(wycieczka: JsonObject){
    this.Actual = wycieczka;
  }

  update(JSONObject: JsonObject){
    this.ListPozostalych[this.indexes[this.Zarezerwowane.indexOf(JSONObject)]] += 1;
    this.removeReservation(JSONObject, this.indexes[this.Zarezerwowane.indexOf(JSONObject)]);
  }
}
