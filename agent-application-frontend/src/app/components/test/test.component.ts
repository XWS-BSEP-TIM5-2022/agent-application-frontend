import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { TestService } from 'src/app/services/test.service';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss']
})
export class TestComponent implements OnInit {

  constructor(private testService: TestService, private http: HttpClient) { }

  private readonly getAllByCompanyId = environment.backend_api + 'comments/company/1';

  visibleSalary: boolean = false;
  visibleComments: boolean = true;
  visibleInterviews: boolean = false;

  comments: any;

  // stars: number[] = [1, 2, 3, 4, 5];

  ngOnInit(): void {
    this.http.get<any>(`${this.getAllByCompanyId}`)
      .subscribe(data => {
        console.log(data)
        this.comments = data;
      }
    )
  }
  changeVisibleComments() {
    this.visibleSalary = false;
    this.visibleComments = true;
    this.visibleInterviews = false;
  }

  changeVisibleSalary() {
    this.visibleSalary = true;
    this.visibleComments = false;
    this.visibleInterviews = false;
  }

  changeVisibleInterviews() {
    this.visibleSalary = false;
    this.visibleComments = false;
    this.visibleInterviews = true;
  }

  stars: number[] = [1, 2, 3, 4, 5];
  selectedValue: number = -1;
  star: number = -1;
  countStar(star) {
    this.selectedValue = star;
    console.log('Value of star', star);
  }

}
