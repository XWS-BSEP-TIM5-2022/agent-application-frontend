import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable } from 'rxjs';
import { environment } from "../../environments/environment";
import { User } from '../model/user';
import jwt_decode from "jwt-decode";
import { JwtHelperService } from '@auth0/angular-jwt';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly signUpPath = environment.backend_api + 'auth/register';
  private readonly loginPath = environment.backend_api + 'auth/login';
  private readonly check2FAPath = environment.backend_api + 'auth/checkIfEnabled2FA/';
  private readonly activateAccountPath = environment.backend_api + 'auth/activateAccount?token=';
  private readonly changePasswordPath = environment.backend_api + 'users/changePassword'

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
    .pipe(map((res: any) => { return res }))
    .pipe(catchError(error => this.checkError(error)));
    
  }

  check2FA(username){
 
    const headers = new HttpHeaders({
      'Accept': 'application/json',
      'Content-Type': 'application/json'
     });
    return this.http.get(this.check2FAPath + username, {'headers': headers})
    .pipe(map((res: any) => { return res }))
    .pipe(catchError(error => this.checkError(error))); 
  }

  private checkError(error: any): any {
    // Swal.fire({
    //   icon: 'error',
    //   title: 'Oops...',
    //   text: error.error,
    // })
    alert("Error: " + error.error)
    throw error;
  } 

  private checkActivationAccountError(error: any): any {
    if(error.message.text == "Account is activated") {
      // Swal.fire({
      //   // icon: 'error',
      //   title: 'You can login',
      //   text: error.message.text,
      // })
      alert("You can login, " + error.message.text)
      return;
    } 
    // Swal.fire({
    //   icon: 'error',
    //   title: 'Oops...',
    //   text: error.message,
    // })
    alert("Oops... " + error.message)
    throw error;
  }

  login(body: {email: string, password: string, code: string}) {
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
      localStorage.setItem("jwt", this.access_token);
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

  activateAccount(jwt: string): Observable<any> {
    console.log(jwt)
    const headers = new HttpHeaders({
      responseType: 'text'
    })
    return this.http.get<any>(`${this.activateAccountPath}`+ jwt, {'headers': headers})
    .pipe(map((res: any) => { }))
    .pipe(catchError(error => this.checkActivationAccountError(error)));
  }

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

  changePassword(body: {oldPassword: string, newPassword: string, reenteredPassword: string}) {
    const headers = new HttpHeaders({
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      // 'responseType': 'text',
    });
    return this.http.post(this.changePasswordPath, JSON.stringify(body), {'headers': headers});
  }
  
}
