import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Bicycle } from '../models/bicycle';
import { CookieService } from 'ngx-cookie';
import { BicycleService } from '../services/bicycle.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-listings',
  templateUrl: './listings.component.html',
  styleUrls: ['./listings.component.css']
})
export class ListingsComponent implements OnInit {

  bicycles = null;
  bicycle = new Bicycle();
  fileToUpload: Array<File>;
  imageUploaded: String = null;

  constructor(private _auth: AuthService, private _cookies: CookieService, private _bicycleService: BicycleService, private _router: Router) {
    this.fileToUpload = []
    this.bicycle.owner = this._cookies.get('userId')
    console.log(this.bicycle)
  }

  ngOnInit() {
    this._bicycleService.showUsersBicycle(this.bicycle.owner)
    .then(bicycles => this.bicycles = bicycles)

    if (!this.bicycle.owner) { // Takes the visitor back the login page if he/she is not logged in.
        this._router.navigate([''])
      }
  }

  OnSubmit(form){
    this._bicycleService.create(this.bicycle)
    .then(bicycle => console.log(bicycle))
    .catch(error => console.log(error))

    this.bicycle = new Bicycle();
  }

  updateListing(bicycle: Bicycle){
      console.log(bicycle)
      this._bicycleService.update(bicycle)
      .then(updatedBicycle => console.log(updatedBicycle))
      .catch(console.log)
  }

  delete(id){
      this._bicycleService.delete(id)
      .then(() => console.log)
  }

  logout(userId){
    this._auth.logout()
    .then(() => {
      this._router.navigate([''])
    })
  }

  upload() {
    this.makeFileRequest("http://localhost:8000/upload", [], this.fileToUpload).then((result) => {
        this.bicycle.image = result[0].filename
        this.imageUploaded = `/assets/uploads/${result[0].filename}`
    }, (error) => {
        console.error(error);
    });
}

  fileChangeEvent(fileInput: any){
    this.fileToUpload = <Array<File>> fileInput.target.files;
    this.upload()
}

  makeFileRequest(url: string, params: Array<string>, files: Array<File>) {
    return new Promise((resolve, reject) => {
        var formData: any = new FormData();
        var xhr = new XMLHttpRequest();
        for(var i = 0; i < files.length; i++) {
            formData.append("uploads", files[i], files[i].name);
        }
        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4) {
                if (xhr.status == 200) {
                    resolve(JSON.parse(xhr.response));
                } else {
                    reject(xhr.response);
                }
            }
        }
        xhr.open("POST", url, true);
        xhr.send(formData);
    });
}

}
