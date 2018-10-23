export class Login  {
     userName:string;
     password:string;
     email:string;
     token:string;
   
     constructor(userName:string,
         password:string,
         email: string){
        this.userName = userName;
        this.password = password;
        this.email    = email;
     }
}