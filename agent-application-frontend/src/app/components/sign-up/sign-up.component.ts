import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';
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
  submitted1 = false;
  submitted2 = false;
  submitted3 = false;
  
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

  signUp() {
    this.submitted3 = true;
    if (this.sform.invalid) {
      return;
    }

    let pattern = new RegExp('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[-+_!@#$%^&*.,?:;<>=`~\\]\x22\x27\(\)\{\}\|\/\[\\\\?]).{8,}$')
    if(!pattern.test(this.user.password) || this.user.password.includes(" ")){
      this.messageLogin = "Password must contain minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character."
      Swal.fire(
        'Password error',
        "Password must contain minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character and must not contain white spaces",
        'error'
      )
      return;
    }
    if(this.user.password.toLowerCase().includes(this.user.username.toLowerCase())){
      Swal.fire(
        'Password error',
        "Password must not contain username",
        'error'
      )
      return;
    }

    this.authService.signUp(this.user)
      .subscribe(ok => {
        Swal.fire(
          'Check your email inbox',
          '',
          'success'
        ).finally( () => {
          window.location.reload();
        })   
      },
      err => { 
        console.log(err.error)
      })
  }


  login(){ 
    this.submitted1 = true;
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
    this.submitted2 = true;
    if (this.passwordlessForm.invalid) {
      return;
    }
  }
}
