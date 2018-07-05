import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { LoginService } from '@app/login/login.service';
import { I18nService } from '@app/core';
import { ActivatedRoute } from '@angular/router';
import { User } from '@app/user/user-model';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password-component.html'
})
export class ForgotPasswordComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<ForgotPasswordComponent>,
              @Inject(MAT_DIALOG_DATA) public data: User,
              private route: ActivatedRoute,
              public dataService: LoginService,
              public i18n: I18nService) { }

  ngOnInit() {

  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  public send(): void {
    this.dataService.sendForgotPassword(this.data['email']);
    this.dialogRef.close();
  }

}
