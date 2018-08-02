import { Component } from "@angular/core";
import { TableComponent } from "@app/queryrecords/queryrecord-list/table/table-component";
import { MatTableDataSource } from "@angular/material";

@Component({
    selector: 'table-foot',
    templateUrl: './table-foot.html'
})
export class TableFootComponent extends TableComponent {
  
    dataSource = new MatTableDataSource(this.ELEMENT_DATA);
    displayedColumns       = ['product','register','process','company','situation','maturity'];
    
}