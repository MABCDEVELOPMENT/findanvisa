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
import { ErrorDialogComponent } from '@app/core/message/error-dialog.component';
import { MatDialog } from '@angular/material';


@Injectable()
export class UpdateParameterService {
  private readonly API_URL = '/updateparameter';
  
  private headers = new Headers({'Content-Type': 'application/json'});
  constructor (private httpClient: HttpClient,
    public dialog: MatDialog) {
     
  }

  load(): Promise<any> {
    
    return this.httpClient.get(this.API_URL+'/load/')
    .toPromise()
    .then(response => response)
    .catch(error=> Observable.throw(error.message));
    
  }

 
  // DEMO ONLY, you can find working methods below
  save (updateParameter: UpdateParameter): void {
    //this.dialogData = user;
    console.log(JSON.stringify(updateParameter));

    this.httpClient.post(this.API_URL+'/save', updateParameter).subscribe(data => {
      //this.dialogData = user;
      
      this.showMsg('Registro gravado com sucesso!');
      },
      (err: HttpErrorResponse) => {
        this.showMsg('Error occurred. Details: ' + err.name + ' ' + err.message);
    });
  }
  showMsg(message : string) : void {
    this.dialog.open(ErrorDialogComponent, {
      data: {errorMsg: message} ,width : '250px',height: '200px'
    });
  }
}