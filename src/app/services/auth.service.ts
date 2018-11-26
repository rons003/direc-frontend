import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { map } from 'rxjs/operators';

import { User } from '../model/user.model';

@Injectable()
export class AuthService {

  redirectUrl: string;
  private authUrl = 'http://localhost:8000/api';
  private oauthUrl = 'http://localhost:8000/oauth/token';
  private headers = new HttpHeaders({ 'Content-Type': 'application/json' });
  private options = { headers: this.headers };

  private user: User = null;

  constructor(private http: HttpClient) {
  }

  login(username: string, password: string): Observable<User> {
    const body = {
      'grant_type': 'password',
      'client_id': 2,
      'client_secret': '8ePoxcojHeOub960GUODcIQzNZx7QSdBOmCNiP7p',
      'username': username.toLowerCase(),
      'password': password,
      'scope': ''
    };
    const bodyString = JSON.stringify(body);
    const requestUrl = this.oauthUrl;
    return this.http.post(requestUrl, bodyString, this.options)
      .pipe(
        map((res: any) => {
          // Returns username, id, token
          if (res.error === 'invalid_credentials') {
            return 'failed';
          } else {
            this.saveCurrentUser(res, this.user);
            return res;
          }
        }),
        catchError(this.handleError)
      );
  }

  logout() {
    this.user = null;
    this.clearCurrentUser();
  }

  getUserInfo(token: any) {
    const headers = new HttpHeaders({
      'Accept': 'application/json',
      'Authorization': 'Bearer ' + token.access_token,
    });

    const requestUrl = this.authUrl + '/user';
    const options = { headers: headers };
    return this.http.get(requestUrl, options)
      .pipe(
        map((res: any) => {
          this.saveCurrentUser(res.access_token, null);
          return res;
        }),
        catchError(this.handleError)
      );
  }

  updateActiveUser(user: User) {
    const token = this.getCurrentUser().token;
    this.saveCurrentUser(token, user);
  }

  saveCurrentUser(token: any, user: User) {
    localStorage.setItem('currentUser', JSON.stringify({ token: token, user: user }));
  }

  getCurrentUser() {
    return JSON.parse(localStorage.getItem('currentUser'));
  }

  clearCurrentUser() {
    localStorage.setItem('currentUser', null);
  }

  isLoggedIn(): boolean {
    const data = this.getCurrentUser();
    return data && data.token;
  }

  getActiveUserName(): string {
    const user = this.getCurrentUser().user;
    return user.firstName + ' ' + user.lastName;
  }

  // getActiveUser(): User {
  //   return User.parse(this.getCurrentUser().user);
  // }

  /**
    * Handle HTTP error
    */
  private handleError(error: any) {
    // In a real world app, we might use a remote logging infrastructure
    // We'd also dig deeper into the error to get a better message
    const errMsg = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    console.error(errMsg); // log to console instead
    return throwError(errMsg);
  }
}
