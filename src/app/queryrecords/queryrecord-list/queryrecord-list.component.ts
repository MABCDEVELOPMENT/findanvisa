import { Component, ElementRef, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatPaginator,MatTableDataSource, MatSort, MatDialog, PageEvent, MatSidenav } from '@angular/material';

import { I18nService, AuthenticationService } from '@app/core';
import { Queryrecords} from '../queryrecords.model';
import { QueryrecordsService } from '../queryrecords.service';
import { RegisterCNPJ } from '@app/cnpj/cnpj-model';
import { User } from '@app/user/user-model';
import { ErrorDialogComponent } from '@app/core/message/error-dialog.component';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { QueryRecordParameter } from '@app/queryrecords/queryrecordparameter.model';
import { Content } from '@app/queryrecords/modelquery/content.model';
import * as XLSX from 'xlsx';

import { TableComponent } from '@app/queryrecords/queryrecord-list/table/table-component';
import { TableFootComponent } from '@app/queryrecords/queryrecord-list/table/foot/table-foot'
import { FilterFootComponent } from '@app/queryrecords/queryrecord-list/table/foot/filter-foot';

@Component({
  selector: 'app-queryrecord-list',
  templateUrl: './queryrecord-list.component.html',
  styleUrls: ['./queryrecord-list.component.scss']
})
export class QueryrecordListComponent implements OnInit, AfterViewInit {

  public cnpjMask = [ /\d/ , /\d/, '.', /\d/, /\d/, /\d/, '.', /\d/ , /\d/, /\d/, '/', /\d/, /\d/,/\d/, /\d/, '-', /\d/, /\d/,];
  
  error: string;
  

  displayeNotify         = ['subject','process','transaction','officehour','product','company','situation','maturity','statusMaturity'];
  displayedRegularized   = ['process','product','type','situation','maturity'];
  
  typeProduct = 0;

  ELEMENT_DATA: Content[];
  selected:RegisterCNPJ;
  cnpjs:RegisterCNPJ[];
  user:User;
  form: FormGroup;
  queryRecordParameter:QueryRecordParameter;
  selectedOption:any;
  selectedCategory:any;

  categorys = [
    {value: 0,  viewValue: 'Alimentos'},
    {value: 1,  viewValue: 'Cosmeticos'},
    {value: 2,  viewValue: 'Saneantes'}
  ];

  options:any = [];

  constructor( public dialog: MatDialog,
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
    this.authenticationService.loadUser(null)
      .then(
        data => {
          this.user = data;
          this.cnpjs = this.user['registerCNPJs'];
        },
        error => {
          this.error = error.error.errorMessage;
          this.showMsg(this.error);
        });
  }

  loadData() {

    if (this.formFilter instanceof FilterFootComponent) {
      this.queryRecordParameter = new QueryRecordParameter(this.selected.cnpj,
        this.formFilter.formFilter.controls.process.value,
        this.formFilter.formFilter.controls.product.value,
        this.formFilter.formFilter.controls.brand.value,
        this.form.controls.category.value,
        this.form.controls.option.value,
        this.formFilter.formFilter.controls.numberRegister.value,0)

    }
    this.dataService.getQueryRegisters(this.queryRecordParameter)
    .then(
      data => {
        this.table.ELEMENT_DATA = data.content;
        this.table.dataSource = new MatTableDataSource(this.ELEMENT_DATA);
        this.table.dataSource.sort      = this.table.sort;
        this.table.dataSource.paginator = this.table.paginator;
      }).catch(
      error => {
        this.error = error.error.errorMessage;
        this.showMsg(this.error);
      });
  }
  
  onChangeCompany() {
    
    if (this.selected.category==3) {

        this.categorys = [
          {value: 0,  viewValue: 'Alimentos'},
          {value: 1,  viewValue: 'Cosmeticos'},
          {value: 2,  viewValue: 'Saneantes'}
        ];

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
      this.onChangeCategory();
      this.onChangeOption();
    }

    onChangeCategory() {
      
          if (this.selectedCategory==0) {
              this.options = null;
              this.typeProduct = 0;
              this.table.dataSource = null;
          } else if (this.selectedCategory==1) {
            
            this.options = [
              {value: 0,  viewValue: 'Produtos Registrados'},
              {value: 1,  viewValue: 'Produtos Notificados'},
              {value: 2,  viewValue: 'Produtos Regularizados'}
            ]
             
          } else if (this.selectedCategory==2) {
            this.options = [
              {value: 0,  viewValue: 'Produtos'},
              {value: 1,  viewValue: 'Produtos Notificados'}
            ]  
          }

    }

    onChangeOption() {
      
      if (this.selectedCategory==0) { // Alimentos só alimentos 
         
          this.options = null;
          this.typeProduct = 0;
          this.table.dataSource = null;

      } else if (this.selectedCategory==1) { // Cosmeticos
        
        if (this.selectedOption == 0) { // Produtos registrados

          this.table.dataSource = null;
          this.typeProduct = 1;

        } else if (this.selectedOption == 1) { // Produtos notificados

          this.table.dataSource = null;
          this.typeProduct = 1;

        } else if (this.selectedOption == 2) { // Produtos Regularizados

          this.table.dataSource = null;
          this.typeProduct = 2;

        }
      } else if (this.selectedCategory==2) { // Saneantes
         if (this.selectedOption == 0) { // Produtos
            this.table.dataSource = null;
            this.typeProduct = 0;
         } else if (this.selectedOption == 1) { // Produtos Notificados
            this.table.dataSource = null;
            this.typeProduct = 1;
         }
      }

}

    exportAsExcel(){
      this.exportExcel(this.ELEMENT_DATA);
    }
    exportExcel(data: any[]){
      const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(data);
      const workbook: XLSX.WorkBook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
      var today = new Date();
      var date = today.getFullYear() + '' + (today.getMonth() + 1) + '' + today.getDate();
      var time = today.getHours() + "-" + today.getMinutes() + "-" + today.getSeconds();
      var name = this.user.userName+" "+this.selected.fullName+" "+ date + time;

      XLSX.writeFile(workbook, name+'.xls', { bookType: 'xls', type: 'buffer' });
   }

  showMsg(message : string) : void {
    this.dialog.open(ErrorDialogComponent, {
      data: {errorMsg: message} ,width : '250px',height: '250px'
    });
  }
  
}
