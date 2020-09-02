import { Injectable } from '@angular/core';
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {LoadingBarComponent} from "@shared/components/loading-bar/loading-bar.component";

@Injectable({
  providedIn: 'root'
})
export class LoadingBarService {

  loading: boolean;
  dialogRef: MatDialogRef<LoadingBarComponent>;
  constructor(  private dialog: MatDialog) {}
  show(message: string = "Please wait..."): void {
    setTimeout(() => {
      this.loading = true;
      this.dialogRef = this.dialog.open(LoadingBarComponent, {
        width: "80%",
        data: { message: message },
        closeOnNavigation: false
      });
    });
  }

  hide() {
    if (this.dialogRef) {
      this.dialogRef.close();
      this.loading = false;
    }
  }
}
