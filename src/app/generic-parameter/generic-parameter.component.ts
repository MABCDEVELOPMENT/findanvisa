import { Component, OnInit, Inject } from '@angular/core';
import { GenericParameter } from '@app/generic-parameter/generic-parameter.model';
import {FormGroup, Validators, FormControl} from '@angular/forms';
import { I18nService } from '@app/core';
import { GenericParameterService } from '@app/generic-parameter/generic-parameter.service';
import { Router } from '@angular/router';
import { ErrorDialogComponent } from '@app/core/message/error-dialog.component';
import { MatDialog } from '@angular/material';

@Component({
  selector: 'app-generic-parameter',
  templateUrl: './generic-parameter.component.html',
  styleUrls: ['./generic-parameter.component.scss']
})
export class GenericParameterComponent implements OnInit {

  form:  FormGroup;
  error: string;
  data:  GenericParameter = new GenericParameter();
  isLoading: boolean = true;
  public cnpjMask = [ /\d/ , /\d/, '.', /\d/, /\d/, /\d/, '.', /\d/ , /\d/, /\d/, '/', /\d/, /\d/,/\d/, /\d/, '-', /\d/, /\d/,];
  constructor(private router: Router,
    private dialog: MatDialog,
    public genericParameterService : GenericParameterService,
    public i18n: I18nService) { 
    
      this.genericParameterService.load().then(data => {
        this.data = data;
      }, err => {
        this.data = new GenericParameter();
      });

  }

  ngOnInit() {

    this.form = new FormGroup({
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
      emailDefault: new FormControl('', [Validators.required]),
      emailPermission: new FormControl('', [Validators.required])
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
    this.form.controls.emailPermission.hasError('required') ? 'fieldEmpty' :
    '';
  }

  save(){
    this.data.versao     = this.form.controls["version"].value;
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
    this.data.emailPermission	  = this.form.controls["emailPermission"].value;
 
    this.genericParameterService.save(this.data).then(response => {
         this.showMsg("Registro salvo com sucesso!");
        
      }).catch( error => {
        this.error = error.error.errorMessage;
        this.showMsg(this.error); 
      })  ;
  }

  onNoClick() {
    this.router.navigate(['/'], { replaceUrl: true });
  }

  

  showMsg(message : string) : void {
    this.dialog.open(ErrorDialogComponent, {
      data: {errorMsg: message} ,width : '250px',height: '200px'
    });
  }
}
