import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import 'rxjs/Rx';
import {User} from '../user/user-model';
import {HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Headers, Http } from '@angular/http';
 
import 'rxjs/add/operator/toPromise';

import { Alert, error } from 'selenium-webdriver';
import { environment } from '@env/environment';
import { UpdateParameter } from '@app/update-parameter/update-parameter.model';


@Injectable()
export class UpdateParameterService {
  private readonly API_URL = '/updateparameter';
  
  private headers = new Headers({'Content-Type': 'application/json'});
  constructor (private httpClient: HttpClient) {
     
  }

  load(): Observable<UpdateParameter> {
    
    return this.httpClient.get(this.API_URL+'/load/')
    .map(response => response)
    .catch(error=> Observable.throw(error.message));
    
  }

 
  // DEMO ONLY, you can find working methods below
  save (updateParameter: UpdateParameter): void {
    //this.dialogData = user;
    console.log(JSON.stringify(updateParameter));

    this.httpClient.post(this.API_URL+'/save', updateParameter).subscribe(data => {
      //this.dialogData = user;
      
      alert('Successfully save');
      },
      (err: HttpErrorResponse) => {
        alert('Error occurred. Details: ' + err.name + ' ' + err.message);
    });
  }

}