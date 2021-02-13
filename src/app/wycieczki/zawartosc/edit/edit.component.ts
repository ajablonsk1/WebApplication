import { Component, OnInit } from '@angular/core';
import {TripService} from '../../../services/trip.service';
import {AngularFirestore} from '@angular/fire/firestore';
import {AngularFireDatabase} from '@angular/fire/database';
import {JsonObject} from '@angular/compiler-cli/ngcc/src/packages/entry_point';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

  constructor(public tripService: TripService, public afs: AngularFireDatabase) {
  }

  wybrana: JsonObject = this.tripService.Actual;

  gdzie: any;

  co: any;

  tekst = '';

  ngOnInit(): void {
  }

  onClick() {
    this.wybrana[this.gdzie] = this.co;
    const key: any = this.wybrana.key;
    this.tripService.updateTrp(key, this.wybrana);
    this.tekst = 'Zmieniłeś ' + this.gdzie + ' na ' + this.co + '!';
  }
}
