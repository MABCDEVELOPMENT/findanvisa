import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {Component, Inject, OnInit} from '@angular/core';
import {CNPJService} from '../../cnpj/cnpj.service';
import {FormGroup, Validators, FormControl} from '@angular/forms';
import { RegisterCNPJ } from '@app/cnpj/cnpj-model';
import { I18nService, extract } from '@app/core';
import { EmailValidator,CustomValidator } from '@app/shared/validators';
import { DateValidator } from '@app/shared/validators/date.validator';
import { PhoneValidator } from '@app/shared/validators/phone.validator';
import { HttpErrorResponse } from '@angular/common/http';
import { UserService } from '@app/user/user.service';




@Component({
  selector: 'app-cnpj.dialog',
  templateUrl: './cnpj-dialog.component.html'
})

export class CNPJDialogComponent implements OnInit {
  hide:any;
  hideConf:any;
  
  error: HttpErrorResponse;  
  cnpjs: RegisterCNPJ[];
  selectedOptions:RegisterCNPJ[];
  form: FormGroup;

  public cnpjMask = [ /\d/ , /\d/, '.', /\d/, /\d/, /\d/, '.', /\d/ , /\d/, /\d/, '/', /\d/, /\d/,/\d/, /\d/, '-', /\d/, /\d/,];
  constructor(public dialogRef: MatDialogRef<CNPJDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: RegisterCNPJ,
              public dataService: CNPJService,
              public dataServiceUser: UserService,
              public i18n: I18nService) {
                  
  }
  
  ngOnInit() {
    this.loadData();
    this.form = new FormGroup({
      cnpj: new FormControl('', [])
    });
  }

  submit() {
  
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  public confirmAdd(): void {
       this.dataService.saveCnpjUser(this.selectedOptions);
  }
  onNgModelChange(event: Event) {
    console.log(event);
  }
  
  maskCnpj(valor: string):string {
    return valor.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/g,"\$1.\$2.\$3\/\$4\-\$5");
 }
  public loadData() {

    this.dataService.getCNPJs()
                    .then(
                      data => {
                        this.cnpjs = data;
                        
                      },
                      error => {
                        this.error = error;
                        alert(error); 
                      });
  
} 


}