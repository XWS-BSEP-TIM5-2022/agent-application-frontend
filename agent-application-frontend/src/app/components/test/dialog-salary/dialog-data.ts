import { Component, Inject } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";

export interface DialogData {
    positions: string[];
    position: string;
    pay: number;
    isFormerEmployee: boolean;
    bonus: boolean;
    fairPay: boolean;
  }
  
  @Component({
    selector: 'dialog-overview-example-dialog',
    templateUrl: 'dialog-enter-salary.html',
    styleUrls: ['../test.component.scss']
  })
  export class DialogEnterSalary {
    constructor(
      public dialogRef: MatDialogRef<DialogEnterSalary>,
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
      console.log('Value of star', star);
    }
  }