import { NgModule } from '@angular/core';
import {SharedModule} from "@shared/shared.module";

import { DashboardRoutingModule } from './dashboard-routing.module';
import { HomeComponent } from './home/home.component';
import { LayoutComponent } from './layout/layout.component';
import { ContactComponent } from './contact/contact.component';
import { ClassComponent } from './class/class.component';
import { EnrolmentComponent } from './enrolment/enrolment.component';
import { StudentDlgComponent } from './home/student-dlg/student-dlg.component';
import { EnrolmentDlgComponent } from './enrolment/enrolment-dlg/enrolment-dlg.component';
import { ClassDlgComponent } from './class/class-dlg/class-dlg.component';
import { ContactDlgComponent } from './contact/contact-dlg/contact-dlg.component';

@NgModule({
  declarations: [HomeComponent, LayoutComponent, ContactComponent, ClassComponent, EnrolmentComponent, StudentDlgComponent, EnrolmentDlgComponent, ClassDlgComponent, ContactDlgComponent],
  imports: [
    SharedModule,
    DashboardRoutingModule,
  ]
})
export class DashboardModule { }
