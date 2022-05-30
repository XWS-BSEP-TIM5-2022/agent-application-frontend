import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
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
  submitted = false;
  
  form: FormGroup = new FormGroup({
    username: new FormControl(''),
    password: new FormControl(''),
  })

  passwordlessForm : FormGroup = new FormGroup({
    email: new FormControl(''),
  })

  sform: FormGroup = new FormGroup({
    username: new FormControl(''),
    password: new FormControl(''),
    email: new FormControl(''),
    firstName: new FormControl(''),
    lastName: new FormControl(''),
  })
  constructor(private router: Router, private authService: AuthService, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group(
      {
        password: ['', [Validators.required, Validators.minLength(8)]],
        username: ['', Validators.required],
      }) 
    this.passwordlessForm = this.formBuilder.group(
      {
        email: ['', [Validators.required, Validators.email]],
      }) 
    this.sform = this.formBuilder.group(
      {
        password: ['', Validators.required],
        firstName: ['', Validators.required],
        lastName: ['', Validators.required],
        username: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
      }) 
  }

  get f(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }

  get fs(): { [key: string]: AbstractControl } {
    return this.sform.controls;
  }

  get ff(): { [key: string]: AbstractControl } {
    return this.passwordlessForm.controls;
  }

  onSubmit(): void {
    this.submitted = true;
    if (this.form.invalid) {
      return;
    }
    console.log(JSON.stringify(this.form.value, null, 2));
  }

  signUp() {
    this.submitted = true;
    if (this.form.invalid) {
      return;
    }
    this.authService.signUp(this.user)
      .subscribe(ok => {
        alert('Check your email inbox')
        // this.router.navigate(['feed'])
        this.user = {
          "firstName": "",
          "lastName": "",
          "email": "",
          "username": "",
          "password" : "",
      };
      },
      err => { 
        console.log(err.error)
      })
  }


  login(){ 
    this.submitted = true;
    if (this.form.invalid) {
      return;
    }
    let body = {
      "email": this.username,
      "password": this.password
    }
    this.authService.login(body)
      .subscribe(ok => {
        console.log(ok)
        this.router.navigate(['job-offers'])
      }, err => {
        alert(err.message)
      })
  }

  onEmailChange(){
    this.message = ""
  }

  passwordlessLogin(){
    this.submitted = true;
    if (this.form.invalid) {
      return;
    }
  }
}
