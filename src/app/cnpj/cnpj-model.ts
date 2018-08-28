import { DataModel } from "@app/core/model/datamodel";
import { User } from "@app/user/user-model";

export class RegisterCNPJ extends DataModel {
     id: number;
     cnpj: string;
     fullName:string;
     active: boolean;
     category: number;
     sendNotification:boolean=true;
     cosmetc:boolean=false;
     foot:boolean=false;
     saneante:boolean=false;
     insertUser:User;
     insertDate:Date;
     updateUser:User;
     updateDate:Date;
    constructor(){
        super(null);
    }
}