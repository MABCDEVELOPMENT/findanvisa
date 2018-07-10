import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs';
import { of } from 'rxjs/observable/of';
import { LoginService } from '@app/login/login.service';
import { User } from '@app/user/user-model';
import {HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Login } from '@app/login/login.model';
import 'rxjs/add/observable/throw';




export interface Credentials {
  // Customize received credentials here
  id: number;
  username: string;
  email: string;
  isAdm: boolean;
  token: string;
}

export interface LoginContext {
  id: number;
  username: string;
  email: string;
  password: string
  remember?: boolean;
}

const credentialsKey = 'credentials';

/**
 * Provides a base for authentication workflow.
 * The Credentials interface as well as login/logout methods should be replaced with proper implementation.
 */
@Injectable()
export class AuthenticationService {

  private _credentials: Credentials | null;
  private readonly API_URL = '/login';

  constructor(private httpClient: HttpClient) {
    const savedCredentials = sessionStorage.getItem(credentialsKey) || localStorage.getItem(credentialsKey);
    if (savedCredentials) {
      this._credentials = JSON.parse(savedCredentials);
    }
  }

  /**
   * Authenticates the user.
   * @param {LoginContext} context The login parameters.
   * @return {Observable<Credentials>} The user credentials.
   */
  login(context: LoginContext) : void {
    // Replace by proper authentication call
    let data = { id:context.id, username: context.username,email:context.email,
     isAdm: false ,token: '123456'}
     this.httpClient.post(this.API_URL, new Login(context.username,context.password,context.email)).subscribe (
        dataret => {
        let user = dataret;
        data.id = user['id'];
        data.username = user['userName'];
        data.isAdm = (user['profile'] == 1);
        
      },err => { Observable.throw(err) } );
       
  }

  /**
   * Authenticates the user.
   * @param {LoginContext} context The login parameters.
   * @return {Observable<Credentials>} The user credentials.
   */
  getEmail(context: LoginContext): Observable<User> {
    
    return this.httpClient.get(this.API_URL+'/getemail/'+context.username)
    .map(response => response)
    .catch(error=> Observable.throw(error.message));
    
  }

    /**
   * Authenticates the user.
   * @param {LoginContext} context The login parameters.
   * @return {Observable<Credentials>} The user credentials.
   */
  loadUser(id: number): Observable<User> {
    if (id==null) {
      id = this.credentials.id;
    }
    return this.httpClient.get(this.API_URL+'/loaduser/'+id)
    .map(response => response)
    .catch(error=> Observable.throw(error.message));
    
  }


  /**
   * Logs out the user and clear credentials.
   * @return {Observable<boolean>} True if the user was logged out successfully.
   */
  logout(): Observable<boolean> {
    // Customize credentials invalidation here
    this.setCredentials();
    return of(true);
  }

  /**
   * Checks is the user is authenticated.
   * @return {boolean} True if the user is authenticated.
   */
  isAuthenticated(): boolean {
    return !!this.credentials;
  }

  /**
   * Gets the user credentials.
   * @return {Credentials} The user credentials or null if the user is not authenticated.
   */
  get credentials(): Credentials | null {
    return this._credentials;
  }

  /**
   * Sets the user credentials.
   * The credentials may be persisted across sessions by setting the `remember` parameter to true.
   * Otherwise, the credentials are only persisted for the current session.
   * @param {Credentials=} credentials The user credentials.
   * @param {boolean=} remember True to remember credentials across sessions.
   */
  private setCredentials(credentials?: Credentials, remember?: boolean) {
    this._credentials = credentials || null;

    if (credentials) {
      const storage = remember ? localStorage : sessionStorage;
      storage.setItem(credentialsKey, JSON.stringify(credentials));
    } else {
      sessionStorage.removeItem(credentialsKey);
      localStorage.removeItem(credentialsKey);
    }
  }

}
