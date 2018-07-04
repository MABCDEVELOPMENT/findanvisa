import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { Component, Inject, OnInit } from '@angular/core';
import { UserService } from '../../user/user.service';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { User } from '@app/user/user-model';
import { I18nService, extract } from '@app/core';
import { EmailValidator, CustomValidator } from '@app/shared/validators';
import { DateValidator } from '@app/shared/validators/date.validator';
import { PhoneValidator } from '@app/shared/validators/phone.validator';
;

@Component({
  selector: 'app-edit.dialog',
  templateUrl: './user-edit.component.html'
})

export class UserEditDialogComponent {

  hide: any;
  hideConf: any;
  confirmPassword: string;
  user: User;

  form: FormGroup;

  perfis = [
    {value: 1,  viewValue: 'Administrador'},
    {value: 2,  viewValue: 'Operador'}
  ];

  acitves = [
    {value: true,   viewValue: 'Sim'},
    {value: false,  viewValue: 'Não'}
  ];


  public mask = [/\d/, /\d/, '/', /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/];
  public maskPhone = ['(', /[1-9]/, /\d/, ')', ' ', /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];

  constructor(public dialogRef: MatDialogRef<UserEditDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: User,
    public dataService: UserService,
    public i18n: I18nService) {

  }

  ngOnInit() {
    this.form = new FormGroup({
      fullName: new FormControl('', [Validators.required]),
      userName: new FormControl('', [Validators.required]),
      dateBrith: new FormControl('', [Validators.required, DateValidator.validDate]),
      email: new FormControl('', [Validators.required, Validators.email]),
      cellPhone: new FormControl('', [Validators.required]),
      perfil: new FormControl('', [Validators.required]),
      active: new FormControl('', [Validators.required])
    });
  }

  getErrorMessage() {
    return this.form.controls.email.hasError('required') ? 'fieldEmpty' :
      this.form.controls.email.hasError('email') ? 'invalidEmail' :
        this.form.controls.dateBrith.hasError('required') ? 'fieldEmpty' :
          this.form.controls.dateBrith.hasError('date') ? 'invalidDate' :
            this.form.controls.cellPhone.hasError('required') ? 'fieldEmpty' :
              this.form.controls.cellPhone.hasError('phone') ? 'invalidPhone' :
              this.form.controls.pefil.hasError('required') ? 'fieldEmpty' :
              this.form.controls.active.hasError('required') ? 'fieldEmpty' :
                '';
  }

  submit() {
    // emppty stuff
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  public confirmAdd(): void {

    this.dataService.save(this.data);

  }
}