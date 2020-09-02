import { NgModule } from '@angular/core';
import {SharedModule} from "@shared/shared.module";


import { AuthRoutingModule } from './auth-routing.module';
import { SignInComponent } from './sign-in/sign-in.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { VerifyCodeComponent } from './verify-code/verify-code.component';
import { ProfileComponent } from './profile/profile.component';
import { LayoutComponent } from './layout/layout.component';


@NgModule({
  declarations: [SignInComponent, SignUpComponent, VerifyCodeComponent, ProfileComponent, LayoutComponent],
  imports: [
    SharedModule,
    AuthRoutingModule
  ]
})
export class AuthModule { }
