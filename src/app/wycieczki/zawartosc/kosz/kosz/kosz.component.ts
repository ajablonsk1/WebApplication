import { Component, OnInit } from '@angular/core';
import {TripService} from "../../../../services/trip.service";
import {JsonObject} from "@angular/compiler-cli/ngcc/src/packages/entry_point";
import {map} from "rxjs/operators";
import {AuthServiceService} from '../../../../services/auth-service.service';

@Component({
  selector: 'app-kosz',
  templateUrl: './kosz.component.html',
  styleUrls: ['./kosz.component.css']
})
export class KoszComponent implements OnInit {

  constructor(private tripService: TripService, private auth: AuthServiceService) { }

  Reserved: any[] = this.tripService.Zarezerwowane;
  ListaWycieczek!: any[];

  getTripList(){
    this.tripService.getTripList().pipe(
      map(e =>
        e.map(e_ =>
          ({key: e_.payload.key, ...e_.payload.exportVal()})
        )
      )
    ).subscribe(wycieczki => {
      this.ListaWycieczek = wycieczki;
    })
  }
  index = 0;

  ngOnInit(): void {
    this.getTripList();
  }

  click(wycieczka: any){
    wycieczka['email'] = this.auth.userStatus.email;
    this.tripService.addTripPlus(wycieczka);
    this.ListaWycieczek.splice(this.ListaWycieczek.indexOf(wycieczka), 1);
  }

  onCLick(JSONObject: JsonObject){
    this.tripService.update(JSONObject);
    this.tripService.licznik -= 1;
  }
}
