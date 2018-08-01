import { DataModel } from "@app/core/model/datamodel";
import { RegisterCNPJ } from "@app/cnpj/cnpj-model";

export class User extends DataModel {
     id: number;
     userName:string;
     fullName:string;
     email:string;
     cellPhone:string;
     dateBrith:Date;
     password:string;
     active:boolean;
     insertUser:User;
     insertDate:Date;
     updateUser:User;
     updateDate:Date;
     profile: number;
     registersCnpj: RegisterCNPJ[]; 
     receiveActivation:boolean;
    /*constructor( 
         id: number,
         userName:string,
         fullName:string,
         email:string,
         cellPhone:string,
         dateBrith:Date,
         password:string,
         active:boolean,
         insertUser:User,
         insertDate:Date,
         updateUser:User,
         updateDate:Date,
         perfil: number){
        super(id)
        this.id = id;
        this.userName = userName;
        this.fullName = fullName;
        this.email    = email;
        this.cellPhone = cellPhone;
        this.dateBrith = dateBrith;
        this.password  = password;
        this.active    = active;
        this.insertUser = insertUser;
        this.insertDate = insertDate;
        this.updateUser = updateUser;
        this.updateDate = updateDate;
        this.perfil = perfil;
    };*/
    constructor(){
        super(null);
    }
}