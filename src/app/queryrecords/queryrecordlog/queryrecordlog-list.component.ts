import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatDialog} from '@angular/material';

import { I18nService, AuthenticationService } from '@app/core';

import { QueryrecordsService } from '../queryrecords.service';
import { RegisterCNPJ } from '@app/cnpj/cnpj-model';
import { User } from '@app/user/user-model';
import { ErrorDialogComponent } from '@app/core/message/error-dialog.component';
import { FormGroup,  Validators, FormControl } from '@angular/forms';
import { Content } from '@app/queryrecords/modelquery/content.model';
import { Router } from '@angular/router';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';

import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
import { QueryRecordLogParameter } from '../queryrecordlogparameter.model';
import { FilterLogService } from './filter-service-log';

@Component({
  selector: 'app-queryrecordlog-list',
  templateUrl: './queryrecordlog-list.component.html',
  styleUrls: ['./queryrecordlog-list.component.scss']
})
export class QueryrecordLogListComponent implements OnInit, AfterViewInit {

  public cnpjMask = [ /\d/ , /\d/, '.', /\d/, /\d/, /\d/, '.', /\d/ , /\d/, /\d/, '/', /\d/, /\d/,/\d/, /\d/, '-', /\d/, /\d/,];
  
  error: string;
  
  typeProduct = 0;

  data: any;

  cnpj:any;
  category:any;
  option:any;

  ELEMENT_DATA: Content[];
  selected:RegisterCNPJ;
  cnpjs:RegisterCNPJ[];
  filteredOptions: Observable<RegisterCNPJ[]>;

  queryRecordParameter: QueryRecordLogParameter;

  user:User;
  form: FormGroup;

  selectedOption:any;
  selectedCategory:any;

  categorys = [
    {value: 0,  viewValue: 'Alimentos'},
    {value: 1,  viewValue: 'Cosméticos'},
    {value: 2,  viewValue: 'Saneantes'}
  ];

  options:any = [];

  constructor( public dialog: MatDialog,
               private router: Router,
               private spinnerService: Ng4LoadingSpinnerService,
               public parent: FilterLogService,
               public dataService: QueryrecordsService,
               private authenticationService: AuthenticationService,
               public i18nService: I18nService) { 

  }

 
  @ViewChild('formFilter') formFilter: any;
  @ViewChild('table') table: any;

  ngOnInit() {
    this.createForm();
    this.loadUser();
    this.filteredOptions = this.form.get('company').valueChanges
    .pipe(
      startWith(''),
      map(value => this._filter(value))
    );
  }

  ngAfterViewInit() {

  } 
  
  private _filter(value: string): RegisterCNPJ[] {
    
    const filterValue = value.toLowerCase();
    if (this.cnpjs) {
      return this.cnpjs.filter(option => option.fullName.toLowerCase().includes(filterValue));
    }
  }

  createForm() {
    this.form =  new FormGroup({
      company: new FormControl('',[Validators.required]),
      category: new FormControl('', [Validators.required]),
      option:new FormControl('', [Validators.required]),  
      dateStart:new  FormControl('', []),
      dateEnd:new  FormControl('', [])
    });
  }

  getErrorMessage() {
    return this.form.controls.product.hasError('required') ? 'fieldEmpty' :
           '';
  }

  loadUser() {
    this.spinnerService.show();
    this.authenticationService.loadUser(null)
      .then(
        data => {
          this.user = data;
          this.cnpjs = this.user['registerCNPJs'];
          this.spinnerService.hide();
        },
        error => {
          this.error = error.error.errorMessage;
          this.spinnerService.hide();
          this.showMsg(this.error);
        });
  }

  onChangeCompany(cnpj:RegisterCNPJ) {
    this.selectedOption = null;
    if (cnpj.category==3) {

        this.categorys =  [];
        if (cnpj.foot == true) {
           this.categorys.push({value: 0,  viewValue: 'Alimentos' });  
        }
        if (cnpj.cosmetic == true) {
          this.categorys.push({value: 1,  viewValue: 'Cosméticos' });  
        }
        if (cnpj.saneante == true) {
          this.categorys.push({value: 2,  viewValue: 'Saneantes' });  
        }

        this.options = null;
      
    } else {

        if (cnpj.category==0) {

            this.categorys = [{value: 0,  viewValue: 'Alimentos'}];
            this.options = null;

        } else if (cnpj.category==1) {

            this.categorys = [{value: 1,  viewValue: 'Cosméticos'}];
            this.options = null;

        } else if (cnpj.category==2) {

            this.categorys = [{value: 2,  viewValue: 'Saneantes'}];
            this.options = null;
        }
      }
      this.selected = cnpj;
      this.onChangeCategory();
      this.onChangeOption();
    }

    onChangeCategory() {
      
          if (this.selectedCategory==0) {
 
            this.options = null;
 
          } else if (this.selectedCategory==1) {
            
            this.options = [
              {value: 0,  viewValue: 'Produtos Registrados'},
              {value: 1,  viewValue: 'Produtos Notificados'},
              {value: 2,  viewValue: 'Produtos Regularizados'}
            ]
             
          } else if (this.selectedCategory==2) {
            this.options = [
              {value: 1,  viewValue: 'Registros Risco 1'},
              {value: 0,  viewValue: 'Registros Risco 2'}
            ]  
          }
    
    }

    onChangeOption() {
      
      if (this.selectedCategory==0) { // Alimentos só alimentos 
         
          this.options = null;
          return;

      } else if (this.selectedCategory==1) { // Cosméticos
        
        if (this.selectedOption == 0) { // Produtos registrados
          
        } else if (this.selectedOption == 1) { // Produtos notificados
          
        } else if (this.selectedOption == 2) { // Produtos Regularizados
          
        }
      } else if (this.selectedCategory==2) { // Saneantes
         
        if (this.selectedOption == 0) { // Produtos
          

         } else if (this.selectedOption == 1) { // Produtos Notificados
          
         }
      }
}

loadData() {
  
  if (this.selected != undefined )
      this.cnpj = this.selected.cnpj;
  
  if (this.selectedCategory != undefined)    
      this.category = this.selectedCategory;
  
  if (this.option != undefined)    
      this.option   = this.selected;

  this.queryRecordParameter = new QueryRecordLogParameter(
    this.cnpj,
    this.category,
    this.option,
    this.form.controls['dateStart'].value,
    this.form.controls['dateEnd'].value);


  this.spinnerService.show();
  this.dataService.getQueryLogRegisters(this.queryRecordParameter)
      .then(
          data => {
              this.data = data;
              this.parent.data = this.data;
              this.router.navigate(['/queryRecordLog/table-log'], { replaceUrl: false });
              this.spinnerService.hide();
          }).catch(
              error => {
                  this.error = error.error.errorMessage;
                  this.spinnerService.hide();
                  this.showMsg(this.error);

              });
}

  showMsg(message : string) : void {
    this.dialog.open(ErrorDialogComponent, {
      data: {errorMsg: message} ,width : '250px',height: '250px'
    });
  }
  
}
