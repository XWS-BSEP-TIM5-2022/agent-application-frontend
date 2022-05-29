import { Component, Inject } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";

export interface DialogData {
    title: string;
    content: string;
    rating: number;
  }
  
  @Component({
    selector: 'dialog-overview-example-dialog',
    templateUrl: 'dialog-enter-interview.html',
    styleUrls: ['../test.component.scss']
  })
  export class DialogEnterInterview {
    constructor(
      public dialogRef: MatDialogRef<DialogEnterInterview>,
      @Inject(MAT_DIALOG_DATA) public data: DialogData,
    ) {}
  
    onNoClick(): void {
      this.dialogRef.close();
    }

    stars: number[] = [1, 2, 3, 4, 5];
    selectedValue: number = 0;
    star: number = -1;
    countStar(star) {
      this.selectedValue = star;
      this.data.rating = star
      console.log('Value of star', star);
    }
  }