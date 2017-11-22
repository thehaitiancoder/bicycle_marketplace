import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { CookieService } from 'ngx-cookie';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

import { User } from '../models/user';

@Injectable()

export class AuthService {
    private base = '/auth/'
    constructor(private _cookieService: CookieService, private _http: Http){}

    login(user: User): Promise<User>{
        return this._http.post(this.base + 'login', user)
        .map(response => response.json())
        .toPromise();
    }

    register(user: User): Promise<User>{
        return this._http.post(this.base + 'register', user)
        .map(response => response.json())
        .toPromise();
    }

    logout(): Promise<User>{
        return this._http.delete(this.base + 'logout')
        .map(response => response.json())
        .toPromise();
    }

    currentUserId(): string {
        return this._cookieService.get('userId');
    }

    isAuthed(): boolean{
        const expired = parseInt(this._cookieService.get('expiration'));
        const UserId = this.currentUserId();
        const session = this._cookieService.get('session');

        return Boolean(session && expired && UserId && expired > Date.now());
    }
}