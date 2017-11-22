import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../../services/auth.service';

import { User } from '../../models/user';

@Component({
    selector: 'user-login',
    templateUrl: './login.component.html'
})

export class LoginComponent {
    user: User = new User();

    loginErrors: String[] = [];

    constructor(private _authservice: AuthService, private _router: Router){}

    onSubmit(): void{
        this._authservice.login(this.user)
        .then(() => this._router.navigate(['browse']))
        .catch(errors => console.log(errors));
    }
}