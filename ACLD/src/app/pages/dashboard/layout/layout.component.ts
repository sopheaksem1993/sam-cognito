import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {AuthService} from "@services/auth.service";
import {ToastService} from "@services/toast.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent implements OnInit {

  tabs = ['home', 'enrolment', 'class', 'contact'];
  constructor(
    private router: Router,
    public _authService: AuthService,
    private toastService: ToastService,
    ) { }

  ngOnInit(): void {
  }

  signOut() {
    this._authService.signOut().then(() => {
      this.router.navigateByUrl('auth/sign-in')
      this.toastService.showSuccess("Logged out successfully", "Log out")
    })
  }

  selectTab(event) {
    this.router.navigateByUrl(this.tabs[event.index])
  }

}
