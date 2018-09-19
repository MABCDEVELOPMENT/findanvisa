import { Injectable } from "@angular/core";
import { User } from "@app/user/user-model";

@Injectable()
export class FilterService {
  
    data:any;
    cnpj:string;
    category:number;
    option:number;
    user:User
    detail:any;
    datailItem:any;
    processo:any;
    rotulo:any;

 }