import { Component } from "@angular/core";
import { TableComponent } from "@app/queryrecords/queryrecord-list/table/table-component";

@Component({
    selector: 'table-foot',
    templateUrl: './table-foot.html'
})
export class TableFootComponent extends TableComponent {
  
    displayedColumns       = ['product','register','process','company','situation','maturity'];
    
}