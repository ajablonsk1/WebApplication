import { Component, OnInit } from '@angular/core';
import {AngularFireDatabase} from '@angular/fire/database';
import {map} from 'rxjs/operators';
import {AuthServiceService} from '../../../services/auth-service.service';

@Component({
  selector: 'app-zamowione',
  templateUrl: './zamowione.component.html',
  styleUrls: ['./zamowione.component.css']
})
export class ZamowioneComponent implements OnInit {

  constructor(public db: AngularFireDatabase, public auth: AuthServiceService) { }

  List: any = [];

  ngOnInit(): void {
    this.db.list('zamowione').snapshotChanges().pipe(
      map(e =>
        e.map(e_ =>
          ({key: e_.payload.key, ...e_.payload.exportVal()})
        )
      )
    ).subscribe(wycieczki => {
      this.List = wycieczki;
    });
  }

}
