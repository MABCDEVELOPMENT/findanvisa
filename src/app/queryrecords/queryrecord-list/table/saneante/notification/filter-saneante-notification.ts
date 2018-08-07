import { Component } from "@angular/core";
import { FormGroup, FormControl } from "@angular/forms";
import { QueryRecordParameter } from "@app/queryrecords/queryrecordparameter.model";
import { MatDialog } from "@angular/material";
import { Router } from "@angular/router";
import { FilterService } from "@app/queryrecords/queryrecord-list/table/filter-service";
import { Ng4LoadingSpinnerService } from "ng4-loading-spinner";
import { QueryrecordsService } from "@app/queryrecords/queryrecords.service";
import { AuthenticationService, I18nService } from "@app/core";
import { ErrorDialogComponent } from "@app/core/message/error-dialog.component";

@Component({
    selector: 'filter-saneante-notification',
    templateUrl: './filter-saneante-notification.html'
})
export class FilteSaneanteNotificationComponent {
    
    private cnpjProcessMask          = [ /\d/ , /\d/, /\d/ , /\d/, /\d/,'.', /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, '/', /\d/ , /\d/, /\d/ , /\d/,'-',/\d/ , /\d/];
    private authorizationNumberMask  = [  /\d/,'.', /\d/, '.', /\d/ , /\d/, /\d/ ,'.',/\d/ , /\d/];
    private expedientMask            = [  /\d/,/\d/,/\d/,/\d/,/\d/,/\d/,/\d/,'.',/\d/,/\d/,/\d/,/\d/,/\d/,/\d/,/\d/, /\d/, '/', /\d/ , /\d/, /\d/ ,/\d/ ,'-',/\d/ , /\d/];

    formFilter: FormGroup;

    queryRecordParameter: QueryRecordParameter;

    cnpj: string;
    category: number;
    option: number;
    error: string;
    data: any;

    
    constructor(public dialog: MatDialog,
        private router: Router,
        private filterService: FilterService,
        private spinnerService: Ng4LoadingSpinnerService,
        public dataService: QueryrecordsService,
        private authenticationService: AuthenticationService,
        public i18nService: I18nService) {

    }
   
    ngOnInit() {
        this.createForm();
    }

    createForm() {
        this.formFilter =  new FormGroup({
          product: new FormControl('', []),
          process: new FormControl('', []),
          brand: new FormControl('', []),
          numberRegister:new FormControl('', []),
          authorizationNumber:new FormControl('', []),
          expedientProcess:new FormControl('', []),
          generatedTransaction:new FormControl('', []),
          expeditionPetition:new FormControl('', []),
          eanCode:new FormControl('', []),
          dateStart:new  FormControl('', []),
          dateEnd:new  FormControl('', [])
        });
    }

    loadData() {


        this.queryRecordParameter = new QueryRecordParameter(this.filterService.cnpj,
            this.formFilter.controls.process.value,
            this.formFilter.controls.product.value,
            this.formFilter.controls.brand.value,
            this.filterService.category,
            this.filterService.option,
            this.formFilter.controls.numberRegister.value,
            0,
            //Pametros nulos para Categoria cosmetico produtos notificados
            this.formFilter.controls.authorizationNumber.value,
            this.formFilter.controls.expedientProcess.value,
            this.formFilter.controls.generatedTransaction.value,
            this.formFilter.controls.expeditionPetition.value,
            this.formFilter.controls.dateStart.value,
            this.formFilter.controls.dateEnd.value,
            this.formFilter.controls.eanCode.value);


        this.spinnerService.show();
        this.dataService.getQueryRegisters(this.queryRecordParameter)
            .then(
                data => {
                    this.data = data;
                    this.filterService.data = this.data;
                    this.router.navigate(['/queryRecord/table-saneante-notification'], { replaceUrl: false });
                    this.spinnerService.hide();
                }).catch(
                    error => {
                        this.error = error.error.errorMessage;
                        this.spinnerService.hide();
                        this.showMsg(this.error);

                    });
    }
    

    showMsg(message: string): void {
        this.dialog.open(ErrorDialogComponent, {
            data: { errorMsg: message }, width: '250px', height: '250px'
        });

    }
}