import {Component, OnInit, ViewChild} from '@angular/core';
import {MatTable, MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {MatDialog} from "@angular/material/dialog";
import {HttpService} from "@services/http.service";
import {ToastService} from "@services/toast.service";
import {Class} from "@models/class";
import {ClassDlgComponent} from "./class-dlg/class-dlg.component";

@Component({
  selector: 'app-class',
  templateUrl: './class.component.html',
  styleUrls: ['./class.component.css']
})
export class ClassComponent implements OnInit {

  displayedColumns: string[] = ['classId', 'title', 'description', 'action'];
  dataSource: any;


  @ViewChild(MatTable)  table: MatTable<any>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  constructor( private dialog: MatDialog, private httpService: HttpService, private toastService: ToastService) { }

  ngOnInit() {
    this.init();
  }

  init() {
    this.httpService.read('classes').subscribe(res => {if(res) this.initDataSource(res)})
  }

  initDataSource(data) {
    const classData: Class[] = [];
    data.forEach(function(item){
      if(item) classData.push({classId: item.classId, title: item.title , description: item.description});
    });
    this.dataSource = new MatTableDataSource<Class>(classData);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  delete(element) {
    if(window.confirm("Are you sure ?")) {
      const url = 'class/' + element.classId;
      this.httpService.delete(url).subscribe(res => {
        this.toastService.showSuccess(element.classId +" Class deleted Successfully", "Delete Class");
        this.init();
      }, err => {
        this.toastService.showFailed("Failed to delete" + element.classId +" enrolment", "Delete Class")
      });
    }
  }

  openDialog() {
    const dialogRef = this.dialog.open(ClassDlgComponent, {
      width: '600px',
      data: {title: '', description: ''}
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
    this.httpService.create('class' ,data).subscribe(res => {
      console.log("class added ...", res)
      this.toastService.showSuccess("New class added successfully", "Create new class");
      this.init();
    }, err => {
      console.log("class failed  added ...", err)
      this.toastService.showFailed("Failed to add new class", "Create new class");
    })
  }

}
