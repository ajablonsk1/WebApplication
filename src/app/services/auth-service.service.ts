import {Injectable, NgZone} from '@angular/core';
import {JwtConfig, JwtHelperService} from '@auth0/angular-jwt';
import {BehaviorSubject, Observable} from 'rxjs';
import {AngularFireAuth} from '@angular/fire/auth';
import {AngularFirestore, AngularFirestoreDocument} from '@angular/fire/firestore';
import {Router} from '@angular/router';
import {switchMap} from 'rxjs/operators';
import firebase from 'firebase';
import {User} from '../shared/services/user';


@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {
  userData: any;
  currentUser: any;
  error = '';
  public userStatus!: any;
  public userStatusChanges: BehaviorSubject<string> = new BehaviorSubject<string>(this.userStatus);

  constructor(public afAuth: AngularFireAuth,
              public afs: AngularFirestore,
              public router: Router,
              public ngZone: NgZone){}

  setUserStatus(userStatus: any): void {
    this.userStatus = userStatus;
    this.userStatusChanges.next(userStatus);
  }

  SignIn(email: string, password: string){
    this.afAuth.signInWithEmailAndPassword(email, password)
      .then((user) => {
        this.afs.collection('users').ref.where('email', '==', user.user?.email).onSnapshot(snap => {
          snap.forEach((userRef: any) => {
            console.log('userRef', userRef.data());
            this.currentUser = userRef.data();
            this.setUserStatus(this.currentUser);
            if (userRef.data().role !== 'admin') {
              this.router.navigate(['wycieczki']);
            }else{
              this.router.navigate(['wycieczki']);
            }
          });
        });

      }).catch(err => {
      this.error = err.code;
      if (this.error === 'auth/email-already-exists'){
        this.error = 'Email jest już zajęty!';
      }
      else if (this.error === 'auth/invalid-email'){
        this.error = 'Nieprawidłowy email lub hasło!';
      }
      else if (this.error === 'auth/user-not-found'){
        this.error = 'Nieprawidłowy email lub hasło!';
      }
      else if (this.error === 'auth/wrong-password'){
        this.error = 'Nieprawidłowy email lub hasło!';
      }
      else{
        this.error = 'Wystąpił błąd podczas logowania';
      }
    });
  }

  signUp(email: string, password: string, cpassword: string){
    if (password !== cpassword) {
      this.error = 'Hasła różnią się od siebie!';
      return console.error('Passwords are not the same');
    }
    this.afAuth.createUserWithEmailAndPassword(email, password)
    .then((userResponse) => {
      const user = {
        uid: userResponse.user?.uid,
        email: userResponse.user?.email,
        role: 'reader',
      };
      this.afs.collection('users').add(user)
        .then(user => {
          user.get().then(x => {
            console.log(x.data());
            this.currentUser = x.data();
            this.setUserStatus(this.currentUser);
            this.router.navigate(['wycieczki']);
          });
        }).catch(err => {
        console.log(err);
      });
    })
    .catch((err) => {
      this.error = err.code;
      if (this.error === 'auth/invalid-email') {
        this.error = 'Błędny email!';
      } else if (this.error === 'auth/weak-password') {
        this.error = 'Brak wpisanego hasła / Hasło jest zbyt słabe!';
      }
    });
}

  SignOut() {
    this.afAuth.signOut()
      .then(() => {
        console.log('user signed Out successfully');
        this.currentUser = null;
        this.setUserStatus(null);
        this.ngZone.run(() => this.router.navigate(['wycieczki']));

      }).catch((err) => {
      console.log(err);
    });
  }

  userChanges(){
    this.afAuth.onAuthStateChanged(currentUser => {
      if (currentUser){
        this.afs.collection("users").ref.where("email", "==", currentUser.email).onSnapshot(snap =>{
          snap.forEach((userRef: any) => {
            this.currentUser = userRef.data();
            this.setUserStatus(this.currentUser);
            if(userRef.data().role !== "admin") {
              this.ngZone.run(() => this.router.navigate(["wycieczki"]));
            }else{
              this.ngZone.run(() => this.router.navigate(["wycieczki"]));
            }
          });
        });
      }else{
        this.ngZone.run(() => this.router.navigate(["wycieczki"]));
      }
    });
  }
}
