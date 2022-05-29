import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { TestService } from 'src/app/services/test.service';
import { environment } from 'src/environments/environment';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { DialogLeaveComment } from './dialog-comments/dialog-data';
import { DialogEnterSalary } from './dialog-salary/dialog-data';
import { DialogEnterInterview } from './dialog-interviews/dialog-data';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss']
})
export class TestComponent implements OnInit {

  constructor(private testService: TestService, private http: HttpClient, public dialog: MatDialog) { }

  private readonly getAllByCompanyId = environment.backend_api + 'comments/company/';
  private readonly leaveComment = environment.backend_api + 'comments';

  visibleSalary: boolean = false;
  visibleComments: boolean = true;
  visibleInterviews: boolean = false;

  comments: any;
  companyId: number = 1;

  ngOnInit(): void {
    this.http.get<any>(`${this.getAllByCompanyId}` + this.companyId)
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

  // ---------------------------------------------------------------------------------------------------------------------------------------------------- -->
  stars: number[] = [1, 2, 3, 4, 5];
  selectedValue: number = -1;
  star: number = -1;
  countStar(star) {
    this.selectedValue = star;
  }
  
  openDialog() {
    const dialogRef = this.dialog.open(DialogLeaveComment, {
      width: '500px',
      data: { comanyId: this.companyId },
    });

    dialogRef.afterClosed().subscribe(result => {
      let body = {
        "title": result.title,
        "content": result.content,
        "companyId": this.companyId,
        "rating": result.rating.toString(),
      }
      const headers = new HttpHeaders({
        'Accept': 'application/json',
        'Content-Type': 'application/json'
     });
      this.http.post<any>(`${this.leaveComment}`, JSON.stringify(body), {'headers': headers})
        .subscribe( data => {
          let comms = data;
          this.comments.push(comms);
        }, 
        err => {
          alert(err.message);
        });
    });
  }

  // ---------------------------------------------------------------------------------------------------------------------------------------------------- -->

  openDialogSalary() {
    const dialogRef = this.dialog.open(DialogEnterSalary, {
      width: '500px',
      data: {},
    });
  }

  // ---------------------------------------------------------------------------------------------------------------------------------------------------- -->
  openDialogInterview() {
    const dialogRef = this.dialog.open(DialogEnterInterview, {
      width: '500px',
      data: {},
    });
  }
}

