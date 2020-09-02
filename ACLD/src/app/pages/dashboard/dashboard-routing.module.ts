import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomeComponent} from "@dashboard/home/home.component";
import {LayoutComponent} from "./layout/layout.component";
import {EnrolmentComponent} from "./enrolment/enrolment.component";
import {ClassComponent} from "./class/class.component";
import {ContactComponent} from "./contact/contact.component";

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
      },
      {
        path: 'home',
        component: HomeComponent,
      },
      {
        path: 'enrolment',
        component: EnrolmentComponent,
      }
      ,
      {
        path: 'class',
        component: ClassComponent,
      }
      ,
      {
        path: 'contact',
        component: ContactComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
