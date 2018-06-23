import { Component, ElementRef, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatPaginator,MatTableDataSource, MatSort, MatDialog, PageEvent } from '@angular/material';

import { CNPJ } from '@app/cnpj/cnpj-model';
import { CNPJAddDialogComponent } from '@app/cnpj/cnpj-add/cnpj-add.component';
import { CNPJEditDialogComponent } from '@app/cnpj/cnpj-edit/cnpj-edit.component';
import { I18nService } from '@app/core';
import { CNPJService } from '@app/cnpj/cnpj.service';
import { HttpErrorResponse } from '@angular/common/http';


@Component({
  selector: 'app-cnpj-list',
  templateUrl: './cnpj-list.component.html',
  styleUrls: ['./cnpj-list.component.scss']
})



export class CNPJListComponent implements AfterViewInit {
  
  error: HttpErrorResponse;
  displayedColumns = ['id', 'fullName', 'cnpj', 'active', 'actions'];
  ELEMENT_DATA: CNPJ[]; 

  isExpansionDetailRow = (i: number, row: any) => 
  row.hasOwnProperty('detailRow');
  constructor( public dialog: MatDialog,
               public dataService: CNPJService,
               public i18nService: I18nService) { 

  }

  length = 100;
  pageSize = 10;
  pageSizeOptions = [5, 10, 25, 100];

  dataSource = new MatTableDataSource(this.ELEMENT_DATA);
  
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild('filter') filter: ElementRef;

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

  ngAfterViewInit() {
    this.loadData();
    this.dataSource.sort      = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  addNew(cnpj: CNPJ) {
    const dialogRef = this.dialog.open(CNPJAddDialogComponent, {data: {cnpj: CNPJ},
      height: 'max-content',
      width: 'max-content'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 1) {
        // After dialog is closed we're doing frontend updates
        // For add we're just pushing a new row inside DataService
        // this.dataSource.dataChange.value.push(this.dataService.getDialogData());
        //this.refreshTable();
      }
    });
  }

  startEdit(i: number) {
    let cnpjEdit = this.ELEMENT_DATA[i];
    console.log(JSON.stringify(cnpjEdit));
    const dialogRef = this.dialog.open(CNPJEditDialogComponent, {data:cnpjEdit,
      height: 'max-content+10px',
      width: 'max-content'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 1) {
        // After dialog is closed we're doing frontend updates
        // For add we're just pushing a new row inside DataService
        // this.dataSource.dataChange.value.push(this.dataService.getDialogData());
        //this.dataSource.refreshTable();
      }
    });
  }

  deleteItem(i: number, id: number, title: string, state: string, url: string) {
    
  }


 
  public loadData() {

      this.dataService.getAllCNPJs()
                      .subscribe(
                        data => {
                          this.ELEMENT_DATA = data;
                          this.dataSource = new MatTableDataSource(this.ELEMENT_DATA);
                        },
                        error => {
                          this.error = error;
                          alert(error); 
                        });
    
  } 
    
 
      
    


}
