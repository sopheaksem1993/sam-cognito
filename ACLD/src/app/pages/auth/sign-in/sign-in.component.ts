import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {LoadingBarService} from "@services/loading-bar.service";
import {AuthService} from "@services/auth.service";
import { CognitoUser } from '@aws-amplify/auth';
import {Router} from "@angular/router";

import {Constants} from "@configs/constant"
import {ToastService} from "@services/toast.service";
@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {
  hide = true;
  signInForm: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    public _authService: AuthService,
    private router: Router,
    private loadingBarService: LoadingBarService,
    private toastService: ToastService,
  ) { }

  ngOnInit(): void {
    this.init();
  }

  init() {
    this.signInForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(12)]]
    })
  }

  signIn() {
    if(this.signInForm.invalid) return;
    this.loadingBarService.show();
    this._authService.signIn(this.emailInput.value, this.passwordInput.value)
      .then((user: CognitoUser|any) => {
        this.loadingBarService.hide();
        this.toastService.showSuccess('You logged in successfully', 'Login Success');
        this.router.navigateByUrl('');
      }).catch(err => {
      this.loadingBarService.hide();
      this.toastService.showFailed(err.message, 'Login Failed');
      switch (err.code) {
        case "UserNotConfirmedException":
         localStorage.setItem('confirmEmail', this.emailInput.value);
         localStorage.setItem('confirmPassword ', this.passwordInput.value);
          this.router.navigateByUrl('auth/verify-code');
          break;
        case "UsernameExistsException":
          this.router.navigateByUrl('auth/sign-in');
          break;
      }
    })
  }

  get emailInput() {return this.signInForm.get('email')}

  get emailInputError() {
    if(this.emailInput.hasError('email')) return Constants.message.validEmail;
    if(this.emailInput.hasError('required')) return Constants.message.requiredEmail;
  }

  get passwordInput() {return this.signInForm.get('password')}

  get passwordInputError() {
    if(this.passwordInput.hasError('required')) return Constants.message.requiredPwd;
    if(this.passwordInput.hasError('minlength')) return Constants.message.minLengthPwd;
    if(this.passwordInput.hasError('maxlength')) return Constants.message.maxLengthPwd;
  }

}
