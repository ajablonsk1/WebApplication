import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {AuthServiceService} from './services/auth-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit{
  title = 'ListaWycieczek';

  constructor(private authService: AuthServiceService) {
  }

  userStatus = this.authService.userStatus;


  ngOnInit(){
    this.authService.userChanges();
    this.authService.userStatusChanges.subscribe(x => this.userStatus = x);
    console.log(this.userStatus);
  }

}
