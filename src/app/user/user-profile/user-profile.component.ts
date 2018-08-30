import { Component, Inject, OnInit, ViewChild, ElementRef } from '@angular/core';
import { UserService } from '../../user/user.service';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { User } from '@app/user/user-model';
import { I18nService, extract, AuthenticationService } from '@app/core';
import { MatTableDataSource, MatSort, MatPaginator, MatDialog } from '@angular/material';
import { RegisterCNPJ } from '@app/cnpj/cnpj-model';
import { CNPJDialogComponent } from '@app/cnpj/cnpj-dialog/cnpj-dialog.component';
import { ErrorDialogComponent } from '@app/core/message/error-dialog.component';
import { Router } from '@angular/router';
import { UserRegisterCNPJ } from '@app/user/userregisterCNPJ-model';
import { Credentials } from '@app/login/login.component';
;

@Component({
  selector: 'app-user.profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})

export class UserProfileComponent {

  displayedColumns = ['cnpj', 'fullName', 'category',  'foot', 'cosmetic', 'saneante' ,'sendNotification','actions'];
  ELEMENT_DATA: RegisterCNPJ[]; 

  hide: any;
  hideConf: any;
  confirmPassword: string;
  user: User;
  error: string;
  form: FormGroup;

  private credential:Credentials;

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
  
  @ViewChild('paginator') paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild('filter') filter: ElementRef;

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

  ngAfterViewInit() {

  }
  
  ngOnInit() {
    this.loadUser();
    this.form = new FormGroup({
      fullName: new FormControl('', [Validators.required]),
      userName: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password:new FormControl( ['', Validators.required])
    
      //dateBrith: new FormControl('', [Validators.required]),
      //cellPhone: new FormControl('', [])
    });
  }

  checkIfMatchingPasswords(passwordKey: string, passwordConfirmationKey: string) {
    return (group: FormGroup) => {
      let passwordInput = group.controls[passwordKey],
        passwordConfirmationInput = group.controls[passwordConfirmationKey];
      if (passwordInput.value !== passwordConfirmationInput.value) {
        return passwordConfirmationInput.setErrors({ notEquivalent: true })
      }
      else {
        return passwordConfirmationInput.setErrors(null);
      }
    }
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
          this.dataSource.sort      = this.sort;
          this.dataSource.paginator = this.paginator;
        },
        error => {
          this.error = error.error.errorMessage;
          this.showMsg(this.error);
        });
  }

  public confirmAdd(): void {

    this.dataService.save(this.data)
    .then(
      data => {
        this.data = data;
        
        this.credential = { id:data.id, username: data.userName,email:data.email,
          isAdm: (data.profile == 1) ,token: '123456'};
           
        this.authenticationService.setCredentials(this.credential); 
        this.showMsg("Registro salvo com sucesso!");
      },
      error => {
        this.error = error.error.errorMessage;
        this.showMsg(this.error);
      });
    
  }

  addNew(registerCnpj: RegisterCNPJ) {
    const dialogRef = this.dialog.open(CNPJDialogComponent, {data: {registerCNPJ: registerCnpj},
      height: '70vh !important',
      width: '150vh'
    });

    dialogRef.afterClosed().subscribe(result => {
  
        // After dialog is closed we're doing frontend updates
        // For add we're just pushing a new row inside DataService
        // this.dataSource.dataChange.value.push(this.dataService.getDialogData());
        //this.refreshTable();
        //this.dataSource.data.push(this.dataService.getDialogData());
        this.loadUser();
    });
  }

  deleteItem(register:UserRegisterCNPJ) {

    this.dataService.deleteCNPJ(register,this.data)
      .then(
        data => {
          this.loadUser();
          this.showMsg("Cnpj excluido com sucesso!");
        }).catch(
        error => {
          this.error = error.error.errorMessage;
          this.showMsg(this.error);

        });
  }

  getCategorySelect(cnpj: RegisterCNPJ,active: boolean): string {
    if (cnpj.category != 3) {
       return "";
    }
    return active ? "Sim" : "Não";
  }
  
  getSendNotification(active: boolean): string {
    return active ? "Sim" : "Não";
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