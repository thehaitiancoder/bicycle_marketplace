import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

import { Bicycle } from '../models/bicycle';

@Injectable()

export class BicycleService {

    private base = '/api/bicycle/'
    constructor(private _http: Http){}

    create(bicycle: Bicycle): Promise<Bicycle>{
        return this._http.post(this.base, bicycle)
        .map(response => response.json())
        .toPromise()
    }

    update(bicycle: Bicycle): Promise<Bicycle>{
        return this._http.put(this.base, bicycle)
        .map(response => response.json())
        .toPromise()
    }

    delete(id){
        console.log('hit service method')
        console.log(`${this.base}${id}`)
        return this._http.delete(`${this.base}${id}`)
        .map(() => console.log('the listing was deleted'))
        .toPromise()
        
    }

    show(): Promise<Bicycle>{
        return this._http.get(this.base)
        .map(response => response.json())
        .toPromise()
    }

    showAll(): Promise<Bicycle>{
        return this._http.get(this.base)
        .map(response => response.json())
        .toPromise()
    }

    showUsersBicycle(userId): Promise<Bicycle>{
        return this._http.get(`${this.base}${userId}`)
        .map(response => response.json())
        .toPromise()
    }

    showRandom():Promise<Bicycle>{
        return this._http.get(`${this.base}random/1`)
        .map(response => response.json())
        .toPromise()
    }
}