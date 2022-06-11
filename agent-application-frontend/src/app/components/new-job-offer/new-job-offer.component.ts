import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Company } from 'src/app/model/company';
import { DislinktPost } from 'src/app/model/dislinkt-post';
import { JobOffer } from 'src/app/model/job-offer';
import { Test } from 'src/app/model/test';
import { UserClass } from 'src/app/model/user-class';
import { CompanyService } from 'src/app/services/company.service';
import { PostService } from 'src/app/services/post.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-new-job-offer',
  templateUrl: './new-job-offer.component.html',
  styleUrls: ['./new-job-offer.component.scss']
})
export class NewJobOfferComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<NewJobOfferComponent>, private userService: UserService, private companyService: CompanyService,
    private postService: PostService) { }

  userInfo: string;
  user: UserClass = new UserClass;
  company: Company = new Company;
  jobOffer: JobOffer = new JobOffer;
  promoteJobOffer: boolean = false;
  apiToken: string = "";
  public jwtHelper: JwtHelperService = new JwtHelperService();

  ngOnInit(): void {
    this.loadUserData();
  }

  loadUserData(){
    let username =  localStorage.getItem("user");

    if (username != undefined){
      this.userService.getByUsername(username).subscribe(
        (user: UserClass) => {
        this.user = user;
        this.userInfo = this.user.firstName + " " + this.user.lastName;
      })
    }
    this.loadCompany();
  }

  loadCompany(){
    let username =  localStorage.getItem("user");

    if (username != undefined) {
      this.userService.getCompanyByOwnerUsername(username).subscribe(
        (data: Company) => {
          this.company = data;
          if (data == null) {
            alert("Company not found!");
            this.dialogRef.close(); 
          }
        }
      );
    }
  }

  saveJobOffer(){
    this.jobOffer.companyId = this.company.id;

    if (this.jobOffer.position.name.trim() != "" && this.jobOffer.position.pay != 0 && 
        this.jobOffer.dailyActivities.trim() != "" && this.jobOffer.preconditions.trim() != "" && 
        this.jobOffer.jobDescription.trim() != "") {

          var format = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
          let isnum = /^\d+$/.test(this.jobOffer.position.name);

          if (format.test(this.jobOffer.position.name) || isnum) { // provera da li 'name' polje sadrzi specijalni karakter ili broj
            alert("Position name can not include special characters or numbers!")
          } 
          else 
          {
            if (!isNaN(this.jobOffer.position.pay)) {   // provera da li je 'pay' polje tipa number
              if (this.jobOffer.position.pay >= 100) { 
                
                if (this.promoteJobOffer) { // ukoliko se JobOffer promovise na Dislinktu
                  if (this.apiToken.trim() != "" && this.apiToken != null) {
                      let post = new DislinktPost;
                      post.text = "Job Offer";

                      post.jobOffer.id = this.jobOffer.id + ""
                      post.jobOffer.companyId = this.jobOffer.companyId + ""
                      post.jobOffer.dailyActivities = this.jobOffer.dailyActivities
                      post.jobOffer.jobDescription = this.jobOffer.jobDescription
                      post.jobOffer.preconditions = this.jobOffer.preconditions
                      post.jobOffer.position.id = this.jobOffer.position.id + ""
                      post.jobOffer.position.name = this.jobOffer.position.name
                      post.jobOffer.position.pay = this.jobOffer.position.pay

                      post.apiToken = this.apiToken;                  
                      post.company.id = this.company.id + ""
                      post.company.description =  this.company.description
                      post.company.isActive =  this.company.isActive
                      post.company.name =  this.company.name
                      post.company.phoneNumber =  this.company.phoneNumber

                      console.log(post)
                      this.postService.addPost(post).subscribe(   // dodavanje JobOffer-a kao post u Dislinkt aplikaciji
                      (data: any) => {
                        console.log(data);
                      });

                      this.companyService.saveJobOffer(this.jobOffer).subscribe(  // cuvanje JobOffer-a u agentskoj bazi
                      (data: any) => {
                        alert("New job offer successfully created and promoted on Dislinkt!")
                        this.dialogRef.close();
                      });
                  } 
                  else 
                  {
                      alert("In order to promote your jo offer on Dislinkt, you must enter your API token!")
                  }
                } 
                else 
                { 
                  this.companyService.saveJobOffer(this.jobOffer).subscribe(  // cuvanje JobOffer-a u agentskoj bazi
                  (data: any) => {
                    alert("New job offer successfully created!")
                    this.dialogRef.close();
                  });  
                }

              } 
              else 
              {
                alert("Pay must be above 100!");
              }
            } 
            else 
            {
              alert("Pay field must be numeric value!");
            }
          }
    } 
    else 
    {
      alert("All fields must be filled!");
    }
  }

  onNoClick(){
    this.dialogRef.close();
  }

  promoteJobOfferOnDislinkt(){
    if (this.promoteJobOffer){
      this.promoteJobOffer = false;
    } else {
      this.promoteJobOffer = true;
    }
  }
}
