import { DataModel } from "@app/core/model/datamodel";
import { User } from "@app/user/user-model";

export class RegisterCNPJ extends DataModel {
     id: number;
     cnpj: string;
     fullName:string;
     active:boolean;
     insertUser:User;
     insertDate:Date;
     updateUser:User;
     updateDate:Date;
    constructor(){
        super(null);
    }
}