import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import 'rxjs';
import 'rxjs/add/observable/throw';
import {User} from '../user/user-model';
import {HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Login } from '@app/login/login.model';
import { Observable } from 'rxjs';
import { ErrorDialogComponent } from '@app/core/message/error-dialog.component';
import { MatDialog } from '@angular/material';
import { anyTypeAnnotation } from 'babel-types';

@Injectable()
export class LoginService {
  private readonly API_URL = '/login';
  private readonly API_URL_USER = '/user';
  
  dataChange: BehaviorSubject<User[]> = new BehaviorSubject<User[]>([]);
  // Temporarily stores data from dialogs
  dialogData: any;
  user: User;
  loginUser: Login;
  constructor (private httpClient: HttpClient,
              public dialog: MatDialog) {
     
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
        this.showMsg(err.error.errorMessage);
        return null;
    });
  }

   // DEMO ONLY, you can find working methods below
   sendForgotPassword (email: string):Promise<any> {
        
    return this.httpClient.post(this.API_URL+'/forgotpassword', email)
    .toPromise()
    .then(response => response)
    .catch(error => Observable.throw(error));
  }

  redefinePassword(user:User,token:string): Promise<any> {
    this.loginUser = new Login(null,null,null);
    this.loginUser.password = user.password;
    this.loginUser.token = token; 
   return this.httpClient.post(this.API_URL+'/changeuser', this.loginUser)
   .map((response) => response)
   .toPromise();
   
  }
  showMsg(message : string) : void {
    this.dialog.open(ErrorDialogComponent, {
      data: {errorMsg: message} ,width : '250px',height: '200px'
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