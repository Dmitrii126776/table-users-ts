export interface IAddress {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
}

export interface IUser{
    id:number;
    name:string;
    email:string;
    address:IAddress;
}

