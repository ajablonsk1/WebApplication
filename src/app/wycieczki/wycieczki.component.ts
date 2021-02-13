import { Component, OnInit, ChangeDetectorRef, AfterContentChecked, Input} from '@angular/core';
import data from '/src/app/wycieczki/dane/dane.json';
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {TripService} from "../services/trip.service";
import {map} from "rxjs/operators";
import {JsonObject} from "@angular/compiler-cli/ngcc/src/packages/entry_point";
import {ZawartoscComponent} from "./zawartosc/zawartosc.component";
import {KoszComponent} from "./zawartosc/kosz/kosz/kosz.component";
import {FormComponent} from "./zawartosc/form/form.component";
import {AuthServiceService} from '../services/auth-service.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-wycieczki',
  templateUrl: './wycieczki.component.html',
  styleUrls: ['./wycieczki.component.css']
})
export class WycieczkiComponent implements OnInit {

  ListaWycieczek: any;

  JSONObject: JsonObject[] = data;

  userStatus = this.authService.userStatus;

  licznik: number = 0;

  ListPozostalych: Array<number> = [];

  ListPozostalych_2: Array<number> = [];

  getTripList(){
    this.TripService.getTripList().pipe(
      map(e =>
        e.map(e_ =>
          ({key: e_.payload.key, ...e_.payload.exportVal()})
        )
      )
    ).subscribe(wycieczki => {
      this.ListaWycieczek = wycieczki;
      this.TripService.List = wycieczki;
      if(this.ListaWycieczek.length > this.TripService.Selected.length)
        while(this.ListaWycieczek.length !== this.TripService.Selected.length){
          this.TripService.Selected.push(0);
        }
      for (const wycieczka of wycieczki) {
        this.ListPozostalych.push(wycieczka.IloscMiejsc);
        this.ListPozostalych_2.push(wycieczka.IloscMiejsc);
        this.TripService.Costs.push(wycieczka.Cena);
        this.TripService.Costs.sort((a, b) => a - b);
        this.TripService.Flags.push(false);
      }
    });
  }

  getEmail(User: any){
    if(!User) return;
    return this.authService.userStatus.email;
  }

  constructor(private TripService: TripService, public authService: AuthServiceService) {
    TripService.List = this.ListaWycieczek;
    this.TripService.ListPozostalych = this.ListPozostalych;
    this.TripService.ListPozostalych_2 = this.ListPozostalych_2;
  }

  onActivate(event: ZawartoscComponent | KoszComponent | FormComponent){
    if(event instanceof ZawartoscComponent){
      if(this.TripService.flag) event.take1(this.TripService.Seats, this.TripService.Cost);
      this.TripService.flag = false;
    }
  }

  ngOnInit(): void {
    this.getTripList();
  }
}


