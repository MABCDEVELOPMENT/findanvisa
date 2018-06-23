import { DataModel } from "@app/core/model/datamodel";
import { User } from "@app/user/user-model";

export class UpdateParameter {
     id: number;
     version:string;
     systemName:string;
     socialName: string;
     cnpj:number;
     codeZip: number;
     address: string;
     number: string;
     neighborhood: string;
     city: string;
     state: string;
     emailClient: string;
     responsiblePerson: string;
     emailReponsible: string;
     emailDefault: string;
     updateUser:User;
     updateDate:Date;
    //constructor() 
    /*constructor(id: number,
        version:string,
        systemName:string,
        socialName: string,
        cnpj:number,
        codeZip: number,
        address: string,
        city: string,
        state: string,
        emailClient: string,
        responsiblePerson: string,
        emailReponsible: string,
        emailDefault: string,
        contactPerson: string,
        emailSuport: string,
        phoneSuport: string,
        updateUser:User,
        updateDate:Date){
        super(id)
        this.id = id;
        this.version = version;
        this.systemName = systemName;
        this.socialName = socialName;
        this.cnpj       = cnpj;
        this.codeZip    = codeZip;
        this.address    = address;
        this.city       = city;
        this.state      = state;
        this.emailClient= emailClient;
        this.responsiblePerson = responsiblePerson; 
        this.emailReponsible   = emailReponsible;
        this.emailDefault      = emailDefault;
        this.contactPerson     = contactPerson;
        this.emailSuport       = emailSuport;
        this.phoneSuport       = phoneSuport;
        this.updateUser        = updateUser;
        this.updateDate        = updateDate;
    }*/
}