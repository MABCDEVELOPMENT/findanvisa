import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {User} from '../../user/user-model';
import {HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';

import { Alert } from 'selenium-webdriver';
import { environment } from '@env/environment';


@Injectable()
export class RegisterService {

  private readonly API_URL = '/user';
  
   constructor (private httpClient: HttpClient) {
     
  }
  
  register (user: User): void {
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
}



