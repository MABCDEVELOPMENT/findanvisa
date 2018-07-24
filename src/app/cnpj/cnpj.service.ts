import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import 'rxjs/Rx';
import {RegisterCNPJ} from '../cnpj/cnpj-model';
import {HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Headers, Http } from '@angular/http';
 
import 'rxjs/add/operator/toPromise';

import { Alert, error, promise } from 'selenium-webdriver';
import { environment } from '@env/environment';
import { AuthenticationService } from '@app/core';
import { UserService } from '@app/user/user.service';
import { User } from '@app/user/user-model';
import { ErrorDialogComponent } from '@app/core/message/error-dialog.component';
import { MatDialog } from '@angular/material';


@Injectable()
export class CNPJService {
  private readonly API_URL = '/cnpj';
  
  dataChange: Observable<RegisterCNPJ[]> = new Observable<RegisterCNPJ[]>();
  // Temporarily stores data from dialogs
  dialogData: any;
  user:User;
  private headers = new Headers({'Content-Type': 'application/json'});
  constructor (private httpClient: HttpClient,
              public dialog: MatDialog,
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
  save (cnpj: RegisterCNPJ): Promise<any> {
    this.dialogData = cnpj;
    console.log(JSON.stringify(cnpj));

    return this.httpClient.post(this.API_URL+'/save', cnpj)
    .toPromise()
    .then(data => {
      this.dialogData = cnpj;
      
      this.showMsg('Registro gravado com sucesso!');
      }).catch(
      (err: HttpErrorResponse) => {
        this.showMsg('Error occurred. Details: ' + err.name + ' ' + err.message);
    });
  }

  saveCnpjUser(registers: RegisterCNPJ[]) : Promise<any> {
    let id = this.autenticationService.credentials.id;
    
    return this.httpClient.post(this.API_URL+'/savecnpjuser/'+id, registers)
    .toPromise()
    .then(response => response)
    .catch(error=> Observable.throw(error.message));

  }

  updateCNPJ (cnpj: RegisterCNPJ): void {
    this.dialogData = cnpj;
  }

  deleteCNPJ (id: number): Promise<any> {
    return this.httpClient.delete(this.API_URL+'/delete/'+id).toPromise()
    .then(response => response)
    .catch(error=> Observable.throw(error.message));
  }
  showMsg(message : string) : void {
    this.dialog.open(ErrorDialogComponent, {
      data: {errorMsg: message} ,width : '250px',height: '200px'
    });
  }
}