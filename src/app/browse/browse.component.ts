import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { BicycleService } from '../services/bicycle.service';
import { CookieService } from 'ngx-cookie';
import { Router } from '@angular/router';

@Component({
  selector: 'app-browse',
  templateUrl: './browse.component.html',
  styleUrls: ['./browse.component.css']
})
export class BrowseComponent implements OnInit {

  bicycles = null;
  ownerToContact = {
    first_name: null,
    email: null
  };

  userID: string= null
  constructor(
    private _authService: AuthService,
    private _bicycleService: BicycleService,
    private _cookieService: CookieService,
    private _router : Router) { }

  ngOnInit() {
    this.userID = this._cookieService.get('userId')

    this._bicycleService.showAll()
    .then(bicycles => this.bicycles = bicycles)
    .catch(console.log);

    if (!this.userID) { // Takes the visitor back the login page if he/she is not logged in.
      this._router.navigate([''])
    }
  }

  contact(owner){
    console.log(owner)
    this.ownerToContact = owner
  }

  delete(id){
    this._bicycleService.delete(id)
    .then(() => console.log)
  }

  logout(userId){
    this._authService.logout()
    .then(() => {
      this._router.navigate([''])
    })
  }

}
