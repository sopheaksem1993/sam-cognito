import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Constants} from "@configs/constant";
import {AuthService} from "@services/auth.service";
import {Router} from "@angular/router";
import {LoadingBarService} from "@services/loading-bar.service";
import {ToastService} from "@services/toast.service";

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  signUpForm: FormGroup;
  phoneNumber: string;
  isValidNumber: boolean = true;
  submitted: boolean;
  hide = true;

  constructor(
    private formBuilder: FormBuilder,
    public _authService: AuthService,
    private loadingBarService: LoadingBarService,
    private toastService: ToastService,
    private router: Router,
    ) { }

  ngOnInit(): void {
    this.init();
  }

  init() {
    this.signUpForm = this.formBuilder.group({
      userName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phoneNumber: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(12)]]
    })
  }

  get userNameInput() {return this.signUpForm.get('userName')}
  get userNameInputError() {
    if(this.userNameInput.hasError('required')) return 'Username is required'
  }

  get emailInput() {return this.signUpForm.get('email')}
  get emailInputError() {
    if(this.emailInput.hasError('email')) return Constants.message.validEmail;
    if(this.emailInput.hasError('required')) return Constants.message.requiredEmail;
  }

  get phoneNumberInput() {return this.signUpForm.get('phoneNumber')}
  get phoneNumberInputError() {
    if(this.phoneNumberInput.hasError('required')) return 'Phone Number is required';
    if(!this.isValidNumber) return 'Please enter valid phone number';
  }

  get passwordInput() {return this.signUpForm.get('password')}
  get passwordInputError() {
    if(this.passwordInput.hasError('required')) return Constants.message.requiredPwd;
    if(this.passwordInput.hasError('minlength')) return Constants.message.minLengthPwd;
    if(this.passwordInput.hasError('maxlength')) return Constants.message.maxLengthPwd;
  }

  getPhoneNumber(event) {
    this.phoneNumber = event;
  }

  hasPhoneNumberError(event) {
    this.isValidNumber = event;
  }

  signUp() {
    this.submitted = true;
    if(this.signUpForm.invalid || !this.isValidNumber) return;
    this.loadingBarService.show();
    // Change phone number into country number + input value.
    this.signUpForm.value.phoneNumber = this.phoneNumber;
    this._authService.signUp(this.signUpForm.value).then(res => {
      this.loadingBarService.hide();
      localStorage.setItem('confirmEmail', this.emailInput.value);
      localStorage.setItem('confirmPassword', this.passwordInput.value);
      this.toastService.showSuccess('You registered in successfully', 'Registered Successfully');
      this.router.navigate(["auth/verify-code"]);
    })
      .catch(err => {
        this.loadingBarService.hide();
        this.toastService.showFailed(err.message, "Failed to Register new user")
      })
  }

}
