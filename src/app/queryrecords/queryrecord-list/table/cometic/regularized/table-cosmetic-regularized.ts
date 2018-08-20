import { Component, ViewChild, ElementRef, OnInit, ChangeDetectorRef, AfterViewInit } from "@angular/core";
import { MatTableDataSource, MatPaginator, MatSort, MatTableModule, MatDialog } from "@angular/material";
import { ActivatedRoute, Router } from "@angular/router";
import { Ng4LoadingSpinnerService } from "ng4-loading-spinner";
import * as XLSX from 'xlsx';
import { Content } from "@app/queryrecords/modelquery/content.model";
import { FilterService } from "@app/queryrecords/queryrecord-list/table/filter-service";
import { QueryrecordsService } from "@app/queryrecords/queryrecords.service";
import { Location } from "@angular/common";
import { ErrorDialogComponent } from "@app/core/message/error-dialog.component";

@Component({
    selector: 'table-cosmetic-regularized',
    templateUrl: './table-cosmetic-regularized.html',
    styleUrls:['./table-cosmetic-regularized.scss']
})
export class TableCosmeticRegularizedComponent implements OnInit,AfterViewInit  {

    ELEMENT_DATA: Content[];  

    dataSource = new MatTableDataSource(this.ELEMENT_DATA);
  
    data: any;

    error: string;

    displayedColumns       = ['process','product','type','situation','maturity'];
    
    @ViewChild(MatSort) sort: MatSort;
    @ViewChild('paginator') paginator: MatPaginator;
    @ViewChild('filter') filter: ElementRef;
    @ViewChild('table') table: MatTableModule;


    constructor(public dialog: MatDialog,
        private route: ActivatedRoute,
        public parent: FilterService,
        private _location: Location,
        private router: Router,
        public dataService: QueryrecordsService,
        public spinnerService: Ng4LoadingSpinnerService,
        private ref: ChangeDetectorRef){

    }
  
    applyFilter(filterValue: string) {
      filterValue = filterValue.trim(); // Remove whitespace
      filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
      this.dataSource.filter = filterValue;
    }

    ngOnInit() {

        this.dataSource.filterPredicate = (data: any, filtersJson: string) => {
          const matchFilter:any = [];
          const filters = JSON.parse(filtersJson);
    
          filters.forEach((filter:any) => {
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
        this.dataSource.sort      = this.sort;
        this.dataSource.paginator = this.paginator;
        this.dataSource._updatePaginator;

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
        var name = this.parent.user.userName+" "+ date + time;
        // this.user.userName+" "+this.selected.fullName+
        XLSX.writeFile(workbook, name+'.xls', { bookType: 'xls', type: 'buffer' });
     }

     showMsg(message: string): void {
      this.dialog.open(ErrorDialogComponent, {
          data: { errorMsg: message }, width: '250px', height: '250px'
      });

     }
     getDetail(content: any) {

      this.spinnerService.show();
      this.dataService.getQueryRegistersDetail(this.parent.category, this.parent.option, content.processo)
          .then(
              data => {
                  this.parent.detail = data['contentObject'];
                  this.router.navigate(['/queryRecord/detail-cosmetic-regularized'], { replaceUrl: false });
                  this.spinnerService.hide();
              }).catch(
                  error => {
                      this.error = error.error.errorMessage;
                      this.spinnerService.hide();
                      this.showMsg(this.error);

                  });

  }
  goBack() {
      this._location.back();
  }
    
}