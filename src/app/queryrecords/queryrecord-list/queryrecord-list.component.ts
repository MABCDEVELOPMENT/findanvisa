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
import { FilterFootComponent } from '@app/queryrecords/queryrecord-list/table/foot/filter-foot';
import { FilterService } from '@app/queryrecords/queryrecord-list/table/filter-service';


@Component({
  selector: 'app-queryrecord-list',
  templateUrl: './queryrecord-list.component.html',
  styleUrls: ['./queryrecord-list.component.scss']
})
export class QueryrecordListComponent implements OnInit, AfterViewInit {

  public cnpjMask = [ /\d/ , /\d/, '.', /\d/, /\d/, /\d/, '.', /\d/ , /\d/, /\d/, '/', /\d/, /\d/,/\d/, /\d/, '-', /\d/, /\d/,];
  
  error: string;
  

  
  displayedRegularized   = ['process','product','type','situation','maturity'];
  
  typeProduct = 0;

  ELEMENT_DATA: Content[];
  selected:RegisterCNPJ;
  cnpjs:RegisterCNPJ[];
  user:User;
  form: FormGroup;

  selectedOption:any;
  selectedCategory:any;

  categorys = [
    {value: 0,  viewValue: 'Alimentos'},
    {value: 1,  viewValue: 'Cosmeticos'},
    {value: 2,  viewValue: 'Saneantes'}
  ];

  options:any = [];

  constructor( public dialog: MatDialog,
               private router: Router,
               private spinnerService: Ng4LoadingSpinnerService,
               private filterService: FilterService,
               public dataService: QueryrecordsService,
               private authenticationService: AuthenticationService,
               public i18nService: I18nService) { 

  }

 
  @ViewChild('formFilter') formFilter: any;
  @ViewChild('table') table: any;

  ngOnInit() {
    this.createForm();
    this.loadUser();

  }

  ngAfterViewInit() {

  } 
  
  
  createForm() {
    this.form =  new FormGroup({
      company: new FormControl('',[Validators.required]),
      category: new FormControl('', [Validators.required]),
      option:new FormControl('', [Validators.required])
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

  onChangeCompany() {
    this.selectedOption = null;
    if (this.selected.category==3) {

        this.categorys =  [];
        if (this.selected.foot == true) {
           this.categorys.push({value: 0,  viewValue: 'Alimentos' });  
        }
        if (this.selected.cosmetic == true) {
          this.categorys.push({value: 1,  viewValue: 'Cosmeticos' });  
        }
        if (this.selected.saneante == true) {
          this.categorys.push({value: 2,  viewValue: 'Saneantes' });  
        }

        this.options = null;
      
    } else {

        if (this.selected.category==0) {

            this.categorys = [{value: 0,  viewValue: 'Alimentos'}];
            this.options = null;

        } else if (this.selected.category==1) {

            this.categorys = [{value: 1,  viewValue: 'Cosmeticos'}];
            this.options = null;

        } else if (this.selected.category==2) {

            this.categorys = [{value: 2,  viewValue: 'Saneantes'}];
            this.options = null;
        }
      }
      this.filterService.cnpj = this.selected.cnpj;
      this.onChangeCategory();
      this.onChangeOption();
    }

    onChangeCategory() {
      
          if (this.selectedCategory==0) {
 
            this.options = null;
            this.filterService.user = this.user;
            this.router.navigate(['/queryRecord/filter-foot'], { replaceUrl: false });
 
          } else if (this.selectedCategory==1) {
            
            this.options = [
              {value: 0,  viewValue: 'Produtos Registrados'},
              {value: 1,  viewValue: 'Produtos Notificados'},
              {value: 2,  viewValue: 'Produtos Regularizados'}
            ]
             
          } else if (this.selectedCategory==2) {
            this.options = [
              {value: 0,  viewValue: 'Risco 2'},
              {value: 1,  viewValue: 'Risco 1'}
            ]  
          }
          this.filterService.category = this.selectedCategory;
    }

    onChangeOption() {
      
      if (this.selectedCategory==0) { // Alimentos só alimentos 
         
          this.options = null;
          return;

      } else if (this.selectedCategory==1) { // Cosmeticos
        
        if (this.selectedOption == 0) { // Produtos registrados
          this.filterService.user = this.user;
          this.router.navigate(['/queryRecord/filter-cosmetic-register'], { replaceUrl: false });

        } else if (this.selectedOption == 1) { // Produtos notificados
          this.filterService.user = this.user;
          this.router.navigate(['/queryRecord/filter-cosmetic-notification'], { replaceUrl: false });          

        } else if (this.selectedOption == 2) { // Produtos Regularizados
          this.filterService.user = this.user;
          this.router.navigate(['/queryRecord/filter-cosmetic-regularized'], { replaceUrl: false });          

        }
      } else if (this.selectedCategory==2) { // Saneantes
         
        if (this.selectedOption == 0) { // Produtos
          this.filterService.user = this.user;
          this.router.navigate(['/queryRecord/filter-saneante-product'], { replaceUrl: false });

         } else if (this.selectedOption == 1) { // Produtos Notificados
          this.filterService.user = this.user;
          this.router.navigate(['/queryRecord/filter-saneante-notification'], { replaceUrl: false });

         }
      }
      this.filterService.option = this.selectedOption;
}

    

  showMsg(message : string) : void {
    this.dialog.open(ErrorDialogComponent, {
      data: {errorMsg: message} ,width : '250px',height: '250px'
    });
  }
  
}
