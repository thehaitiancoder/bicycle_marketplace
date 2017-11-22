import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../../services/auth.service';

import { User } from '../../models/user';

@Component({
    selector: 'user-registration',
    templateUrl: './registration.component.html'
})

export class RegistrationComponent {
    user: User = new User();

    registrationErrors: string[] = [];

    constructor(private _authService: AuthService, private _router: Router){}

    onSubmit(): void{
        this._authService.register(this.user)
        .then(user => {
            console.log(user)
            this._router.navigate(['browse'])})
        .catch(response => console.log(response));
    }

    private handleErrors(errors: string[] | Error): void {
        this.registrationErrors = Array.isArray(errors) ? errors : [errors.message]
    }
}

//this.handleErrors(response.json())