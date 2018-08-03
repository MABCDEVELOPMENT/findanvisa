import { Component, Inject, ViewChild, ElementRef } from "@angular/core";
import { TableComponent } from "@app/queryrecords/queryrecord-list/table/table-component";
import { MatTableDataSource, MatPaginator, MatSort } from "@angular/material";
import { ActivatedRoute } from "@angular/router";
import { Ng4LoadingSpinnerService } from "ng4-loading-spinner";
import * as XLSX from 'xlsx';
import { Content } from "@app/queryrecords/modelquery/content.model";
import { FilterService } from "@app/queryrecords/queryrecord-list/table/filter-service";
import { extend } from "webdriver-js-extender";

@Component({
    selector: 'table-foot',
    templateUrl: './table-foot.html'
})
export class TableFootComponent  {

    ELEMENT_DATA: Content[];  

    dataSource = new MatTableDataSource(this.ELEMENT_DATA);
  
    data:any;

    displayedColumns       = ['product','register','process','company','situation','maturity'];
    
    @ViewChild(MatSort) sort: MatSort;
    @ViewChild('paginator') paginator: MatPaginator;
    @ViewChild('filter') filter: ElementRef;


    constructor(private route: ActivatedRoute,
        public parent: FilterService,
        public spinnerService: Ng4LoadingSpinnerService){

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

        this.ELEMENT_DATA = this.parent.data['content'];
        this.dataSource = new MatTableDataSource(this.ELEMENT_DATA);
        this.dataSource.sort      = this.sort;
        this.dataSource.paginator = this.paginator;
    
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
    
}