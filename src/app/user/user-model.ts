import { DataModel } from "@app/core/model/datamodel";

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
    constructor( 
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
         updateDate:Date){
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
    }
}