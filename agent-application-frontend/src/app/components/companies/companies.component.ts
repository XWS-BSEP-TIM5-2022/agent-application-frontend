import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Company } from 'src/app/model/company';
import { JobOffer } from 'src/app/model/job-offer';
import { User } from 'src/app/model/user';
import { AuthService } from 'src/app/services/auth.service';
import { CompanyService } from 'src/app/services/company.service';
import { UserService } from 'src/app/services/user.service';
import { CompanyRegistrationComponent } from '../company-registration/company-registration.component';
import { NewJobOfferComponent } from '../new-job-offer/new-job-offer.component';

@Component({
  selector: 'app-companies',
  templateUrl: './companies.component.html',
  styleUrls: ['./companies.component.scss']
})
export class CompaniesComponent implements OnInit {

  constructor(
      private companyService: CompanyService, 
      private userService: UserService, 
      private router: Router, 
      private authService: AuthService,
      public dialog: MatDialog ) { }

  jobOffers: JobOffer[] = [];
  searchedJobOffers: JobOffer[] = [];
  searchCriteria: string = "";
  user: User;
  visibleUserAcccountSettings: boolean = false;
  role: String;
  company: Company = new Company;
  companies: Company[] = [];

  ngOnInit(): void {
    this.loadUserData();
    this.loadJobOffers();
    this.loadCompanies();
  }

  loadUserData(){
    let username =  localStorage.getItem("user");
    let role =  localStorage.getItem("role");    

    if (role != undefined){
      this.role = role
    }

    if (username != undefined){
      this.userService.getByUsername(username).subscribe(
        (user: User) => {
        this.user = user;
      })
    }

    if (role == "ROLE_COMPANY_OWNER" && username != undefined){
      this.userService.getCompanyByOwnerUsername(username).subscribe(
        (company: Company) => {
        this.company = company;
      })
    }
  }

  loadJobOffers(){
    this.companyService.getAllJobOffers().subscribe(
      (data: JobOffer[]) => {
        this.jobOffers = data;

        for(let j of this.jobOffers){
          this.companyService.getCompanyById(j.companyId).subscribe(
            (data: Company) => {
              j.company = data;
            })
        }
        this.searchedJobOffers = this.jobOffers;
      }
    )
  }

  logout(){
    this.authService.logout();
    this.router.navigate(['']);  
  }

  search(){
    this.jobOffers = this.searchedJobOffers.filter(j =>
      (j.company.name).toLowerCase().includes(this.searchCriteria.toLowerCase()) ||
      (j.dailyActivities).toLowerCase().includes(this.searchCriteria.toLowerCase()) ||
      (j.jobDescription).toLowerCase().includes(this.searchCriteria.toLowerCase()) ||
      (j.preconditions).toLowerCase().includes(this.searchCriteria.toLowerCase()) || 
      (j.position.name).toLowerCase().includes(this.searchCriteria.toLowerCase())
    )
  }

  requestCompanyRegistration(){
    const dialogRef = this.dialog.open(CompanyRegistrationComponent, {
      width: '37vw',
      data: {},
    });

    dialogRef.afterClosed().subscribe(result => {
      window.location.reload();
    });
  }

  newJobOffer(){
    const dialogRef = this.dialog.open(NewJobOfferComponent, {
      width: '37vw',
      data: {},
    });

    dialogRef.afterClosed().subscribe(result => {
      window.location.reload();
    });
  }

  makeVisibleUserAcccountSettings(){
    this.visibleUserAcccountSettings = !this.visibleUserAcccountSettings
  }

  loadCompanies() {
    this.companyService.getAll()
      .subscribe(res => {
        this.companies = res;
      })
  }

  companyProfile(i: number) {
    this.router.navigate(['company', i])
  }

}
