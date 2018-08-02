import { Component } from "@angular/core";
import { TableComponent } from "@app/queryrecords/queryrecord-list/table/table-component";
import { MatTableDataSource } from "@angular/material";

@Component({
    selector: 'table-cosmetic-retister',
    templateUrl: './table-cosmetic-register.html'
})
export class TableCosmeticRegisterComponent extends TableComponent {
  
    dataSource = new MatTableDataSource(this.ELEMENT_DATA);
    displayedColumns = ['subject','process','officehour','transaction','product','company','situation','maturity','statusMaturity'];
   

}