import { User } from "@app/user/user-model";
import { RegisterCNPJ } from "@app/cnpj/cnpj-model";

export class UserRegisterCNPJ {
    id : number;
    user: User;
    cnpj: RegisterCNPJ;
    sendNotification: boolean;

    constructor(
        id: number,
        user: User,
        cnpj: RegisterCNPJ,
        sendNotification: boolean){
        this.id = id;
        this.cnpj = cnpj;
        this.user = user;
        this.sendNotification = sendNotification;

    }
}
