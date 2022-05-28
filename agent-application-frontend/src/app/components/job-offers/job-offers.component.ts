import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Company } from 'src/app/model/company';
import { JobOffer } from 'src/app/model/job-offer';
import { User } from 'src/app/model/user';
import { AuthService } from 'src/app/services/auth.service';
import { CompanyService } from 'src/app/services/company.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-job-offers',
  templateUrl: './job-offers.component.html',
  styleUrls: ['./job-offers.component.scss']
})
export class JobOffersComponent implements OnInit {

  constructor(private companyService: CompanyService, private userService: UserService, private router: Router, private authService: AuthService) { }
  
  jobOffers: JobOffer[] = [];
  searchedJobOffers: JobOffer[] = [];
  searchCriteria: string = "";
  user: User;
  visibleUserAcccountSettings: boolean = false;

  ngOnInit(): void {
    this.loadUserData();
    this.loadJobOffers();
  }

  loadUserData(){
    let username =  localStorage.getItem("user");
    
    if (username != undefined){
      this.userService.getByUsername(username).subscribe(
        (user: User) => {
        this.user = user;
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

  requestCompanyRegistration(){
    
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

  makeVisibleUserAcccountSettings(){
    this.visibleUserAcccountSettings = !this.visibleUserAcccountSettings
  }

  logout(){
    this.authService.logout();
    this.router.navigate(['']);  
  }
}
