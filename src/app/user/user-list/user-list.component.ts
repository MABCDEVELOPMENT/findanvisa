import { Component, ElementRef, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatPaginator,MatTableDataSource, MatSort, MatDialog, PageEvent } from '@angular/material';

import { User } from '@app/user/user-model';
import { UserAddDialogComponent } from '@app/user/user-add/user-add.component';
import { UserEditDialogComponent } from '@app/user/user-edit/user-edit.component';
import { I18nService } from '@app/core';
import { UserService } from '@app/user/user.service';
import { HttpErrorResponse } from '@angular/common/http';


@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})



export class UserListComponent implements AfterViewInit {
  
  error: HttpErrorResponse;
  displayedColumns = ['id', 'fullName', 'userName', 'email', 'actions'];
  ELEMENT_DATA: User[]; /* = [
    new User(1,  'Afred', 'ALESSANDRO FRED A DE SOUZA', 'fredalessandro@gmail.com', '81984147601', new Date('10/10/1971'), 'idkfa',true, null, new Date(),null,null),
    new User(2,  'Mary', 'JOZE MARY OLIVEIRA MASCARENHAS', 'marymascarenhas86@gmail.com', '81988186507', new Date('22/02/1989'), '100422',true, null, new Date(),null,null),
    new User(1,  'Afred', 'ALESSANDRO FRED A DE SOUZA', 'fredalessandro@gmail.com', '81984147601', new Date('27/10/1971'), 'idkfa',true, null, new Date(),null,null),
    new User(2,  'Mary', 'JOZE MARY OLIVEIRA MASCARENHAS', 'marymascarenhas86@gmail.com', '81988186507', new Date('22/02/1989'), '100422',true, null, new Date(),null,null),
    new User(1,  'Afred', 'ALESSANDRO FRED A DE SOUZA', 'fredalessandro@gmail.com', '81984147601', new Date('27/10/1971'), 'idkfa',true, null, new Date(),null,null),
    new User(2,  'Mary', 'JOZE MARY OLIVEIRA MASCARENHAS', 'marymascarenhas86@gmail.com', '81988186507', new Date('22/02/1989'), '100422',true, null, new Date(),null,null),
    new User(1,  'Afred', 'ALESSANDRO FRED A DE SOUZA', 'fredalessandro@gmail.com', '81984147601', new Date('27/10/1971'), 'idkfa',true, null, new Date(),null,null),
    new User(2,  'Mary', 'JOZE MARY OLIVEIRA MASCARENHAS', 'marymascarenhas86@gmail.com', '81988186507', new Date('22/02/1989'), '100422',true, null, new Date(),null,null),
    new User(1,  'Afred', 'ALESSANDRO FRED A DE SOUZA', 'fredalessandro@gmail.com', '81984147601', new Date('27/10/1971'), 'idkfa',true, null, new Date(),null,null),
    new User(2,  'Mary', 'JOZE MARY OLIVEIRA MASCARENHAS', 'marymascarenhas86@gmail.com', '81988186507', new Date('22/02/1989'), '100422',true, null, new Date(),null,null),
    new User(1,  'Afred', 'ALESSANDRO FRED A DE SOUZA', 'fredalessandro@gmail.com', '81984147601', new Date('27/10/1971'), 'idkfa',true, null, new Date(),null,null),
    new User(2,  'Mary', 'JOZE MARY OLIVEIRA MASCARENHAS', 'marymascarenhas86@gmail.com', '81988186507', new Date('22/02/1989'), '100422',true, null, new Date(),null,null),
    new User(1,  'Afred', 'ALESSANDRO FRED A DE SOUZA', 'fredalessandro@gmail.com', '81984147601', new Date('27/10/1971'), 'idkfa',true, null, new Date(),null,null),
    new User(2,  'Mary', 'JOZE MARY OLIVEIRA MASCARENHAS', 'marymascarenhas86@gmail.com', '81988186507', new Date('22/02/1989'), '100422',true, null, new Date(),null,null),
    new User(1,  'Afred', 'ALESSANDRO FRED A DE SOUZA', 'fredalessandro@gmail.com', '81984147601', new Date('27/10/1971'), 'idkfa',true, null, new Date(),null,null),
    new User(2,  'Mary', 'JOZE MARY OLIVEIRA MASCARENHAS', 'marymascarenhas86@gmail.com', '81988186507', new Date('22/02/1989'), '100422',true, null, new Date(),null,null),
    new User(1,  'Afred', 'ALESSANDRO FRED A DE SOUZA', 'fredalessandro@gmail.com', '81984147601', new Date('27/10/1971'), 'idkfa',true, null, new Date(),null,null),
    new User(2,  'Mary', 'JOZE MARY OLIVEIRA MASCARENHAS', 'marymascarenhas86@gmail.com', '81988186507', new Date('22/02/1989'), '100422',true, null, new Date(),null,null),
    new User(1,  'Afred', 'ALESSANDRO FRED A DE SOUZA', 'fredalessandro@gmail.com', '81984147601', new Date('27/10/1971'), 'idkfa',true, null, new Date(),null,null),
    new User(2,  'Mary', 'JOZE MARY OLIVEIRA MASCARENHAS', 'marymascarenhas86@gmail.com', '81988186507', new Date('22/02/1989'), '100422',true, null, new Date(),null,null),
    new User(1,  'Afred', 'ALESSANDRO FRED A DE SOUZA', 'fredalessandro@gmail.com', '81984147601', new Date('27/10/1971'), 'idkfa',true, null, new Date(),null,null),
    new User(2,  'Mary', 'JOZE MARY OLIVEIRA MASCARENHAS', 'marymascarenhas86@gmail.com', '81988186507', new Date('22/02/1989'), '100422',true, null, new Date(),null,null),
    new User(1,  'Afred', 'ALESSANDRO FRED A DE SOUZA', 'fredalessandro@gmail.com', '81984147601', new Date('27/10/1971'), 'idkfa',true, null, new Date(),null,null),
    new User(2,  'Mary', 'JOZE MARY OLIVEIRA MASCARENHAS', 'marymascarenhas86@gmail.com', '81988186507', new Date('22/02/1989'), '100422',true, null, new Date(),null,null)
  ]; */
  isExpansionDetailRow = (i: number, row: any) => 
  row.hasOwnProperty('detailRow');
  constructor( public dialog: MatDialog,
               public dataService: UserService,
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

  addNew(user: User) {
    const dialogRef = this.dialog.open(UserAddDialogComponent, {data: {user: User},
      height: 'auto',
      width: '600px'
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
    let userEdit = this.ELEMENT_DATA[i];
    console.log(JSON.stringify(userEdit));
    const dialogRef = this.dialog.open(UserEditDialogComponent, {data:userEdit 
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

  deleteItem(i: number, id: number, title: string, state: string, url: string) {
    
  }


 
  public loadData() {

      this.dataService.getAllUsers()
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
