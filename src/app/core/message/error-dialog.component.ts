import {Component, Inject, Injectable} from '@angular/core';
import { I18nService } from '../i18n.service';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

@Component({
  selector: 'dialog-overview',
  templateUrl: 'error-dialog.component.html',
  styleUrls: ['./error-dialog.component.scss']
})

export class ErrorDialogComponent {

  constructor(private dialogRef: MatDialogRef<ErrorDialogComponent>, 
              private i18nService: I18nService,   
              @Inject(MAT_DIALOG_DATA) public data : any) {

  }

  public closeDialog(){
    this.dialogRef.close();
  }

}