import { Component } from "@angular/core";
import { FormGroup, FormControl } from "@angular/forms";

@Component({
    selector: 'filter-cosmetic-register',
    templateUrl: './filter-cosmetic-register.html'
})
export class FilteCosmeticRegisterComponent {
    
    private cnpjProcessMask          = [ /\d/ , /\d/, /\d/ , /\d/, /\d/,'.', /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, '/', /\d/ , /\d/, /\d/ , /\d/,'-',/\d/ , /\d/];
    private authorizationNumberMask  = [  /\d/,'.', /\d/, '.', /\d/ , /\d/, /\d/ ,'.',/\d/ , /\d/];
    private expedientMask            = [  /\d/,/\d/,/\d/,/\d/,/\d/,/\d/,/\d/,'.',/\d/,/\d/,/\d/,/\d/,/\d/,/\d/,/\d/, /\d/, '/', /\d/ , /\d/, /\d/ ,/\d/ ,'-',/\d/ , /\d/];

    formFilter: FormGroup;
   
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
          dateInitial:new  FormControl('', []),
          dateFinal:new  FormControl('', []),  
        });
    }
    
    get getFormFilter(){
        return this.formFilter;
    }

}