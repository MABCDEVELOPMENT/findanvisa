import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import 'rxjs/Rx';
import {User} from '../user/user-model';
import {HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Headers, Http } from '@angular/http';
 
import 'rxjs/add/operator/toPromise';

import { Alert, error } from 'selenium-webdriver';
import { environment } from '@env/environment';


@Injectable()
export class UserService {
  private readonly API_URL = '/user';
  
  dataChange: Observable<User[]> = new Observable<User[]>();
  // Temporarily stores data from dialogs
  dialogData: any;
  private headers = new Headers({'Content-Type': 'application/json'});
  constructor (private httpClient: HttpClient) {
     
  }

  get data(): Observable<User[]> {
    return this.dataChange;
  }

  getDialogData() {
    return this.dialogData;
  }

  /** CRUD METHODS */
  getAllUsers(): Observable<User[]> {
    return this.httpClient.get(this.API_URL+'/list')
                    .map(response => response)
                    .catch(error=> Observable.throw(error.message));
  }

  // DEMO ONLY, you can find working methods below
  save (user: User): void {
    //this.dialogData = user;
    console.log(JSON.stringify(user));

    this.httpClient.post(this.API_URL+'/save', user).subscribe(data => {
      //this.dialogData = user;
      
      alert('Successfully added');
      },
      (err: HttpErrorResponse) => {
        alert('Error occurred. Details: ' + err.name + ' ' + err.message);
    });
  }

  updateUser (user: User): void {
    this.dialogData = user;
  }

  deleteUser (id: number): void {
    console.log(id);
  }
}
