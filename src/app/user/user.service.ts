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
  getAllUsers(checked:boolean): Promise<any> {
    return this.httpClient.get(this.API_URL+'/list/'+checked).toPromise()
                    .then(response => response)
                    .catch(error=> Observable.throw(error.message));
  }

  // DEMO ONLY, you can find working methods below
  save (user: User): Promise<any> {
    //this.dialogData = user;
    console.log(JSON.stringify(user));

    return this.httpClient.post(this.API_URL+'/save', user).toPromise()
    .then(response => response)
    .catch(error => Observable.throw(error));
  }

 
  delete (id: number): Promise<any> {
    return this.httpClient.delete(this.API_URL+'/delete/'+id).toPromise()
    .then(response => response)
    .catch(error=> Observable.throw(error.message));
  }
}
