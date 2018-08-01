import { Component } from "@angular/core";
import { FormGroup, FormControl } from "@angular/forms";

@Component({
    selector: 'filter-cosmetic-register',
    templateUrl: './filter-cosmetic-register.html'
})
export class FilteCosmeticRegisterComponent {
    private cnpjProcessCosmetc = [ /\d/ , /\d/, /\d/ , /\d/, /\d/,'.', /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, '/', /\d/ , /\d/, /\d/ , /\d/,'-',/\d/ , /\d/];

    formFilter: FormGroup;
   
    ngOnInit() {
        this.createForm();
    }

    createForm() {
        this.formFilter =  new FormGroup({
          product: new FormControl('', []),
          process: new FormControl('', []),
          brand: new FormControl('', []),
          numberRegister:new FormControl('', [])
        });
    }
    
    get getFormFilter(){
        return this.formFilter;
    }

}