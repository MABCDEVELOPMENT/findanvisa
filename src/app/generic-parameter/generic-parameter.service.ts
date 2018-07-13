import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import 'rxjs/Rx';
import {HttpClient } from '@angular/common/http';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { GenericParameter } from '@app/generic-parameter/generic-parameter.model';


@Injectable()
export class GenericParameterService {
  private readonly API_URL = '/genericparameter';
  
  private headers = new Headers({'Content-Type': 'application/json'});
  constructor (private httpClient: HttpClient) {
     
  }

  load():Promise<any> {
    
    return this.httpClient.get(this.API_URL+'/load/')
    .toPromise()
    .then(response => response)
    .catch(error=> Observable.throw(error));
    
  }

 
  // DEMO ONLY, you can find working methods below
  save (genericParameter: GenericParameter): Promise<any> {
    return this.httpClient.post(this.API_URL+'/save', genericParameter)
    .toPromise()
    .then(response => response)
    .catch(error=> Observable.throw(error));
  }

}