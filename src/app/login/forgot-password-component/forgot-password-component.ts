import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { LoginService } from '@app/login/login.service';
import { I18nService } from '@app/core';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password-component.html'
})
export class ForgotPasswordComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<ForgotPasswordComponent>,
              @Inject(MAT_DIALOG_DATA) public data: string,
              public dataService: LoginService,
              public i18n: I18nService) { }

  ngOnInit() {

  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  public send(): void {
    this.dataService.sendForgotPassword(this.data['email']);
  }

}
