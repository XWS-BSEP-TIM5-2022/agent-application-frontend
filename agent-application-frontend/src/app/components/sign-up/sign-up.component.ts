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
      "using2FA" : false
  };
  username: string = ""
  password: string = ""
  code: string = ""
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
  finishedSignup = false;
  qrCode :any  = "";
  showCodeRequest = false;
  digitForm: any = {};
  errorMessage= '';
  codeMissing = false;
  codeValidator = false;

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
        password: ['', [Validators.required]],
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
      // Swal.fire(
      //   'Password error',
      //   "Password must contain minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character and must not contain white spaces",
      //   'error'
      // )
      alert("Password must contain minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character and must not contain white spaces")
      return;
    }
    if(this.user.password.toLowerCase().includes(this.user.username.toLowerCase())){
      // Swal.fire(
      //   'Password error',
      //   "Password must not contain username",
      //   'error'
      // )
      alert("Password must not contain username")
      return;
    }

    this.authService.signUp(this.user)
      .subscribe(ok => {
 
        if(this.user.using2FA){ 

          this.qrCode = ok.qrCode 

        }
        
        this.finishedSignup = true;
      },
      err => { 
        console.log(err.error)
      })
  }

  onSubmit6Digit(){
    let body = {
      "email": this.username,
      "password": this.password,
      "code" : this.code
    }
    this.authService.login(body)
      .subscribe(ok => {
        console.log(ok)
        this.router.navigate(['job-offers'])
      }, err => { 
        alert("Error: " + err.error)
      })
  }

  login(){ 
    this.submitted1 = true;
    if (this.form.invalid) {
      return;
    } 

    this.authService.check2FA(this.username)
    .subscribe(ok => { 
        if(ok === false){
          let body = {
            "email": this.username,
            "password": this.password
          }
          this.authService.login(body)
            .subscribe(ok => {
              console.log(ok)
              this.router.navigate(['job-offers'])
            }, err => { 
              alert("Error: " + err.error)
            })
        }else if(ok === true){
            this.showCodeRequest = true;
        }else{
          alert("Error")
        }


    }, err => { 
      alert("Error: " + err.error)
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
