import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map } from 'rxjs';
import { environment } from "../../environments/environment";
import Swal from 'sweetalert2';
import { User } from '../model/user';
import jwt_decode from "jwt-decode";
import { JwtHelperService } from '@auth0/angular-jwt';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly signUpPath = environment.backend_api + 'auth/register';
  private readonly loginPath = environment.backend_api + 'auth/login';

  logged: Boolean = false;
  private access_token = null;
  public jwtHelper: JwtHelperService = new JwtHelperService();

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
      text: error.message,
    })
    throw error;
  } 

  login(body: {email: string, password: string}) {
    const headers = new HttpHeaders({
       'Accept': 'application/json',
       'Content-Type': 'application/json'
    });
    return this.http.post(this.loginPath, JSON.stringify(body), {'headers': headers})
    .pipe(map((res: any) => {

      console.log(res)
      this.logged = true;
      this.access_token = res['accessToken'];
      if(!this.access_token) {
        this.checkError(new Error('Access token is null'))
        return;
      }
      let decoded: any = jwt_decode(this.access_token)
      localStorage.setItem("user", decoded.sub)
      localStorage.setItem("role", decoded.role)
      localStorage.setItem("jwt", res.token);
    }));
  }


  tokenIsPresent() {
    return localStorage.getItem("jwt") != undefined && localStorage.getItem("jwt") != null;
  }

  roleIsPresent(){
    return localStorage.getItem("role")!= undefined && localStorage.getItem("role") != null;
  }

  tokenIsExpired(){
    if (localStorage.getItem("jwt") != undefined && localStorage.getItem("jwt") != null)  {
      let locStorageToken = localStorage.getItem("jwt")
      if (!locStorageToken){
        return true;
      }
      if(this.jwtHelper.isTokenExpired(locStorageToken)) {
        console.log("Token je istekao")
      }
      return this.jwtHelper.isTokenExpired(locStorageToken);
    }
    return true;
  }

  getToken() {
    return this.access_token;
  }

  // activateAccount(jwt): Observable<any> {
  //   console.log(jwt)
  //   return this.http.get<any>(`${this.activateAccountPath}/`+ jwt)
  //   .pipe(map((res: any) => {

  //   }))
  //   .pipe(catchError(error => this.checkError(error)));
  // }

  isAuthenticated(): boolean {
    if (this.tokenIsPresent() && this.roleIsPresent() && !this.tokenIsExpired()){
      return true;
    }
    return false;
  }

  sendRecoveryCode(body: {email: string}) {
    // return this.http.put(this.sendRecoveryCodePath, JSON.stringify(body));
  }

  verifyRecoveryCode(body: {idAuth: string, verificationCode: string, email: string}){
    // return this.http.post(this.verifyRecoveryCodePath, JSON.stringify(body));
  }

  resetForgottenPassword(body: {idAuth: string, password: string, reenteredPassword: string}) {
    // return this.http.put(this.resetForgottenPasswordPath, JSON.stringify(body));
  }

  logout(){
    localStorage.removeItem('user');
    localStorage.removeItem('jwt');
    localStorage.removeItem('role');
    localStorage.clear();
  }

  changePassword(body: {oldPassword: string, newPassword: string, newReenteredPassword: string}) {
    // return this.http.post(this.changePasswordPath, JSON.stringify(body));
  }


}
