import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import 'rxjs/Rx';
import {User} from '../user/user-model';
import {HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Headers, Http } from '@angular/http';
 
import 'rxjs/add/operator/toPromise';

import { Alert, error } from 'selenium-webdriver';
import { environment } from '@env/environment';
import { Queryrecords} from './queryrecords.model';
import { RegisterCNPJ } from '@app/cnpj/cnpj-model';
import { AuthenticationService } from '@app/core';

@Injectable()
export class QueryrecordsService {
  private readonly API_URL = '/user';
  
  dataChange: Observable<Queryrecords[]> = new Observable<Queryrecords[]>();
  // Temporarily stores data from dialogs
  dialogData: any;
  private headers = new Headers({'Content-Type': 'application/json'});
  constructor (private httpClient: HttpClient,
                public autenticeService: AuthenticationService) {
     
  }

  get data(): Observable<Queryrecords[]> {
    return this.dataChange;
  }

  /** CRUD METHODS */
  getQueryRegister(registerCNPJ: RegisterCNPJ): Observable<Queryrecords[]> {
    let user = this.autenticeService.loadUser(null);
    return this.httpClient.get(this.API_URL+'/product/'+registerCNPJ.cnpj)
                    .map(response => response)
                    .catch(error=> Observable.throw(error.message));
  }

  // getQueryRegister(registerCNPJ: RegisterCNPJ): Observable<Queryrecords[]> {
  //   let user = this.autenticeService.loadUser(null);
  //   return this.httpClient.get(this.API_URL+'/product/'+registerCNPJ.cnpj)
  //                   .map(response => response)
  //                   .catch(error=> Observable.throw(error.message));
  // }

  
}
