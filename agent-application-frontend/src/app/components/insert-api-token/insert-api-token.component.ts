import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-insert-api-token',
  templateUrl: './insert-api-token.component.html',
  styleUrls: ['./insert-api-token.component.scss']
})
export class InsertApiTokenComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<InsertApiTokenComponent>, private userService: UserService) { }
  apiToken: string = ""

  ngOnInit(): void {
  }

  saveApiToken(){
    let username =  localStorage.getItem("user");

    // let token = new ApiToken;
    // token.apiToken = this.apiToken;
    // if (username != undefined && this.apiToken != null && this.apiToken.trim() != "") {
      // this.userService.saveApiToken(username, token).subscribe(
      //   (data: any) => {
      //     alert("API token successfully inserted!")
      //     this.dialogRef.close();
      //   }
      // ) 
    // } else {
    //   alert("Error! API token not saved!")
    // }
  }

  onNoClick(){
    this.dialogRef.close();
  }
}
