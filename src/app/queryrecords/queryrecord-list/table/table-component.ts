import { MatTableDataSource, MatSort, MatPaginator } from "@angular/material";
import { ViewChild, ElementRef, Component } from "@angular/core";
import { Content } from "@app/queryrecords/modelquery/content.model";
import { ActivatedRoute } from "@angular/router";
import { QueryRecordParameter } from "@app/queryrecords/queryrecordparameter.model";
import * as XLSX from 'xlsx';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { FilterService } from "@app/queryrecords/queryrecord-list/table/filter-service";

@Component({
  selector: 'table-component',
  templateUrl: './table-component.html'
})
export class TableComponent {
  
 
  ELEMENT_DATA: Content[];  

  dataSource = new MatTableDataSource(this.ELEMENT_DATA);

  data:any;

  
  
  @ViewChild('paginator') paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild('filter') filter: ElementRef;
  @ViewChild('table') table: ElementRef;

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }
 
  constructor(private route: ActivatedRoute,
              public parent: FilterService,
              public spinnerService: Ng4LoadingSpinnerService){

  }
  ngOnInit() {

    this.ELEMENT_DATA = this.parent.data['content'];
        this.dataSource = new MatTableDataSource(this.ELEMENT_DATA);
        this.dataSource.sort      = this.sort;
        //this.dataSource.paginator = this.paginator;

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