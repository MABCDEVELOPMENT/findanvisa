import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material';
import { LoginService } from '@app/login/login.service';
import { I18nService } from '@app/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '@app/user/user-model';
import { ErrorDialogComponent } from '@app/core/message/error-dialog.component';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password-component.html'
})
export class ForgotPasswordComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<ForgotPasswordComponent>,
              @Inject(MAT_DIALOG_DATA) public data: User,
              private router: Router,
              private dialog: MatDialog,
              private route: ActivatedRoute,
              public dataService: LoginService,
              public i18n: I18nService) { }

  ngOnInit() {

  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  public send(): void {
    this.dataService.sendForgotPassword(this.data['email']).then(
      data => {
        this.showDialog("Solicitação enviada com sucesso!");
      },
      error => {
        this.showDialog("Erro de comunicação!");
      });
    this.dialogRef.close();
  }

  showDialog(msg : string) : void {
    this.dialog.open(ErrorDialogComponent, {
      data: {errorMsg: msg} ,width : '250px',height: '150px'
    });
  }

}
