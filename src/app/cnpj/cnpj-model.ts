import { DataModel } from "@app/core/model/datamodel";
import { User } from "@app/user/user-model";

export class RegisterCNPJ extends DataModel {
     id: number;
     cnpj: string;
     fullName:string;
     active: boolean;
     category: number;
     sendNotification:boolean=true;
     cosmetic:boolean=true;
     foot:boolean=true;
     saneante:boolean=true;
     insertUser:User;
     insertDate:Date;
     updateUser:User;
     updateDate:Date;
    constructor(){
        super(null);
    }
}