import {MAT_DIALOG_DATA, MatDialogRef, MatDialog, MatTableDataSource, MatPaginator, MatSort, MatDialogConfig} from '@angular/material';
import {Component, Inject, OnInit, ElementRef,  ViewChild } from '@angular/core';
import {CNPJService} from '../../cnpj/cnpj.service';
import {FormGroup, FormControl} from '@angular/forms';
import { RegisterCNPJ } from '@app/cnpj/cnpj-model';
import { I18nService } from '@app/core';
import { UserService } from '@app/user/user.service';
import { ErrorDialogComponent } from '@app/core/message/error-dialog.component';
import { SelectionModel } from '@angular/cdk/collections';

@Component({
  selector: 'app-cnpj.dialog',
  templateUrl: './cnpj-dialog.component.html',
  styleUrls: ['./cnpj-dialog.component.scss']
})

export class CNPJDialogComponent implements OnInit {
  hide:any;
  hideConf:any;
  

  error: string;  
  displayedColumns = ['select', 'cnpj', 'fullName', 'category', 'sendNotification',];
  
  cnpjs: RegisterCNPJ[];
  selectedOptions:RegisterCNPJ[];
  selection = new SelectionModel<RegisterCNPJ>(true, []);
  
  selectAll:boolean;
  sendNotificationForAll:boolean;

  form: FormGroup;

  public categorys = [
    'Alimentos',
    'Cosmeticos',
    'Saneantes',
    'Todos'
  ];

  
  public cnpjMask = [ /\d/ , /\d/, '.', /\d/, /\d/, /\d/, '.', /\d/ , /\d/, /\d/, '/', /\d/, /\d/,/\d/, /\d/, '-', /\d/, /\d/,];
  constructor(public dialogRef: MatDialogRef<CNPJDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: RegisterCNPJ,
              private dialog: MatDialog,
              public dataService: CNPJService,
              public dataServiceUser: UserService,
              public i18n: I18nService) {
                  
  }
  
  dataSource = new MatTableDataSource(this.cnpjs);
  
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild('filter') filter: ElementRef;

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }
  ngOnInit() {
    this.loadData();
    this.dataSource.paginator = this.paginator;
    this.form = new FormGroup({
      cnpj: new FormControl('', [])
    });
  }

  submit() {
  
  }
  
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ?
        this.selection.clear() :
        this.dataSource.data.forEach(row => this.selection.select(row));
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  public confirmAdd(): void {
       this.dataService.saveCnpjUser(this.selectedOptions);
  }
  onNgModelChange(event: Event) {
    console.log(event);
  }
  
  maskCnpj(valor: string):string {
    return valor.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/g,"\$1.\$2.\$3\/\$4\-\$5");
 }
  public loadData() {

    this.dataService.getCNPJs()
      .then(
        data => {
          this.cnpjs = data;
          this.dataSource = new MatTableDataSource(this.cnpjs);

        },
        error => {
          this.error = error.error.errorMessage;
          this.showMsg(this.error);

        });
  
} 
public getCategory(category: number): string {
  return this.categorys[category]; 
}
showMsg(message : string) : void {
  this.dialog.open(ErrorDialogComponent, {
    data: {errorMsg: message} ,width : '250px',height: '200px'
  });
}
}