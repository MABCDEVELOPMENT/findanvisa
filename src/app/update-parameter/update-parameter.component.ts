import { Component, OnInit, Inject } from '@angular/core';
import { UpdateParameter } from '@app/update-parameter/update-parameter.model';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { I18nService } from '@app/core';
import { MAT_DIALOG_DATA } from '@angular/material';
import { UpdateParameterService } from '@app/update-parameter/update-parameter.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-update-parameter',
  templateUrl: './update-parameter.component.html',
  styleUrls: ['./update-parameter.component.scss']
})
export class UpdateParameterComponent implements OnInit {

  form: FormGroup;
  data: UpdateParameter = new UpdateParameter();
  constructor(private formBuilder: FormBuilder,
    private router: Router,
    public updateParameterService : UpdateParameterService,
    public i18n: I18nService) { }

  ngOnInit() {
    this.updateParameterService.load().then(data => {
      this.data = data;
    },err  => {
      this.data = new UpdateParameter();
    });

    this.form = this.formBuilder.group({
      version: new FormControl('', [Validators.required]),
      systemName: new FormControl('', [Validators.required]),
      socialName: new FormControl('', [Validators.required]),
      cnpj: new FormControl('', [Validators.required]),
      codeZip: new FormControl('', [Validators.required]),
      address: new FormControl('', [Validators.required]),
      number: new FormControl('', [Validators.required]),
      neighborhood: new FormControl('', [Validators.required]),
      city: new FormControl('', [Validators.required]),
      state: new FormControl('', [Validators.required]),
      emailClient: new FormControl('', [Validators.required]),
      responsiblePerson:new FormControl('', [Validators.required]),
      emailReponsible: new FormControl('', [Validators.required]),
      emailDefault: new FormControl('', [Validators.required])
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
    '';
  }

  save(){

    this.data.version     = this.form.controls["version"].value;
    this.data.systemName	= this.form.controls["systemName"].value;
    this.data.socialName	= this.form.controls["socialName"].value;
    this.data.cnpj		    = this.form.controls["cnpj"].value;
    this.data.codeZip		  = this.form.controls["codeZip"].value;
    this.data.address		  = this.form.controls["address"].value;
    this.data.number		  = this.form.controls["number"].value;
    this.data.neighborhood	= this.form.controls["neighborhood"].value;
    this.data.city		      = this.form.controls["city"].value;
    this.data.state		      = this.form.controls["state"].value;
    this.data.emailClient	  = this.form.controls["emailClient"].value;
    this.data.responsiblePerson = this.form.controls["responsiblePerson"].value;	
    this.data.emailReponsible	  = this.form.controls["emailReponsible"].value;
    this.data.emailDefault	    = this.form.controls["emailDefault"].value;
  /*   this.data.updateUser	      = this.form.controls["updateUser"].value;
    this.data.updateDate	      = this.form.controls["updateUser"].value; */

    this.updateParameterService.save(this.data);
  }

  onNoClick() {
    this.router.navigate(['/'], { replaceUrl: true });
  }
}
