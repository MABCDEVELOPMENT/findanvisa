import {MAT_DIALOG_DATA, MatDialogRef, MatDialog, MatTableDataSource, MatPaginator, MatSort} from '@angular/material';
import {Component, Inject, OnInit, ElementRef,  ViewChild } from '@angular/core';
import {CNPJService} from '../../cnpj/cnpj.service';
import {FormGroup, FormControl} from '@angular/forms';
import { RegisterCNPJ } from '@app/cnpj/cnpj-model';
import { I18nService } from '@app/core';
import { UserService } from '@app/user/user.service';
import { ErrorDialogComponent } from '@app/core/message/error-dialog.component';




@Component({
  selector: 'app-cnpj.dialog',
  templateUrl: './cnpj-dialog.component.html',
  styleUrls: ['./cnpj-dialog.component.scss']
})

export class CNPJDialogComponent implements OnInit {
  hide:any;
  hideConf:any;
  
  error: string;  
  displayedColumns = ['cnpj', 'fullName', 'category'];
  
  cnpjs: RegisterCNPJ[];
  selectedOptions:RegisterCNPJ[];

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
  
  length = 100;
  pageSize = 10;
  pageSizeOptions = [5, 10, 25, 100];

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
    this.form = new FormGroup({
      cnpj: new FormControl('', [])
    });
  }

  submit() {
  
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