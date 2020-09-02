import { Injectable } from '@angular/core';
import {ToastrService} from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  constructor(private toastService: ToastrService) { }
  showSuccess(msg, title) {
    this.toastService.success(msg, title)
  }

  showFailed(msg, title) {
    this.toastService.error(msg, title)
  }
}
