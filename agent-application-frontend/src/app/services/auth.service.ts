import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map } from 'rxjs';
import { environment } from "../../environments/environment";
import Swal from 'sweetalert2';
import { User } from '../model/user';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly signUpPath = environment.backend_api + 'auth/register';
  private readonly loginPath = environment.backend_api + 'auth/login';

  constructor(private http: HttpClient) { }

  signUp(user: User){
    const headers = new HttpHeaders({
      'Accept': 'application/json',
      'Content-Type': 'application/json'
   });
    return this.http.post(this.signUpPath, JSON.stringify(user), {'headers': headers})
    .pipe(map((res: any) => {

    }))
    .pipe(catchError(error => this.checkError(error)));
    
  }

  private checkError(error: any): any {
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: error.error.message,
    })
    throw error;
  }

}
