import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs';
import 'rxjs/add/observable/throw';
import { of } from 'rxjs/observable/of';
import {HttpClient } from '@angular/common/http';
import { Login } from '@app/login/login.model';
import 'rxjs/add/operator/toPromise';

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
  login(context: LoginContext) : Promise<any> {
    // Replace by proper authentication call
    let data = { id:context.id, username: context.username,email:context.email,
     isAdm: false ,token: '123456', remember: context.remember}
      
    return this.httpClient.post(this.API_URL,new Login(context.username,context.password,context.email))
    .toPromise()
    .then(response => response)
    .catch(error => Observable.throw(error));
    
  }

  /**
   * Authenticates the user
   * @param {LoginContext} context The login parameters.
   * @return {Observable<Credentials>} The user credentials.
   */
  getEmail(email:string): Promise<any> {
    return this.httpClient.post(this.API_URL+'/getuser/',new Login(null,null,email))
    .map((response) => response)
    .toPromise();
    // .toPromise()
    // .then(response => response)
    // .catch(error=> error);
  }

    /**
   * Authenticates the user.
   * @param {LoginContext} context The login parameters.
   * @return {Observable<Credentials>} The user credentials.
   */
  loadUser(id: number): Promise<any> {
    if (id==null) {
      id = this.credentials.id;
    }
    return this.httpClient.get(this.API_URL+'/loaduser/'+id)
    .toPromise()
    .then(response => response)
    .catch(error=> Observable.throw(error.message));
    
  }

      /**
   * Authenticates the user.
   * @param {LoginContext} context The login parameters.
   * @return {Observable<Credentials>} The user credentials.
   */
  loadUserToken(token: String): Promise<any> {
    return this.httpClient.get(this.API_URL+'/token/'+token)
    .toPromise()
    .then(response => response)
    .catch(error=> Observable.throw(error.message));
    
  }

  /**
   * Logs out the user and clear credentials.
   * @return {Observable<boolean>} True if the user was logged out successfully.
   */
  logout():Observable<boolean> {
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
  public setCredentials(credentials?: Credentials, remember?: boolean) {
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
