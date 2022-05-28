import { Component, OnInit } from '@angular/core';
import { Company } from 'src/app/model/company';
import { JobOffer } from 'src/app/model/job-offer';
import { CompanyService } from 'src/app/services/company.service';

@Component({
  selector: 'app-job-offers',
  templateUrl: './job-offers.component.html',
  styleUrls: ['./job-offers.component.scss']
})
export class JobOffersComponent implements OnInit {

  constructor(private companyService: CompanyService) { }
  
  jobOffers: JobOffer[] = [];
  searchedJobOffers: JobOffer[] = [];
  searchCriteria: string = "";

  ngOnInit(): void {
    this.loadJobOffers();
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

    console.log(this.jobOffers)
  }
}
