import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import 'rxjs/Rx';
import {RegisterCNPJ} from '../cnpj/cnpj-model';
import {HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Headers, Http } from '@angular/http';
 
import 'rxjs/add/operator/toPromise';

import { Alert, error } from 'selenium-webdriver';
import { environment } from '@env/environment';
import { AuthenticationService } from '@app/core';
import { UserService } from '@app/user/user.service';
import { User } from '@app/user/user-model';


@Injectable()
export class CNPJService {
  private readonly API_URL = '/cnpj';
  
  dataChange: Observable<RegisterCNPJ[]> = new Observable<RegisterCNPJ[]>();
  // Temporarily stores data from dialogs
  dialogData: any;
  user:User;
  private headers = new Headers({'Content-Type': 'application/json'});
  constructor (private httpClient: HttpClient,
              private autenticationService: AuthenticationService,
              private userService: UserService) {
     
  }

  get data(): Observable<RegisterCNPJ[]> {
    return this.dataChange;
  }

  getDialogData() {
    return this.dialogData;
  }

  /** CRUD METHODS */
  getAllCNPJs(): Promise<any> {
    return this.httpClient.get(this.API_URL+'/list')
                    .toPromise()
                    .then(response => response)
                    .catch(error=> Observable.throw(error.message));
  }

  getCNPJs(): Promise<any> {
    let id = this.autenticationService.credentials.id;
    return this.httpClient.get(this.API_URL+'/listnotuser/'+id)
                    .toPromise()
                    .then(response => response)
                    .catch(error=> Observable.throw(error.message));
  }

  // DEMO ONLY, you can find working methods below
  save (cnpj: RegisterCNPJ): void {
    this.dialogData = cnpj;
    console.log(JSON.stringify(cnpj));

    this.httpClient.post(this.API_URL+'/save', cnpj).subscribe(data => {
      this.dialogData = cnpj;
      
      alert('Successfully added');
      },
      (err: HttpErrorResponse) => {
        alert('Error occurred. Details: ' + err.name + ' ' + err.message);
    });
  }

  saveCnpjUser(registers: RegisterCNPJ[]) {
    let id = this.autenticationService.credentials.id;
    
    this.httpClient.post(this.API_URL+'/savecnpjuser/'+id, registers).subscribe(data => {
      alert('Registro salvo com sucesso!');
   },
      (err: HttpErrorResponse) => {
        alert('Error occurred. Details: ' + err.name + ' ' + err.message);
    });

  }

  updateCNPJ (cnpj: RegisterCNPJ): void {
    this.dialogData = cnpj;
  }

  deleteCNPJ (id: number): Promise<any> {
    return this.httpClient.delete(this.API_URL+'/delete/'+id).toPromise()
    .then(response => response)
    .catch(error=> Observable.throw(error.message));
  }
}
