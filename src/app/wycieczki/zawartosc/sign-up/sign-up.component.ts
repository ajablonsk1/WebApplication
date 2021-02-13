import { Component, OnInit } from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth';
import {AuthServiceService} from '../../../services/auth-service.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  username: string = '';
  password: string = '';
  cpassword: string = '';
  error = '';
  flag = false;

  constructor(public authService: AuthServiceService) {
  }

  ngOnInit(): void {
  }

  color() {
    if (this.authService.error === 'Użytkownik został zarejestrowany!') {
      return 'GREEN';
    } else {
      return 'RED';
    }
  }
}
