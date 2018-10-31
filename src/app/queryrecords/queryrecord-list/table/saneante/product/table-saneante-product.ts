import { Component, Inject, ViewChild, ElementRef, OnInit, ChangeDetectorRef, AfterViewInit } from "@angular/core";
import { TableComponent } from "@app/queryrecords/queryrecord-list/table/table-component";
import { MatTableDataSource, MatPaginator, MatSort, MatTableModule, MatDialog, Sort } from "@angular/material";
import { ActivatedRoute, Router } from "@angular/router";
import { Ng4LoadingSpinnerService } from "ng4-loading-spinner";
import * as XLSX from 'xlsx';
import { Content } from "@app/queryrecords/modelquery/content.model";
import { FilterService } from "@app/queryrecords/queryrecord-list/table/filter-service";
import { extend } from "webdriver-js-extender";
import { QueryrecordsService } from "@app/queryrecords/queryrecords.service";
import { ErrorDialogComponent } from "@app/core/message/error-dialog.component";
import { Location } from "@angular/common";
import { QueryRecordProcessParameter } from "@app/queryrecords/queryrecordprocessparameter.model";
import { FilterProcessService } from "@app/queryrecords/queryrecordprocess-list/process/filter-service-process";

@Component({
  selector: 'table-saneante-product',
  templateUrl: './table-saneante-product.html',
  styleUrls: ['./table-saneante-product.scss']
})
export class TableSaneanteProductComponent implements OnInit, AfterViewInit {

  ELEMENT_DATA: any[] = [];

  sortedData: any[];

  dataSource = new MatTableDataSource(this.ELEMENT_DATA);

  queryRecordProcessParameter: QueryRecordProcessParameter;

  data: any;

  error: string;

  displayedColumns = ['dataAlteracao', 'dataRegistro','qtdRegistro','product', 'register', 'process',  'situation', 'maturity']; //'company',

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild('paginator') paginator: MatPaginator;
  @ViewChild('filter') filter: ElementRef;
  @ViewChild('table') table: MatTableModule;


  constructor(private route: ActivatedRoute,
    public dialog: MatDialog,
    private router: Router,
    private _location: Location,
    public parent: FilterService,
    public parentProcess: FilterProcessService,
    public dataService: QueryrecordsService,
    public spinnerService: Ng4LoadingSpinnerService,
    private ref: ChangeDetectorRef) {

    this.sortedData = this.ELEMENT_DATA.slice();

  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

  ngOnInit() {

    this.sortedData = this.ELEMENT_DATA.slice();

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

  ngAfterViewInit() {

    this.ELEMENT_DATA = this.parent.data['content'];
    this.dataSource = new MatTableDataSource(this.ELEMENT_DATA);
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.dataSource._updatePaginator;

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
    var name = this.parent.user.userName + " " + date + time;
    XLSX.writeFile(workbook, name + '.xls', { bookType: 'xls', type: 'buffer' });
  }

  loadProcess(process: string) {
    this.queryRecordProcessParameter = new QueryRecordProcessParameter(null,
      null,
      process,
      null,
      null,
      null,
      null);

    this.spinnerService.show();
    this.dataService.getQueryProcessoRegisters(this.queryRecordProcessParameter)
      .then(
        data => {
          this.data = data;
          this.parentProcess.data = this.data;
          this.router.navigate(['/queryRecordProcess/table-process'], { replaceUrl: false });
          this.spinnerService.hide();
        }).catch(
          error => {
            this.error = error.error.errorMessage;
            this.spinnerService.hide();
            this.showMsg(this.error);

          });
  }
  getDetail(content: any) {
    this.spinnerService.show();
    this.parent.detail = content['saneanteProductDetail'];
    this.router.navigate(['queryRecord/detail-saneante-product'], { replaceUrl: false });
    this.spinnerService.hide();
    /*this.spinnerService.show();
      this.dataService.getQueryRegistersDetail(this.parent.category,this.parent.option,content.processo)
          .then(
              data => {
                  this.parent.detail = data['contentObject'];
                  this.router.navigate(['/queryRecord/detail-saneante-product'], { replaceUrl: false });
                  this.spinnerService.hide();
              }).catch(
                  error => {
                      this.error = error.error.errorMessage;
                      this.spinnerService.hide();
                      this.showMsg(this.error);

                  });*/

  }

  goBack() {
    this._location.back();
  }
  showMsg(message: string): void {
    this.dialog.open(ErrorDialogComponent, {
      data: { errorMsg: message }, width: '250px', height: '250px'
    });
  }
  sortData(sort: Sort) {
    const data = this.ELEMENT_DATA.slice();
    if (!sort.active || sort.direction === '') {
      this.sortedData = data;
      return;
    }

    //['product','register','process','company','situation','maturity'];
    this.sortedData = this.ELEMENT_DATA.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {

        case 'product': return compare(a['produto'], b['produto'], isAsc);
        case 'register': return compare(new Number(a['registro']), new Number(b['registro']), isAsc);
        case 'process': return compare(new Number(a['processo']), new Number(b['processo']), isAsc);
        case 'company': return compare(a['empresa'], b['empresa'], isAsc);
        case 'situation': return compare(a['situacao'], b['situacao'], isAsc);
        case 'maturity': {

          return compare(dateNumber(a['vencimento']), dateNumber(b['vencimento']), isAsc);
      }
      case 'dataAlteracao': {

          return compare(dateNumber(a['dataAlteracao']), dateNumber(b['dataAlteracao']), isAsc);
      }
      case 'dataRegistro': {

          return compare(dateNumber(a['dataRegistro']), dateNumber(b['dataRegistro']), isAsc);
      }
        case 'qtdRegistro': return compare(new Number(a['qtdRegistro']), new Number(b['qtdRegistro']),  isAsc);
        default: return 0;
      }
    });

    this.dataSource = new MatTableDataSource(this.sortedData);
    //this.dataSource.sort = this.sort;
    // this.dataSource.sortingDataAccessor = (data, header) => data[header];
    this.dataSource.paginator = this.paginator;
    this.dataSource._updatePaginator;

  }

}

function compare(a: any, b: any, isAsc: any) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}

function compareDate(a: Date, b: Date, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}

function dateNumber(strDate:string) {
   
  if (strDate && strDate != "") {
    
         let day:string = strDate.substring(0,2);
         let month:string = strDate.substring(3,5)
         let year:string = strDate.substring(6,10);
    
         return new Number(year+month+day)
 
    } else {
 
         return 0;
 
    }
 
 } 