import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import 'rxjs/Rx';
import {CNPJ} from '../cnpj/cnpj-model';
import {HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Headers, Http } from '@angular/http';
 
import 'rxjs/add/operator/toPromise';

import { Alert, error } from 'selenium-webdriver';
import { environment } from '@env/environment';


@Injectable()
export class CNPJService {
  private readonly API_URL = '/cnpj';
  
  dataChange: Observable<CNPJ[]> = new Observable<CNPJ[]>();
  // Temporarily stores data from dialogs
  dialogData: any;
  private headers = new Headers({'Content-Type': 'application/json'});
  constructor (private httpClient: HttpClient) {
     
  }

  get data(): Observable<CNPJ[]> {
    return this.dataChange;
  }

  getDialogData() {
    return this.dialogData;
  }

  /** CRUD METHODS */
  getAllCNPJs(): Observable<CNPJ[]> {
    return this.httpClient.get(this.API_URL+'/list')
                    .map(response => response)
                    .catch(error=> Observable.throw(error.message));
  }

  // DEMO ONLY, you can find working methods below
  save (cnpj: CNPJ): void {
    //this.dialogData = cnpj;
    console.log(JSON.stringify(cnpj));

    this.httpClient.post(this.API_URL+'/save', cnpj).subscribe(data => {
      //this.dialogData = cnpj;
      
      alert('Successfully added');
      },
      (err: HttpErrorResponse) => {
        alert('Error occurred. Details: ' + err.name + ' ' + err.message);
    });
  }

  updateCNPJ (cnpj: CNPJ): void {
    this.dialogData = cnpj;
  }

  deleteCNPJ (id: number): void {
    console.log(id);
  }
}
