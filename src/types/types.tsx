export interface IAddress {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
}

export interface ICompany {
    name: string;
    catchPhrase: string;
    bs: string;
}

export interface IUser {
    id: number;
    name: string;
    email: string;
    address: IAddress;
    company: ICompany;
}

export interface IComment {
    postId: number;
    id: number;
    name: string;
    email: string;
    body: string;
}
