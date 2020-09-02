import {Component, OnInit, ViewChild} from '@angular/core';
import {MatTable, MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {MatDialog} from "@angular/material/dialog";
import {EnrolmentDlgComponent} from "./enrolment-dlg/enrolment-dlg.component";
import {HttpService} from "@services/http.service";
import {ToastService} from "@services/toast.service";
import {Enrolment} from "@models/enrolment";

@Component({
  selector: 'app-enrolment',
  templateUrl: './enrolment.component.html',
  styleUrls: ['./enrolment.component.css']
})
export class EnrolmentComponent implements OnInit {

  displayedColumns: string[] = ['enrolmentId', 'studentId', 'classId', 'action'];
  dataSource: any;


  @ViewChild(MatTable)  table: MatTable<any>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  constructor( private dialog: MatDialog, private httpService: HttpService, private toastService: ToastService) { }

  ngOnInit() {
    this.init();
  }

  init() {
    this.httpService.read('enrolments').subscribe(res => {if(res) this.initDataSource(res)})
  }

  initDataSource(data) {
    const enrolmentData: Enrolment[] = [];
    data.forEach(function(item){
      if(item) enrolmentData.push({enrolmentId: item.enrolmentId, classId: item.classId , studentId: item.studentId});
    });
    this.dataSource = new MatTableDataSource<Enrolment>(enrolmentData);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  delete(element) {
    if(window.confirm("Are you sure ?")) {
      const url = 'enrolment/' + element.enrolmentId;
      this.httpService.delete(url).subscribe(res => {
        this.toastService.showSuccess(element.enrolmentId +" Enrolment deleted Successfully", "Delete Enrolment");
        this.init();
      }, err => {
        this.toastService.showFailed("Failed to delete" + element.enrolmentId +" enrolment", "Delete Enrolment")
      });
    }
  }

  openDialog() {
    const dialogRef = this.dialog.open(EnrolmentDlgComponent, {
      width: '600px',
      data: {studentId: '', classId: ''}
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result) {
        if (result.event == 'Add') {
          this.addRowData(result.data);
        }
      }
    });
  }

  addRowData(data) {
    this.httpService.create('enrolment' ,data).subscribe(res => {
      console.log("enrolment added ...", res)
      this.toastService.showSuccess("New enrolment added successfully", "Create new enrolment");
      this.init();
    }, err => {
      console.log("enrolment failed  added ...", err)
      this.toastService.showFailed("Failed to add new enrolment", "Create new enrolment");
    })
  }

}
