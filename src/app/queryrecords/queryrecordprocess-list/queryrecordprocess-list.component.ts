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
import { FilterService } from '@app/queryrecords/queryrecord-list/table/filter-service';
import { Observable } from 'rxjs';
import { map,startWith } from 'rxjs/operators';
import { FilterProcessService } from '@app/queryrecords/queryrecordprocess-list/process/filter-service-process';


@Component({
  selector: 'app-queryrecordprocess-list',
  templateUrl: './queryrecordprocess-list.component.html',
  styleUrls: ['./queryrecordprocess-list.component.scss']
})
export class QueryrecordprocessListComponent implements OnInit, AfterViewInit {

  public cnpjMask = [ /\d/ , /\d/, '.', /\d/, /\d/, /\d/, '.', /\d/ , /\d/, /\d/, '/', /\d/, /\d/,/\d/, /\d/, '-', /\d/, /\d/,];
  
  error: string;
  

  
  displayedRegularized   = ['process','product','type','situation','maturity'];
  
  typeProduct = 0;

  ELEMENT_DATA: Content[];
  selected:RegisterCNPJ;
  cnpjs:RegisterCNPJ[];
  filteredOptions: Observable<RegisterCNPJ[]>;
  
  user:User;
  form: FormGroup;

  selectedOption:any;
  selectedCategory:any;

  categorys = [
    {value: 0,  viewValue: 'Alimentos'},
    {value: 1,  viewValue: 'Cosmeticos'},
    {value: 2,  viewValue: 'Saneantes'}
  ];

  constructor( public dialog: MatDialog,
               private router: Router,
               private spinnerService: Ng4LoadingSpinnerService,
               private filterService: FilterProcessService,
               public dataService: QueryrecordsService,
               private authenticationService: AuthenticationService,
               public i18nService: I18nService) { 

  }

 
  @ViewChild('formFilter') formFilter: any;
  @ViewChild('table') table: any;

  ngOnInit() {
    this.createForm();
    this.filteredOptions = this.form.get('company').valueChanges
      .pipe(
        startWith(''),
        map(value => this._filter(value))
      );
  }
  
  private _filter(value: string): RegisterCNPJ[] {
    
    const filterValue = value.toLowerCase();
    if (this.cnpjs) {
      return this.cnpjs.filter(option => option.fullName.toLowerCase().includes(filterValue));
    }
  }

  ngAfterViewInit() {
    this.loadUser();
  } 
  
  
  createForm() {
    this.form =  new FormGroup({
      company: new FormControl('',[Validators.required])
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
      
      this.filterService.cnpj = cnpj.cnpj; 
      this.filterService.user = this.user;
      this.router.navigate(['/queryRecordProcess/filter-process'], { replaceUrl: false });

  }

    

    

  showMsg(message : string) : void {
    this.dialog.open(ErrorDialogComponent, {
      data: {errorMsg: message} ,width : '250px',height: '250px'
    });
  }
  
}
