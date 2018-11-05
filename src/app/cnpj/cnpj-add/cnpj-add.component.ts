import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {Component, Inject, OnInit} from '@angular/core';
import {CNPJService} from '../../cnpj/cnpj.service';
import {FormGroup, Validators, FormControl} from '@angular/forms';
import { RegisterCNPJ } from '@app/cnpj/cnpj-model';
import { I18nService, extract } from '@app/core';


@Component({
  selector: 'app-add.dialog',
  templateUrl: './cnpj-add.component.html'
})

export class CNPJAddDialogComponent implements OnInit {
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
  constructor(public dialogRef: MatDialogRef<CNPJAddDialogComponent>,
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