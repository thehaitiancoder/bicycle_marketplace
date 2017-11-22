import { Component, OnInit } from '@angular/core';
import { BicycleService } from '../services/bicycle.service';
import { CookieService } from 'ngx-cookie';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  bicycles = null;

  constructor(private _bicycleService: BicycleService, private _cookieService: CookieService, private _router: Router) { }

  ngOnInit() {
    this._bicycleService.showRandom()
    .then(randomBic => this.bicycles = randomBic)

    if (this._cookieService.get('userId')) {
      this._router.navigate(['browse'])
    }
  }

}
