import {Component, OnInit, ViewChild} from '@angular/core';
import {MatTable, MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {MatDialog} from "@angular/material/dialog";
import {ContactDlgComponent} from "./contact-dlg/contact-dlg.component";
import {Contact} from "@models/contact";
import {HttpService} from "@services/http.service";
import {ToastService} from "@services/toast.service";

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

  displayedColumns: string[] = ['contactId', 'studentId', 'phoneNumber', 'email', 'address', 'action'];
  dataSource: any;


  @ViewChild(MatTable)  table: MatTable<any>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  constructor( private dialog: MatDialog, private httpService: HttpService, private toastService: ToastService) { }

  ngOnInit() {
    this.init();
  }

  init() {
    this.httpService.read('contacts').subscribe(res => {if(res) this.initDataSource(res)})
  }

  initDataSource(data) {
    const contactData: Contact[] = [];
    data.forEach(function(item){
      if(item) contactData.push({contactId: item.contactId, studentId: item.studentId, phoneNumber: item.phoneNumber, email: item.email, address: item.address});
    });
    this.dataSource = new MatTableDataSource<Contact>(contactData);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  delete(element) {
    if(window.confirm("Are you sure ?")) {
      const url = 'contact/' + element.contactId;
      this.httpService.delete(url).subscribe(res => {
        this.toastService.showSuccess(element.contactId +" Contact deleted Successfully", "Delete Contact");
        this.init();
      }, err => {
        this.toastService.showFailed("Failed to delete" + element.contactId +" contact", "Delete Contact")
      });
    }
  }

  openDialog() {
    const dialogRef = this.dialog.open(ContactDlgComponent, {
      width: '600px',
      data: {contactId: '', studentId: '', phoneNumber: '', email: '', address: ''}
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
    this.httpService.create('contact' ,data).subscribe(res => {
      console.log("contact added ...", res)
      this.toastService.showSuccess("New contact added successfully", "Create new contact");
      this.init();
    }, err => {
      console.log("contact failed  added ...", err)
      this.toastService.showFailed("Failed to add new contact", "Create new contact");
    })
  }

}
