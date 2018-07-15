import { Component, Inject, OnInit, ViewChild, ElementRef } from '@angular/core';
import { UserService } from '../../user/user.service';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { User } from '@app/user/user-model';
import { I18nService, extract, AuthenticationService } from '@app/core';
import { EmailValidator, CustomValidator } from '@app/shared/validators';
import { DateValidator } from '@app/shared/validators/date.validator';
import { PhoneValidator } from '@app/shared/validators/phone.validator';
import { MAT_DIALOG_DATA, MatTableDataSource, MatSort, MatPaginator, MatDialog } from '@angular/material';
import { RegisterCNPJ } from '@app/cnpj/cnpj-model';
import { CNPJAddDialogComponent } from '@app/cnpj/cnpj-add/cnpj-add.component';
import { CNPJDialogComponent } from '@app/cnpj/cnpj-dialog/cnpj-dialog.component';
import { ErrorDialogComponent } from '@app/core/message/error-dialog.component';
import { Router } from '@angular/router';
;

@Component({
  selector: 'app-user.profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})

export class UserProfileComponent {

  displayedColumns = ['cnpj', 'fullName', 'category','actions'];
  ELEMENT_DATA: RegisterCNPJ[]; 

  hide: any;
  hideConf: any;
  confirmPassword: string;
  user: User;
  error: string;
  form: FormGroup;


  public categorys = [
    'Alimentos',
    'Cosmeticos',
    'Saneantes',
    'Todos'
  ];

  perfis = [
    {value: 0,  viewValue: 'Administrador'},
    {value: 1,  viewValue: 'Operador'}
  ];

  acitves = [
    {value: true,   viewValue: 'Sim'},
    {value: false,  viewValue: 'Não'}
  ];


  public mask = [/\d/, /\d/, '/', /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/];
  public maskPhone = ['(', /[1-9]/, /\d/, ')', ' ', /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];

  constructor(public dialog: MatDialog,
    public data: User,
    private router: Router,
    public dataService: UserService,
    private authenticationService: AuthenticationService,
    public i18n: I18nService) {

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
    this.dataSource.sort      = this.sort;
    this.dataSource.paginator = this.paginator;
  }
  
  ngOnInit() {
    this.loadUser();
    this.form = new FormGroup({
      fullName: new FormControl('', [Validators.required]),
      userName: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email])
      //dateBrith: new FormControl('', [Validators.required]),
      //cellPhone: new FormControl('', [])
    });
  }

  getErrorMessage() {
    return this.form.controls.email.hasError('required') ? 'fieldEmpty' :
    this.form.controls.email.hasError('email') ? 'invalidEmail' :
        '';
  }

  submit() {
    // emppty stuff
  }

  onNoClick(): void {
    this.router.navigate(['/'], { replaceUrl: true });
  }

  loadUser() {
    this.authenticationService.loadUser(null)
      .then(
        data => {
          this.data = data;
          this.ELEMENT_DATA = this.data['registerCNPJs'];
          this.dataSource = new MatTableDataSource(this.ELEMENT_DATA);
        },
        error => {
          this.error = error.error.errorMessage;
          this.showMsg(this.error);
        });
  }

  public confirmAdd(): void {

    this.dataService.save(this.data);

  }

  addNew(registerCnpj: RegisterCNPJ) {
    const dialogRef = this.dialog.open(CNPJDialogComponent, {data: {registerCNPJ: registerCnpj},
      height: '70vh !important',
      width: '850px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 1) {
        // After dialog is closed we're doing frontend updates
        // For add we're just pushing a new row inside DataService
        // this.dataSource.dataChange.value.push(this.dataService.getDialogData());
        //this.refreshTable();
        //this.dataSource.data.push(this.dataService.getDialogData());
      }
    });
  }

  public getCategory(category: number): string {
    return this.categorys[category]; 
  }

  maskCnpj(valor: string):string {
    return valor.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/g,"\$1.\$2.\$3\/\$4\-\$5");
  }

  showMsg(message : string) : void {
    this.dialog.open(ErrorDialogComponent, {
      data: {errorMsg: message} ,width : '250px',height: '250px'
    });
  }

}