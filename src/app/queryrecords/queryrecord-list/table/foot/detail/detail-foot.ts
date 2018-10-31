import { Component, Inject, OnInit, Renderer2 } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import { FilterService } from "@app/queryrecords/queryrecord-list/table/filter-service";
import { I18nService } from "@app/core";
import { OverlayContainer } from "@angular/cdk/overlay";

@Component({
    selector: 'detail-foot',
    templateUrl: './detail-foot.html',
    styleUrls:['./detail-foot.scss']
})
export class DetailFootComponent implements OnInit {

    content:any;

    // constructor(private route: ActivatedRoute,
    //     public dialogRef: MatDialogRef<DetailFootComponent>,
    //     public parent: FilterService,
    //     @Inject(MAT_DIALOG_DATA) public data: any,
    //     private _location: Location,
    //     public spinnerService: Ng4LoadingSpinnerService,
    //     private ref: ChangeDetectorRef){

    // }

    constructor(private dialogRef: MatDialogRef<DetailFootComponent>, 
        private i18nService: I18nService,   
        public parent: FilterService,
        private renderer: Renderer2,
         public overlayC: OverlayContainer,
        @Inject(MAT_DIALOG_DATA) public data : any) {
            const overlay = overlayC.getContainerElement();
            this.content = data.detail;

    }
  
    ngOnInit() {
        this.content = this.parent.detail;
    }
      
    onConfirm() {
        this.dialogRef.close(true);
    }

    onCancel(): void {
        this.dialogRef.close(false);
    }

    goBack () {
        this.dialogRef.close(false);
    }
    
    maskCnpj(valor: string):string {
        return valor.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/g,"\$1.\$2.\$3\/\$4\-\$5");
    }

}