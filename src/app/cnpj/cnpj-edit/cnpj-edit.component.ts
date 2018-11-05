import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {Component, Inject, OnInit} from '@angular/core';
import {CNPJService} from '../../cnpj/cnpj.service';
import {FormGroup, Validators, FormControl} from '@angular/forms';
import { RegisterCNPJ } from '@app/cnpj/cnpj-model';
import { I18nService, extract } from '@app/core';
import { EmailValidator,CustomValidator } from '@app/shared/validators';
import { DateValidator } from '@app/shared/validators/date.validator';
import { PhoneValidator } from '@app/shared/validators/phone.validator';




@Component({
  selector: 'app-edit.dialog',
  templateUrl: './cnpj-edit.component.html'
})

export class CNPJEditDialogComponent implements OnInit {
  hide:any;
  hideConf:any;
  cnpj:RegisterCNPJ = new RegisterCNPJ();
  
  form: FormGroup;

  actives = [
    {value: true,   viewValue: 'Sim'},
    {value: false,  viewValue: 'Não'}
  ];

  categorys = [
    {value: 0,  viewValue: 'Alimentos'},
    {value: 1,  viewValue: 'Cosméticos'},
    {value: 2,  viewValue: 'Saneantes'},
    {value: 3,  viewValue: 'Todas'}
  ];

  public cnpjMask = [ /\d/ , /\d/, '.', /\d/, /\d/, /\d/, '.', /\d/ , /\d/, /\d/, '/', /\d/, /\d/,/\d/, /\d/, '-', /\d/, /\d/,];
  constructor(public dialogRef: MatDialogRef<CNPJEditDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: RegisterCNPJ,
              public dataService: CNPJService,
              public i18n: I18nService) {
                  
  }
  
  ngOnInit() {
      this.form  = new FormGroup({
        cnpj:      new FormControl('', [Validators.required]),
        fullName:  new FormControl('', [Validators.required]),
        category:  new FormControl('', [Validators.required]),
        acitve:    new FormControl('', [])
        
    });
  }

  getErrorMessage() {
    return this.form.controls.fullName.hasError('required') ? 'fieldEmpty' :
           this.form.controls.cnpj.hasError('required') ? 'fieldEmpty' :
           this.form.controls.category.hasError('required') ? 'fieldEmpty' :
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