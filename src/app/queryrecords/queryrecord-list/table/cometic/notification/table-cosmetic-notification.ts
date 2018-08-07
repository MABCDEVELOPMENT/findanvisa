import { Component, ViewChild, ElementRef, ChangeDetectorRef, OnInit, AfterViewInit } from "@angular/core";
import { MatTableDataSource, MatSort, MatPaginator, MatTableModule, MatDialog } from "@angular/material";
import { Content } from "@app/queryrecords/modelquery/content.model";
import { ActivatedRoute } from "@angular/router";
import { FilterService } from "@app/queryrecords/queryrecord-list/table/filter-service";
import { Ng4LoadingSpinnerService } from "ng4-loading-spinner";
import * as XLSX from 'xlsx';
import { Alert } from "selenium-webdriver";
import { ErrorDialogComponent } from "@app/core/message/error-dialog.component";

@Component({
    selector: 'table-cosmetic-retister',
    templateUrl: './table-cosmetic-register.html',
    styleUrls:['./table-cosmetic-register.scss']
    
})
export class TableCosmeticNotificationComponent implements OnInit, AfterViewInit {
  
    ELEMENT_DATA: Content[];  

    dataSource = new MatTableDataSource(this.ELEMENT_DATA);
  
    data:any;

    displayedColumns = ['subject','process','officehour','transaction','product','company','situation','maturity','statusMaturity'];
   
    @ViewChild(MatSort) sort: MatSort;
    @ViewChild('paginator') paginator: MatPaginator;
    @ViewChild('filter') filter: ElementRef;
    @ViewChild('table') table: MatTableModule;


    constructor(public dialog: MatDialog,
        private route: ActivatedRoute,
        public parent: FilterService,
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
          var name = " "+ date + time;
          // this.user.userName+" "+this.selected.fullName+
          XLSX.writeFile(workbook, name+'.xls', { bookType: 'xls', type: 'buffer' });
       }

       getRecord(row:any) {
           this.showMsg(row.cnpj);
       }

       showMsg(message: string): void {
        this.dialog.open(ErrorDialogComponent, {
            data: { errorMsg: message }, width: '250px', height: '250px'
        });

    }

}