import { Component, OnInit, Inject } from '@angular/core';
import { GenericParameter } from '@app/generic-parameter/generic-parameter.model';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { I18nService } from '@app/core';
import { MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-generic-parameter',
  templateUrl: './generic-parameter.component.html',
  styleUrls: ['./generic-parameter.component.scss']
})
export class GenericParameterComponent implements OnInit {

  form: FormGroup;
  data: GenericParameter = new GenericParameter();
  constructor(private formBuilder: FormBuilder,
    public i18n: I18nService) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
      version: new FormControl('', [Validators.required]),
      systemName: new FormControl('', [Validators.required]),
      socialName: new FormControl('', [Validators.required]),
      cnpj: new FormControl('', [Validators.required]),
      codeZip: new FormControl('', [Validators.required]),
      address: new FormControl('', [Validators.required]),
      neighborhood: new FormControl('', [Validators.required]),
      city: new FormControl('', [Validators.required]),
      state: new FormControl('', [Validators.required]),
      emailClient: new FormControl('', [Validators.required]),
      responsiblePerson:new FormControl('', [Validators.required]),
      emailReponsible: new FormControl('', [Validators.required]),
      emailDefault: new FormControl('', [Validators.required]),
      contactPerson: new FormControl('', [Validators.required]),
      emailSuport: new FormControl('', [Validators.required]),
      phoneSuport: new FormControl('', [Validators.required]),
    });
  }

  getErrorMessage() {
    
    return this.form.controls.version.hasError('required') ? 'fieldEmpty' :
    this.form.controls.systemName.hasError('required') ? 'fieldEmpty' :
    this.form.controls.socialName.hasError('required') ? 'fieldEmpty' :
    this.form.controls.cnpj.hasError('required') ? 'fieldEmpty' :
    this.form.controls.codeZip.hasError('required') ? 'fieldEmpty' :
    this.form.controls.address.hasError('required') ? 'fieldEmpty' :
    this.form.controls.neighborhood.hasError('required') ? 'fieldEmpty' :
    this.form.controls.city.hasError('required') ? 'fieldEmpty' :
    this.form.controls.emailClient.hasError('required') ? 'fieldEmpty' :
    this.form.controls.responsiblePerson.hasError('required') ? 'fieldEmpty' :
    this.form.controls.emailReponsible.hasError('required') ? 'fieldEmpty' :
    this.form.controls.emailDefault.hasError('required') ? 'fieldEmpty' :
    this.form.controls.contactPerson.hasError('required') ? 'fieldEmpty' :
    this.form.controls.emailSuport.hasError('required') ? 'fieldEmpty' :
    this.form.controls.phoneSuport.hasError('required') ? 'fieldEmpty' :
      '';
  }

}
