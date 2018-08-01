import { MatTableDataSource, MatSort, MatPaginator } from "@angular/material";
import { ViewChild, ElementRef, Component } from "@angular/core";
import { Content } from "@app/queryrecords/modelquery/content.model";

@Component({
  selector: 'table-component',
  templateUrl: './table-component.html'
})
export class TableComponent {
  
 
  ELEMENT_DATA: Content[];  

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
    
}