import { Component, ElementRef, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatPaginator, MatTableDataSource, MatSort, MatDialog, PageEvent } from '@angular/material';

import { I18nService, AuthenticationService } from '@app/core';
import { Queryrecords } from '../queryrecords.model';
import { QueryrecordsService } from '../queryrecords.service';
import { RegisterCNPJ } from '@app/cnpj/cnpj-model';
import { User } from '@app/user/user-model';
import { ErrorDialogComponent } from '@app/core/message/error-dialog.component';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { QueryRecordParameter } from '@app/queryrecords/queryrecordparameter.model';
import { Content } from '@app/queryrecords/modelquery/content.model';
import * as XLSX from 'xlsx';
import { Subject } from 'rxjs';
import { QueryRecordProcessParameter } from '@app/queryrecords/queryrecordprocessparameter.model';
@Component({
  selector: 'app-queryrecord-process-list',
  templateUrl: './queryrecordprocess-list.component.html',
  styleUrls: ['./queryrecordprocess-list.component.scss']
})
export class QueryrecordprocessListComponent implements OnInit {

  error: string;

  displayedColumns = ['order', 'cnpj', 'socialName', 'process', 'subject'];


  typeProduct = 0;

  ELEMENT_DATA: Content[];
  selected: RegisterCNPJ;
  cnpjs: RegisterCNPJ[];
  user: User;
  areas: any;
  form: FormGroup;
  queryRecordProcessParameter: any;



  constructor(public dialog: MatDialog,
    public dataService: QueryrecordsService,
    private authenticationService: AuthenticationService,
    public i18nService: I18nService) {

  }

  dataSource = new MatTableDataSource(this.ELEMENT_DATA);

  @ViewChild('paginator') paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild('filter') filter: ElementRef;
  @ViewChild('table') table: ElementRef;

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

  ngOnInit() {
    this.createForm();
    this.loadUser();
    this.loadAreas();
    this.dataSource.filterPredicate = (data: any, filtersJson: string) => {
      const matchFilter: any = [];
      const filters = JSON.parse(filtersJson);

      filters.forEach((filter: any) => {
        // check for null values!
        const val = data[filter.id] === null ? '' : data[filter.id];
        matchFilter.push(val.toLowerCase().includes(filter.value.toLowerCase()));
      });

      // Choose one
      return matchFilter.every(Boolean); // AND condition
      // return matchFilter.some(Boolean); // OR condition
    }

  }

  createForm() {
    this.form = new FormGroup({
      company: new FormControl('', [Validators.required]),
      area: new FormControl('', []),
      process: new FormControl('', []),
      transaction: new FormControl('', []),
      protocol: new FormControl('', []),
      officehour: new FormControl('', []),
      knowledge: new FormControl('', [])
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
        }).catch(
          error => {
          this.error = error.error.errorMessage;
          this.showMsg(this.error);
        });
  }

  loadData() {
    this.queryRecordProcessParameter = new QueryRecordProcessParameter(this.selected.cnpj,
      this.form.controls.area.value,
      this.form.controls.process.value,
      this.form.controls.transaction.value,
      this.form.controls.protocol.value,
      this.form.controls.officehour.value,
      this.form.controls.knowledge.value)

    this.dataService.getQueryProcessoRegisters(this.queryRecordProcessParameter)
      .then(
        data => {
          this.ELEMENT_DATA = data.content;
          this.dataSource = new MatTableDataSource(this.ELEMENT_DATA);
          this.dataSource.sort = this.sort;
          this.dataSource.paginator = this.paginator;
        },
        error => {
          this.error = error.error.errorMessage;
          this.showMsg(this.error);
        });
  }

  loadAreas() {
    this.dataService.getQueryAreas()
      .then(
        data => {
          this.areas = data;
        },
        error => {
          this.error = error.error.errorMessage;
          this.showMsg(this.error);
        });
  }

  exportAsExcel() {
    this.exportExcel(this.ELEMENT_DATA);
  }
  exportExcel(data: any[]) {
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(data);
    const workbook: XLSX.WorkBook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
    var today = new Date();
    var date = today.getFullYear() + '' + (today.getMonth() + 1) + '' + today.getDate();
    var time = today.getHours() + "-" + today.getMinutes() + "-" + today.getSeconds();
    var name = this.user.userName + " " + this.selected.fullName + " " + date + time;

    XLSX.writeFile(workbook, name + '.xls', { bookType: 'xls', type: 'buffer' });
  }

  showMsg(message: string): void {
    this.dialog.open(ErrorDialogComponent, {
      data: { errorMsg: message }, width: '250px', height: '250px'
    });
  }

}
