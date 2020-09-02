import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MaterialModule} from "./material.module";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {FlexLayoutModule} from "@angular/flex-layout";
import { ToastrModule } from 'ngx-toastr';
import {Ng2TelInputModule} from "ng2-tel-input";
import {LoadingBarComponent} from "./components/loading-bar/loading-bar.component";

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    ToastrModule.forRoot(),
    Ng2TelInputModule
  ],
  declarations: [LoadingBarComponent],
  exports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    ToastrModule,
    Ng2TelInputModule,
    LoadingBarComponent,
  ]
})
export class SharedModule { }
