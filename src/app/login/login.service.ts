import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {User} from '../user/user-model';
import {HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';

import { Alert } from 'selenium-webdriver';
import { environment } from '@env/environment';
import { Login } from '@app/login/login.model';

@Injectable()
export class LoginService {
  private readonly API_URL = '/login';
  private readonly API_URL_FORGOT = '/forgotpassword';
  
  dataChange: BehaviorSubject<User[]> = new BehaviorSubject<User[]>([]);
  // Temporarily stores data from dialogs
  dialogData: any;
  user: User;
  constructor (private httpClient: HttpClient) {
     
  }

  get data(): User[] {
    return this.dataChange.value;
  }

  getDialogData() {
    return this.dialogData;
  }

  // DEMO ONLY, you can find working methods below
  login (userName: string,  password: string): any {
    //this.dialogData = user;

    
    this.httpClient.post(this.API_URL, new Login(userName,password,"")).subscribe(data => {
      //this.dialogData = user;
        return data;
      },
      (err: HttpErrorResponse) => {
        alert('Error occurred. Details: ' + err.name + ' ' + err.message);
        return null;
    });
  }

   // DEMO ONLY, you can find working methods below
   sendForgotPassword (email: string): any {
    //this.dialogData = user;

    
    this.httpClient.post(this.API_URL+'/forgotpassword', email).subscribe(data => {
      //this.dialogData = user;
        return data;
      },
      (err: HttpErrorResponse) => {
        alert('Error occurred. Details: ' + err.name + ' ' + err.message);
        return null;
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