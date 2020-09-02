import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {Auth} from '@aws-amplify/auth'
import {ToastService} from "@services/toast.service";
import {AuthService} from "@services/auth.service";

@Component({
  selector: 'app-verify-code',
  templateUrl: './verify-code.component.html',
  styleUrls: ['./verify-code.component.css']
})
export class VerifyCodeComponent implements OnInit {


  email = localStorage.getItem('confirmEmail');
  confirmForm: FormGroup = new FormGroup({
    email: new FormControl({value: this.email, disabled: true}),
    code: new FormControl('', [ Validators.required, Validators.min(3) ])
  });

  constructor( private router: Router, private toastService: ToastService) { }

  ngOnInit() {
    if (!this.email) {
      this.router.navigate(['auth/sign-up']);
    } else {
      Auth.resendSignUp(this.email);
    }
  }
  get codeInput() { return this.confirmForm.get('code'); }

  sendAgain() {
    Auth.resendSignUp(this.email)
      .then(() => this.toastService.showSuccess('A code has been emailed to you', 'Resend verification code'))
      .catch(() => this.toastService.showFailed('An error occurred', 'Failed to resend code'));
  }

  confirmCode() {
    Auth.confirmSignUp(this.email, this.codeInput.value)
      .then((data: any) => {
        if (data === 'SUCCESS' &&
          localStorage.getItem('confirmEmail') &&
          localStorage.getItem('confirmPassword')) {
          Auth.signIn(this.email, localStorage.getItem('confirmPassword'))
            .then(() => {
              this.toastService.showSuccess('You logged in successfully', 'Login Success');
              this.router.navigate(['']);
            }).catch(err => {
              console.log("failed to confirm ...")
              this.toastService.showFailed('Failed to verify code', 'Code verification');
            this.router.navigate(['auth/sign-in']);
          })
        }
      })
      .catch((error: any) => {
        console.log(error);
        this.toastService.showFailed(error.message, 'Confirm error');
      })
  }

}
