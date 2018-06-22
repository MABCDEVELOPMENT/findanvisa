import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import 'rxjs/Rx';
import {User} from '../user/user-model';
import {HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Headers, Http } from '@angular/http';
 
import 'rxjs/add/operator/toPromise';

import { Alert, error } from 'selenium-webdriver';
import { environment } from '@env/environment';
import { GenericParameter } from '@app/generic-parameter/generic-parameter.model';


@Injectable()
export class GenericParameterService {
  private readonly API_URL = '/genericparameter';
  
  private headers = new Headers({'Content-Type': 'application/json'});
  constructor (private httpClient: HttpClient) {
     
  }

  load(): Observable<GenericParameter> {
    
    return this.httpClient.get(this.API_URL+'/load/')
    .map(response => response)
    .catch(error=> Observable.throw(error.message));
    
  }

 
  // DEMO ONLY, you can find working methods below
  save (genericParameter: GenericParameter): void {
    //this.dialogData = user;
    console.log(JSON.stringify(genericParameter));

    this.httpClient.post(this.API_URL+'/save', genericParameter).subscribe(data => {
      //this.dialogData = user;
      
      alert('Successfully save');
      },
      (err: HttpErrorResponse) => {
        alert('Error occurred. Details: ' + err.name + ' ' + err.message);
    });
  }

}



/* REAL LIFE CRUD Methods I've used in my projects. ToasterService uses Material Toasts for displaying messages:
    // ADD, POST METHOD
    addItem(kanbanItem: KanbanItem): void {
    this.httpClient.post(this.API_URL, kanbanItem).subscribe(data => {
      this.dialogData = kanbanItem;
      this.toasterService.showToaster('Successfully added', 3000);
      },
      (err: HttpErrorResponse) => {
      this.toasterService.showToaster('Error occurred. Details: ' + err.name + ' ' + err.message, 8000);
    });
   }
    // UPDATE, PUT METHOD
     updateItem(kanbanItem: KanbanItem): void {
    this.httpClient.put(this.API_URL + kanbanItem.id, kanbanItem).subscribe(data => {
        this.dialogData = kanbanItem;
        this.toasterService.showToaster('Successfully edited', 3000);
      },
      (err: HttpErrorResponse) => {
        this.toasterService.showToaster('Error occurred. Details: ' + err.name + ' ' + err.message, 8000);
      }
    );
  }
  // DELETE METHOD
  deleteItem(id: number): void {
    this.httpClient.delete(this.API_URL + id).subscribe(data => {
      console.log(data['']);
        this.toasterService.showToaster('Successfully deleted', 3000);
      },
      (err: HttpErrorResponse) => {
        this.toasterService.showToaster('Error occurred. Details: ' + err.name + ' ' + err.message, 8000);
      }
    );
  }
*/