import { Component, ElementRef, ViewChild, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { MatPaginator, MatTableDataSource, MatSort, MatDialog} from '@angular/material';

import { User } from '@app/user/user-model';
import { UserAddDialogComponent } from '@app/user/user-add/user-add.component';
import { UserEditDialogComponent } from '@app/user/user-edit/user-edit.component';
import { I18nService } from '@app/core';
import { UserService } from '@app/user/user.service';
import { ErrorDialogComponent } from '@app/core/message/error-dialog.component';


@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})



export class UserListComponent  {

  error: string;
  displayedColumns = ['fullName', 'userName', 'email', 'profile', 'active', 'actions'];
  ELEMENT_DATA: User[];

  isExpansionDetailRow = (i: number, row: any) =>
    row.hasOwnProperty('detailRow');
  constructor(public dialog: MatDialog,
    public dataService: UserService,
    public i18nService: I18nService,
    public changeDetectorRef: ChangeDetectorRef) {

  }

  isChecked: boolean = false;

  length = 100;
  pageSize = 10;
  pageSizeOptions = [5, 10, 25, 100];

  dataSource = new MatTableDataSource(this.ELEMENT_DATA);

  actives = [
    { value: true, viewValue: 'Sim' },
    { value: false, viewValue: 'Não' }
  ];

  receiveActivations = [
    { value: true, viewValue: 'Sim' },
    { value: false, viewValue: 'Não' }
  ];

  profiles = [
    '',
    'Administrador',
    'Operador'
  ];


  @ViewChild('paginator') paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild('filter') filter: ElementRef;

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

  ngOnInit() {
    this.loadData();
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

  addNew(user: User) {
    const dialogRef = this.dialog.open(UserAddDialogComponent, {
      data: { user: User },
      height: 'max-content',
      width: 'max-content'
    });

    dialogRef.afterClosed().subscribe(() => {

        // After dialog is closed we're doing frontend updates
        // For add we're just pushing a new row inside DataService
        this.loadData();
    });
    
  }

  startEdit(user:User) {
    let userEdit = user;//this.ELEMENT_DATA[i];
    console.log(JSON.stringify(userEdit));
    const dialogRef = this.dialog.open(UserEditDialogComponent, {
      data: userEdit,
      height: 'max-content+10px',
      width: 'max-content'
    });

    dialogRef.afterClosed().subscribe(() => {
         // After dialog is closed we're doing frontend updates
        // For add we're just pushing a new row inside DataService
        // this.dataSource.dataChange.value.push(this.dataService.getDialogData());
        //this.dataSource.refreshTable();
        //this.dataSource.data.push(this.dataService.getDialogData());
        //this.changeDetectorRef.detectChanges;
        this.loadData();
    });

  }

  deleteItem(user:User) {
    this.dataService.delete(user.id)
    .then(
      data => {
          
        this.loadData();
        this.showMsg("Registro excluido com sucesso!");
      },
      error => {
        this.error = error.error.errorMessage;
        this.showMsg(this.error);
      });

  }



  loadData() {
    this.dataService.getAllUsers(this.isChecked)
      .then(
        data => {
          this.ELEMENT_DATA = data;
          this.dataSource = new MatTableDataSource(this.ELEMENT_DATA);
          this.dataSource.sort      = this.sort;
          this.dataSource.paginator = this.paginator;
        },
        error => {
          this.error = error.error.errorMessage;
          this.showMsg(this.error);
        });

  }

  getActive(active: boolean): string {
    return active ? "Sim" : "Não";
  }

  getProfile(profile: number): string {
    return this.profiles[profile];
  }

  getReceiveActivation(active: boolean): string {
    return active ? "Sim" : "Não";
  }

  showMsg(msg: string): void {
    this.dialog.open(ErrorDialogComponent, {
      data: { errorMsg: msg }, width: '250px', height: '150px'
    });
  }

}
