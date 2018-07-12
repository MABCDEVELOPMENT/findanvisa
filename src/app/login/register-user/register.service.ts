import {Injectable} from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs';
import 'rxjs/add/observable/throw';
import {User} from '../../user/user-model';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import { ErrorObservable } from 'rxjs/observable/ErrorObservable';





@Injectable()
export class RegisterService {

  private readonly API_URL = '/user';
  
   constructor (private httpClient: HttpClient) {
     
  }
  
  register (user: User): Promise<any>  {
    
    return this.httpClient.post(this.API_URL+'/save', user)
    .toPromise()
    .then(response => response)
    .catch(error => Observable.throw(error));
  }
}



