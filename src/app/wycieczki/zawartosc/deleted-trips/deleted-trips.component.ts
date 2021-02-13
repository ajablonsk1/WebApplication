import { Component, OnInit } from '@angular/core';
import {TripService} from '../../../services/trip.service';
import {map} from 'rxjs/operators';

@Component({
  selector: 'app-deleted-trips',
  templateUrl: './deleted-trips.component.html',
  styleUrls: ['./deleted-trips.component.css']
})
export class DeletedTripsComponent implements OnInit {

  List!: any[];

  constructor(public tripService: TripService) { }

  ngOnInit(): void {
    this.tripService.getDelTripList().pipe(
      map((e: any) =>
        e.map((e_: any) =>
          ({key: e_.payload.key, ...e_.payload.exportVal()})
        )
      )
    ).subscribe((wycieczki: any) => {
      this.List = wycieczki;
      }
    );
  }
}
