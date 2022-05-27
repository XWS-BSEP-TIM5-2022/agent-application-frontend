import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { User } from '../../model/user'

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {

  user: User = {
      "firstName": "",
      "lastName": "",
      "email": "",
      "username": "",
      "password" : "",
  };
  username: string = ""
  password: string = ""
  email: string = ""
  isPassless = false;
  isLogin = true;
  isSignup = false;
  message = "";
  messageLogin = "";
  messageSignUp = "";
  isSubmitted = false; 

  constructor(private router: Router, private authService: AuthService) { }

  ngOnInit(): void {
  }

  signUp() {
      // if(this.validateSignUp()){
    //   return
    // }
    this.authService.signUp(this.user)
      .subscribe(ok => {
        this.router.navigate(['feed'])
      },
      err => { 
        console.log(err.error)
      })
  }


  login(){ }

  onEmailChange(){
    // this.message = ""
  }

  passwordlessLogin(){
  }
}
