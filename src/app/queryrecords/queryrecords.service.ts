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
import { QueryRecordParameter } from '@app/queryrecords/queryrecordparameter.model';
import { Content } from '@app/queryrecords/modelquery/content.model';

@Injectable()
export class QueryrecordsService {
  private readonly API_URL = '/anvisa';
  
  dataChange: Observable<Content[]> = new Observable<Content[]>();
  // Temporarily stores data from dialogs
  dialogData: any;
  private headers = new Headers({'Content-Type': 'application/json'});
  constructor (private httpClient: HttpClient,
                public autenticeService: AuthenticationService) {
     
  }

  get data(): Observable<Content[]> {
    return this.dataChange;
  }

  /** CRUD METHODS */
  getQueryRegisters(queryrecordparameter: QueryRecordParameter): Promise<any> {

     return this.httpClient.post(this.API_URL+'/product',queryrecordparameter).toPromise()
    .then(response => response)
    .catch(error=> Observable.throw(error.message));
  }
  
}
