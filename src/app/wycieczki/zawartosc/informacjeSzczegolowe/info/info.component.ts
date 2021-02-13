import { Component, OnInit } from '@angular/core';
import {JsonObject} from "@angular/compiler-cli/ngcc/src/packages/entry_point";
import {TripService} from "../../../../services/trip.service";

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.css']
})
export class InfoComponent implements OnInit {

  WybranaWycieczka: any = this.tripService.Actual;
  ListaWycieczek: any[] = this.tripService.List;
  licznik:number = this.tripService.licznik;

  ListPozostalych: Array<number> = this.tripService.ListPozostalych;
  ListPozostalych_2: Array<number> = this.tripService.ListPozostalych_2;

  tekst1: string = 'Ilosc wolnych miejsc: ';
  tekst2: string = 'Brak wolnych miejsc :(';
  wyswietlany: string = this.tekst1;
  Selected = this.tripService.Selected;

  constructor(public tripService: TripService) {
  }

  ngOnInit(): void {
  }


  add(index: number, wycieczka: JsonObject){
    this.tripService.licznik += 1;
    this.tripService.ListPozostalych[index] -= 1;
    this.tripService.addReservation(wycieczka, index);
    if(this.ListPozostalych[index] != 0){
      this.wyswietlany = this.tekst1;
    }
    else {
      this.wyswietlany = this.tekst2;
    }
  }

  styl(){
    if(this.licznik >= 10) return '#87d257';
    else return '#d25766';
  }

  remove(index: number, wycieczka: JsonObject){
    this.tripService.licznik -= 1;
    this.wyswietlany = this.tekst1;
    this.tripService.removeReservation(wycieczka, index);
    if(this.ListPozostalych[index] == this.ListPozostalych_2[index]) return;
    this.tripService.ListPozostalych[index] += 1;
  }

  display1(index: number){
    if(this.ListPozostalych[index] == this.ListPozostalych_2[index]) return 'none';
    else return 'inline-block';
  }

  display(index: number){
    if(this.ListPozostalych[index] == 0) return 'none';
    else return 'inline-block';
  }
}
