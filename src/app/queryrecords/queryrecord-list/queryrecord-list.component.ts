import { Component, ElementRef, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatPaginator,MatTableDataSource, MatSort, MatDialog, PageEvent } from '@angular/material';

import { I18nService, AuthenticationService } from '@app/core';
import { Queryrecords} from '../queryrecords.model';
import { QueryrecordsService } from '../queryrecords.service';
import { HttpErrorResponse } from '@angular/common/http';
import { RegisterCNPJ } from '@app/cnpj/cnpj-model';

@Component({
  selector: 'app-queryrecord-list',
  templateUrl: './queryrecord-list.component.html',
  styleUrls: ['./queryrecord-list.component.scss']
})
export class QueryrecordListComponent implements OnInit {

  error: HttpErrorResponse;
  displayedColumns = ['subjectMatter', 'process', 'year', 'transaction', 'product', 'company', 'situation'];
  ELEMENT_DATA: Queryrecords[];
  selectedOptions:RegisterCNPJ;
  cnpjs:RegisterCNPJ[];

  constructor( public dataService: QueryrecordsService,
               public i18nService: I18nService) { 

  }

  dataSource = new MatTableDataSource(this.ELEMENT_DATA);
  
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild('filter') filter: ElementRef;

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

  ngOnInit() {
    this.loadData(this.selectedOptions);
    this.dataSource.sort      = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  public loadData(selectedOptions:RegisterCNPJ) {
    
    // this.dataService.getRegisterCNPJ(selectedOptions)
    //                 .subscribe(
    //                   data => {
    //                     this.ELEMENT_DATA = data;
    //                     this.dataSource = new MatTableDataSource(this.ELEMENT_DATA);
    //                   },
    //                   error => {
    //                     this.error = error;
    //                     alert(error); 
    //                   });
  
  } 
}
