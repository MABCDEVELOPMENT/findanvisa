import { DataModel } from "@app/core/model/datamodel";
import { User } from "@app/user/user-model";

export class CNPJ extends DataModel {
     id: number;
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