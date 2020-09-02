import {Component, Inject, OnInit, Optional} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-student-dlg',
  templateUrl: './student-dlg.component.html',
  styleUrls: ['./student-dlg.component.css']
})
export class StudentDlgComponent implements OnInit {

  local_data: any;

  constructor(
    public dialogRef: MatDialogRef<StudentDlgComponent>,
    //@Optional() is used to prevent error if no data is passed
    @Optional() @Inject(MAT_DIALOG_DATA) public data) {
    this.local_data = {...data};
  }

  ngOnInit(): void {
  }

  doAction(){
    this.dialogRef.close({event:'Add',data:this.local_data});
  }

  closeDialog(){
    this.dialogRef.close({event:'Cancel'});
  }


}
