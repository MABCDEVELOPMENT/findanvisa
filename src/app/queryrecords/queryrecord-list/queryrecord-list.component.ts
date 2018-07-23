import { Component, ElementRef, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatPaginator,MatTableDataSource, MatSort, MatDialog, PageEvent } from '@angular/material';

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
import { Subject } from 'rxjs';
@Component({
  selector: 'app-queryrecord-list',
  templateUrl: './queryrecord-list.component.html',
  styleUrls: ['./queryrecord-list.component.scss']
})
export class QueryrecordListComponent implements OnInit {

  error: string;
  
  displayedColumns   = ['product','register','process','company','situation','maturity'];
  displayeNotify     = ['subject','process','transaction','officehour','product','company','situation','maturity'];

  isNotification = false;

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

  dataSource = new MatTableDataSource(this.ELEMENT_DATA);
  
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild('filter') filter: ElementRef;
  @ViewChild('TABLE') table: ElementRef;
  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

  ngOnInit() {
    this.createForm();
    this.dataSource.sort      = this.sort;
    this.dataSource.paginator = this.paginator;
    this.loadUser();

  }

  createForm() {
    this.form =  new FormGroup({
      company: new FormControl('',[Validators.required]),
      product: new FormControl('', [Validators.required]),
      process: new FormControl('', []),
      brand: new FormControl('', []),
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
    this.queryRecordParameter = new QueryRecordParameter(this.selected.cnpj,
                             this.form.controls.process.value,
                             this.form.controls.product.value,
                             this.form.controls.brand.value,
                             this.form.controls.category.value,
                             this.form.controls.option.value,null,0)
    this.dataService.getQueryRegisters(this.queryRecordParameter)
    .then(
      data => {
        this.ELEMENT_DATA = data.content;
        this.dataSource = new MatTableDataSource(this.ELEMENT_DATA);
      },
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
    }

    onChangeCategory() {
      
          if (this.selectedCategory==0) {
              this.options = null;
              this.isNotification = false;
              this.dataSource = null;
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
          this.isNotification = false;
          this.dataSource = null;

      } else if (this.selectedCategory==1) { // 
        
         this.options = [
          {value: 0,  viewValue: 'Produtos Registrados'},
          {value: 1,  viewValue: 'Produtos Notificados'},
          {value: 2,  viewValue: 'Produtos Regularizados'}
        ]
         
      } else if (this.selectedCategory==2) {
         if (this.selectedOption == 0) {
            this.dataSource = null;
            this.isNotification = false;
         } else if (this.selectedOption == 1) {
            this.dataSource = null;
            this.isNotification = true;
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
      var name = this.user.userName+"_"+ date + time;
      XLSX.writeFile(workbook, name+'.xls', { bookType: 'xls', type: 'buffer' });
   }

  showMsg(message : string) : void {
    this.dialog.open(ErrorDialogComponent, {
      data: {errorMsg: message} ,width : '250px',height: '250px'
    });
  }
  
}
