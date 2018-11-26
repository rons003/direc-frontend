import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { map } from 'rxjs/operators';
import { Employee } from '../model/employee.model';
import { AuthService } from '../services/auth.service';

@Injectable()
export class EmployeeService {

  private employeeUrl = 'http://localhost:8000/api';
  private token = '';

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) {
    this.token = this.authService.getCurrentUser().token.access_token;
  }
  createEmployee(employee: Employee): Observable<string> {
    const headers = new HttpHeaders(
      {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + this.token
      }
    );

    const options = { headers: headers };
    const body = {
      lastname: employee.lastname,
      firstname: employee.firstname,
      middlename: employee.middlename,
      contact_number: employee.contact_number,
      email: employee.email,
      address: employee.address,
      gender: employee.gender,
      national: employee.national

    };
    const bodyString = JSON.stringify(body);
    const requestUrl = this.employeeUrl + '/employee/add';
    return this.http.post(requestUrl, bodyString, options)
      .pipe(
        map((res: any) => res),
        catchError(this.handleError)
      );
  }

  getEmployee(id: any): Observable<Employee> {

    const headers = new HttpHeaders(
      {
        'Accept': 'application/json',
        'Authorization': 'Bearer ' + this.token
      }
    );
    const options = { headers: headers };
    const requestUrl = this.employeeUrl + '/employee/' + id;
    return this.http.get(requestUrl, options)
      .pipe(
        map((data: any) => {
          return data['employee'];
        }),
        catchError(this.handleError)
      );
  }

  getAllEmployee(): Observable<Employee[]> {

    const headers = new HttpHeaders(
      {
        'Accept': 'application/json',
        'Authorization': 'Bearer ' + this.token
      }
    );
    const options = { headers: headers };
    const requestUrl = this.employeeUrl + '/employee';
    return this.http.get(requestUrl, options)
      .pipe(
        map((data: any) => {
          return data['employee'];
        }),
        catchError(this.handleError)
      );
  }

  updateEmployee(employee: Employee): Observable<string> {
    const headers = new HttpHeaders(
      {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + this.token
      }
    );

    const options = { headers: headers };
    const body = {
      id: employee.id,
      lastname: employee.lastname,
      firstname: employee.firstname,
      middlename: employee.middlename,
      contact_number: employee.contact_number,
      email: employee.email,
      address: employee.address,
      gender: employee.gender,
      national: employee.national

    };
    const bodyString = JSON.stringify(body);
    const requestUrl = this.employeeUrl + '/employee/update';
    return this.http.post(requestUrl, bodyString, options)
      .pipe(
        map((res: any) => res),
        catchError(this.handleError)
      );
  }

  deleteEmployee(employee_id: string[]): Observable<string> {
    const headers = new HttpHeaders(
      {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + this.token
      }
    );

    const options = { headers: headers };
    const body = {
      'id': employee_id
    };
    const bodyString = JSON.stringify(body);
    const requestUrl = this.employeeUrl + '/employee/delete';
    return this.http.post(requestUrl, bodyString, options)
      .pipe(
        map((res: any) => res),
        catchError(this.handleError)
      );
  }

  private getSuccessResponse(res: Response): boolean {
    return res.ok;
}

  private handleError(error: any) {
    // In a real world app, we might use a remote logging infrastructure
    // We'd also dig deeper into the error to get a better message
    const errMsg = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    console.error(errMsg); // log to console instead
    return throwError(errMsg);
  }
}
