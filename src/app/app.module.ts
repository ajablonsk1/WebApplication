import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {ReactiveFormsModule} from "@angular/forms";
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { WycieczkiComponent } from './wycieczki/wycieczki.component';
import { ZawartoscComponent } from './wycieczki/zawartosc/zawartosc.component';
import { FormComponent } from './wycieczki/zawartosc/form/form.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {NgbRatingModule} from "@ng-bootstrap/ng-bootstrap";
import { RatingModule } from 'ng-starrating';
import { AngularFireModule } from '@angular/fire';
import {environment} from "../environments/environment";
import {RouterModule, Routes} from "@angular/router";
import { KoszComponent } from './wycieczki/zawartosc/kosz/kosz/kosz.component';
import { InfoComponent } from './wycieczki/zawartosc/informacjeSzczegolowe/info/info.component';
import { LoginComponent } from './wycieczki/zawartosc/login/login.component';
import {AngularFireAuthModule} from '@angular/fire/auth';
import {AuthServiceService} from './services/auth-service.service';
import { SignUpComponent } from './wycieczki/zawartosc/sign-up/sign-up.component';
import {AuthGuard} from './shared/guard/auth.guard';
import { DeletedTripsComponent } from './wycieczki/zawartosc/deleted-trips/deleted-trips.component';
import { ZarzadzanieComponent } from './wycieczki/zawartosc/zarzadzanie/zarzadzanie.component';
import { EditComponent } from './wycieczki/zawartosc/edit/edit.component';
import { ZamowioneComponent } from './wycieczki/zawartosc/zamowione/zamowione.component';


const appRoutes: Routes = [
  {path: '', redirectTo: '/wycieczki', pathMatch: 'full'},
  {path: 'wycieczki', component: ZawartoscComponent},
  {path: 'form', component: FormComponent, canActivate: [AuthGuard]},
  {path: 'kosz', component: KoszComponent, canActivate: [AuthGuard]},
  {path: 'info', component: InfoComponent, canActivate: [AuthGuard]},
  {path: 'logowanie', component: LoginComponent},
  {path: 'rejestracja', component: SignUpComponent},
  {path: 'archiwalne', component: DeletedTripsComponent, canActivate: [AuthGuard]},
  {path: 'admin', component: ZarzadzanieComponent, canActivate: [AuthGuard]},
  {path: 'edit', component: EditComponent, canActivate: [AuthGuard]},
  {path: 'zamowione', component: ZamowioneComponent, canActivate: [AuthGuard]}
];


@NgModule({
  declarations: [
    AppComponent,
    WycieczkiComponent,
    ZawartoscComponent,
    FormComponent,
    KoszComponent,
    InfoComponent,
    LoginComponent,
    SignUpComponent,
    DeletedTripsComponent,
    ZarzadzanieComponent,
    EditComponent,
    ZamowioneComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    NgbModule,
    NgbRatingModule,
    RatingModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    FormsModule,
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    AngularFireAuthModule

  ],
  providers: [AuthServiceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
