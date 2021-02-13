import { Component, OnInit } from '@angular/core';
import {AuthServiceService} from '../../../services/auth-service.service';
import {TripService} from '../../../services/trip.service';
import { CommonModule } from '@angular/common';
import {AngularFirestore} from '@angular/fire/firestore';
import firebase from 'firebase';
import {JsonObject} from '@angular/compiler-cli/ngcc/src/packages/entry_point';

@Component({
  selector: 'app-zarzadzanie',
  templateUrl: './zarzadzanie.component.html',
  styleUrls: ['./zarzadzanie.component.css']
})
export class ZarzadzanieComponent implements OnInit {

  constructor(public authService: AuthServiceService, public tripService: TripService, public afs: AngularFirestore) { }


  local = '';

  Costs = this.tripService.Costs;
  flags = this.tripService.Flags;

  tekst1: string = 'Ilosc wolnych miejsc: ';
  tekst2: string = 'Brak wolnych miejsc :(';
  wyswietlany: string = this.tekst1;
  tekst = '';


  usun(index: number){
    this.flags[index] = true;
    this.usun1(index);
    return;
  }

  remove(index: number, wycieczka: JsonObject){
    this.tripService.licznik -= 1;
    this.wyswietlany = this.tekst1;
    this.tripService.removeReservation(wycieczka, index);
    if(this.tripService.ListPozostalych[index] == this.tripService.ListPozostalych_2[index]) return;
    this.tripService.ListPozostalych[index] += 1;
  }

  usun1(index: number){
    if(this.flags[index]) {
      if(this.tripService.List[index].Cena == this.Costs[this.Costs.length-1]){
        this.Costs.splice(this.Costs.length-1, 1);
      }
      if(this.tripService.List[index].Cena == this.Costs[0]){
        this.Costs.splice(0, 1);
      }
      this.tripService.ListPozostalych.splice(index, 1);
      this.flags.splice(index, 1);
      this.tripService.Selected.splice(index, 1);
      console.log(this.tripService.List[index].key);
      this.tripService.addToDeleted(this.tripService.List[index]);
      this.tripService.deleteTrip(this.tripService.List[index].key);
      this.tripService.List.splice(index,1);
      return 'none';
    }
    if(!this.authService.userStatus){
      if(this.tripService.List[index].IloscMiejsc <= 0){
        return 'none';
      }
    }
    else if(this.authService.userStatus.role == 'reader'){
      if(this.tripService.List[index].IloscMiejsc <= 0){
        return 'none';
      }
    }
    return 'block';
  }

  XD(){
    console.log(this.local);
    if(this.local == 'local'){
      firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL)
        .then(() => {
        })
        .catch((error) => {
        });
      this.tekst = 'Persistance zostało zmienione na local!';
    }
    else if(this.local == 'session') {
      firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION)
        .then(() => {
        })
        .catch((error) => {
        });
      this.tekst = 'Persistance zostało zmienione na session!';
    }
    else if(this.local == 'none'){
      firebase.auth().setPersistence(firebase.auth.Auth.Persistence.NONE)
        .then(() => {
        })
        .catch((error) => {
        });
      this.tekst = 'Persistance zostało zmienione na none!';
    }
  }

  update(obiekt: JsonObject){
    this.tripService.Actual = obiekt;
  }


  wyswietl(index: number){
    if (this.tripService.ListPozostalych[index] !== 0){
      return this.tekst1 + this.tripService.ListPozostalych[index];
    }
    else {
      return this.tekst2;
    }
  }

  ngOnInit(): void {
  }
}
