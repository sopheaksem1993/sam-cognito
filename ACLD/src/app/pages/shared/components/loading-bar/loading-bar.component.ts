import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from "@angular/material/dialog";

@Component({
  selector: 'app-loading-bar',
  templateUrl: './loading-bar.component.html',
  styleUrls: ['./loading-bar.component.css']
})
export class LoadingBarComponent implements OnInit {

  message = "Please wait...";

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {
    if (data.message) this.message = data.message;
  }

  ngOnInit(): void {
  }

}
