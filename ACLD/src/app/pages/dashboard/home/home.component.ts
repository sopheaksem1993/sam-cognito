import {Component, OnInit, ViewChild} from '@angular/core';
import {MatTable, MatTableDataSource} from "@angular/material/table";
import {MatSort} from "@angular/material/sort";
import {MatPaginator} from "@angular/material/paginator";
import {HttpService} from "@services/http.service";
import {ToastService} from "@services/toast.service";
import {MatDialog} from "@angular/material/dialog";
import {Student} from "@models/student";
import {StudentDlgComponent} from "./student-dlg/student-dlg.component";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  displayedColumns: string[] = ['studentId', 'name', 'sex', 'grade', 'hobby', 'action'];
  dataSource: any;


  @ViewChild(MatTable)  table: MatTable<any>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  constructor( private dialog: MatDialog, private httpService: HttpService, private toastService: ToastService) { }

  ngOnInit() {
    // Check backend api status.
    this.httpService.read('ping').subscribe(res => {
      console.log("checking api status ...", res)
    });
    this.init();
  }

  init() {
    this.httpService.read('students').subscribe(res => {if(res) this.initDataSource(res)})
  }

  initDataSource(data) {
    const studentData: Student[] = [];
    data.forEach(function(item){
      if(item) studentData.push({studentId: item.studentId, name: item.name , sex: item.sex, grade: item.grade, hobby: item.hobby});
    });
    this.dataSource = new MatTableDataSource<Student>(studentData);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  delete(element) {
    if(window.confirm("Are you sure ?")) {
      const url = 'student/' + element.studentId;
      this.httpService.delete(url).subscribe(res => {
        this.toastService.showSuccess("User deleted Successfully", "Delete User");
        this.init();
      }, err => {
        this.toastService.showFailed("Failed to delete user", "Delete User")
      });
    }
  }

  openDialog() {
    const dialogRef = this.dialog.open(StudentDlgComponent, {
      width: '600px',
      data: {name: '', sex: '', grade: '', hobby: ''}
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
    this.httpService.create('student' ,data).subscribe(res => {
      console.log("User added ...", res)
      this.toastService.showSuccess("New user added successfully", "Create new user");
      this.init();
    }, err => {
      console.log("User failed  added ...", err)
      this.toastService.showFailed("Failed to add new user", "Create new user");
    })
  }

}



