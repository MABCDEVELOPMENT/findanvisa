import { Component, OnInit, ChangeDetectorRef, AfterViewInit, Renderer2, Inject } from "@angular/core";
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import { ActivatedRoute, Router } from "@angular/router";
import { Ng4LoadingSpinnerService } from "ng4-loading-spinner";
import { FilterService } from "@app/queryrecords/queryrecord-list/table/filter-service";
import { QueryrecordsService } from "@app/queryrecords/queryrecords.service";
import { Location } from "@angular/common";
import { ErrorDialogComponent } from "@app/core/message/error-dialog.component";
import { I18nService } from "@app/core";
import { OverlayContainer } from "@angular/cdk/overlay";
import { RegisterApresentationComponent } from "./apresentation/register-apresentation";
import { RegisterPetitionComponent } from "./petition/register-petition";

@Component({
    selector: 'detail-cosmetic-register',
    templateUrl: './detail-cosmetic-register.html',
    styleUrls:['./detail-cosmetic-register.scss']
})
export class DetailCosmeticRegisterComponent implements OnInit,AfterViewInit  {

    content:any;
    apresentacoes:any;
    peticoes:any;

    
    error: string;

    /*constructor(private route: ActivatedRoute,
        public dialog: MatDialog,
        public parent: FilterService,
        private _location: Location,
        public dataService: QueryrecordsService,
        private router: Router,        
        public spinnerService: Ng4LoadingSpinnerService,
        private ref: ChangeDetectorRef){

    }*/
    constructor(private dialogRef: MatDialogRef<DetailCosmeticRegisterComponent>, 
        private i18nService: I18nService,  
        public dialog: MatDialog, 
        public parent: FilterService,
        private renderer: Renderer2,
         public overlayC: OverlayContainer,
        @Inject(MAT_DIALOG_DATA) public data : any) {
            const overlay = overlayC.getContainerElement();
            this.content = data.detail;

    }

    ngOnInit() {
        this.content = this.parent.detail;
        this.apresentacoes = this.content.apresentacoes;
        this.peticoes = this.content.peticoes;
    }
    
    getDetailApresentation(apresentacao: any) {
      

        this.parent.detail = apresentacao['cosmeticRegisterPresentationDetail'];
       
            let dialogRef = this.dialog.open(RegisterApresentationComponent, {
                data: { data: this.parent.detail  }, width: '1200px',
                height:'600px'
            });
    
            dialogRef.afterClosed().subscribe(result => {
                // result is what you get after you close the Modal
            });
    

        /*this.spinnerService.show();
        this.parent.datailItem = apresentacao['cosmeticRegisterPresentationDetail'];
        this.router.navigate(['/queryRecord/detail-cosmetic-register-apresentation'], { replaceUrl: false });
        this.spinnerService.hide();

        /*this.dataService.getQueryRegistersDetailCosmeticItem(this.content.processo,0,value)
            .then(
                data => {
                    this.parent.datailItem = data['contentObject'];
                    this.router.navigate(['/queryRecord/detail-cosmetic-register-apresentation'], { replaceUrl: false });
                    this.spinnerService.hide();
                }).catch(
                    error => {
                        this.error = error.error.errorMessage;
                        this.spinnerService.hide();
                        this.showMsg(this.error);

                    });*/

    }
    getDetailPetition(petition: any) {

        
        this.parent.datailItem = petition['cosmeticRegisterPetitionDetail'];
       
            let dialogRef = this.dialog.open(RegisterPetitionComponent, {
                data: { data: this.parent.datailItem  }, width: '1200px',
                height:'600px'
            });
    
            dialogRef.afterClosed().subscribe(result => {
                // result is what you get after you close the Modal
            });
    

        /*this.spinnerService.show();
        this.parent.datailItem = petition['cosmeticRegisterPetitionDetail'];
        this.router.navigate(['/queryRecord/detail-cosmetic-register-petition'], { replaceUrl: false });
        this.spinnerService.hide();*/

        /*this.dataService.getQueryRegistersDetailCosmeticItem(this.content.processo,1,value)
            .then(
                data => {
                    this.parent.datailItem = data['contentObject'];
                    this.router.navigate(['/queryRecord/detail-cosmetic-register-petition'], { replaceUrl: false });
                    this.spinnerService.hide();
                }).catch(
                    error => {
                        this.error = error.error.errorMessage;
                        this.spinnerService.hide();
                        this.showMsg(this.error);

                    });*/

    }

    ngAfterViewInit() {

    }

    showMsg(message: string): void {
        this.dialog.open(ErrorDialogComponent, {
            data: { errorMsg: message }, width: '250px', height: '250px'
        });

    }
    
    goBack () {
        this.dialogRef.close(false);
    }
    maskCnpj(valor: string):string {
        return valor.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/g,"\$1.\$2.\$3\/\$4\-\$5");
    }

}