import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-activate-account',
  templateUrl: './activate-account.component.html',
  styleUrls: ['./activate-account.component.scss']
})
export class ActivateAccountComponent implements OnInit {

  constructor(private authService: AuthService, private route: ActivatedRoute, private router: Router) { }
  token: any
  expired: boolean = true
  public jwtHelper: JwtHelperService = new JwtHelperService();

  ngOnInit(): void {
    var url = window.location.href;
    this.token  = url.split("/")[4]

    this.authService.activateAccount(this.token).subscribe(
      (token: any) => {
        this.expired = false;
    }, err => {
      console.log(err)
      alert(err);
    })
  }

  login(){
    this.router.navigate(['']);
  }

}
