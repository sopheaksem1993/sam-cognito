import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {SignInComponent} from "./sign-in/sign-in.component";
import {SignUpComponent} from "./sign-up/sign-up.component";
import {VerifyCodeComponent} from "./verify-code/verify-code.component";
import {ProfileComponent} from "./profile/profile.component";
import {AuthGuard} from "@helpers/auth.guard";
import {LayoutComponent} from "./layout/layout.component";

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: 'sign-in',
        component: SignInComponent,
        pathMatch: 'full'
      },
      {
        path: 'sign-up',
        component: SignUpComponent,
        pathMatch: 'full'
      },
      {
        path: 'verify-code',
        component: VerifyCodeComponent,
        pathMatch: 'full'
      },
      {
        path: 'profile',
        component: ProfileComponent,
        pathMatch: 'full',
        canActivate: [AuthGuard]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
