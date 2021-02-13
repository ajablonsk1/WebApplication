import {Component, Input, OnInit, Output, EventEmitter, ChangeDetectorRef, AfterContentChecked } from '@angular/core';
import data from '/src/app/wycieczki/dane/dane.json';
import {Form, FormGroup} from "@angular/forms";
import {JsonObject} from "@angular/compiler-cli/ngcc/src/packages/entry_point";
import {TripService} from "../../services/trip.service";
import {InfoComponent} from "./informacjeSzczegolowe/info/info.component";
import {AuthServiceService} from '../../services/auth-service.service';
import {AngularFirestoreDocument} from '@angular/fire/firestore';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-zawartosc',
  templateUrl: './zawartosc.component.html',
  styleUrls: ['./zawartosc.component.css']
})
export class ZawartoscComponent implements OnInit {


  licznik: number = this.tripService.licznik;

  readonly = false;

  flag_ = false;

  ListPozostalych: Array<number> = this.tripService.ListPozostalych;

  tekst1: string = 'Ilosc wolnych miejsc: ';
  tekst2: string = 'Brak wolnych miejsc :(';
  wyswietlany: string = this.tekst1;
  flag: boolean = true;
  flags: Array<boolean> = this.tripService.Flags;
  Costs: Array<number> = this.tripService.Costs;



  miejsca(index: number){
    if(this.tripService.ListPozostalych[index] == 0) return;
    return this.tripService.ListPozostalych[index];
  }

  wyswietl(index: number){
    if (this.tripService.ListPozostalych[index] !== 0){
      return this.tekst1 + this.tripService.ListPozostalych[index];
    }
    else {
      return this.tekst2;
    }
  }

  add(index: number, wycieczka: JsonObject){
    this.tripService.licznik += 1;
    this.tripService.ListPozostalych[index] -= 1;
    console.log(this.tripService.ListPozostalych);
    console.log(this.tripService.ListPozostalych_2);
    this.tripService.addReservation(wycieczka, index);
  }

  onActive(wycieczka: JsonObject, List: any[]){
    this.tripService.Actual = wycieczka;
    this.tripService.List = List;
  }

  remove(index: number, wycieczka: JsonObject){
    this.tripService.licznik -= 1;
    this.wyswietlany = this.tekst1;
    this.tripService.removeReservation(wycieczka, index);
    if(this.tripService.ListPozostalych[index] == this.tripService.ListPozostalych_2[index]) return;
    this.tripService.ListPozostalych[index] += 1;
  }

  display1(index: number){
    if(this.tripService.ListPozostalych[index] == this.tripService.ListPozostalych_2[index]) return 'none';
    else return 'inline-block';
  }

  display(index: number){
    if(this.tripService.ListPozostalych[index] === 0) return 'none';
    else return 'inline-block';
  }

  background(index: number){
    if(this.tripService.ListPozostalych[index] <= 3) return '#e8819a';
    return;
  }


  styl(){
    if(this.tripService.licznik >= 10) return '#87d257';
    else return '#d25766';
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

  maks(index: number){
    if(typeof this.tripService.List[index] === "undefined") return;
    if(this.Costs[this.Costs.length-1] === this.tripService.List[index].Cena) return true;
    return false;
  }

  minn(index: number){
    if(typeof this.tripService.List[index] === "undefined") return false;
    if(this.Costs[0] === this.tripService.List[index].Cena) return true;
    return false;
  }


  constructor(private cdref: ChangeDetectorRef, public tripService: TripService, public authService: AuthServiceService) { }
  ngAfterContentChecked() {
    this.cdref.detectChanges();
  }

  isReader(wycieczka: any, userStatus: any){
    if(!userStatus && this.tripService.List[this.tripService.List.indexOf(wycieczka)].IloscMiejsc == 0){
      return 'none';
    }
    else if (userStatus && userStatus.role == 'reader' && this.tripService.List[this.tripService.List.indexOf(wycieczka)].IloscMiejsc == 0){
      return 'none';
    }
    return 'block';
  }

    ngOnInit(): void {}


  take1(IloscMiejsc: number, Cena: number){
      this.tripService.Selected.push(0);
      this.tripService.ListPozostalych.push(IloscMiejsc);
      this.tripService.ListPozostalych_2.push(IloscMiejsc);
      this.Costs.push(Cena);
      this.Costs.sort((a, b) => a - b);
    }

}






