//we need to create this model because without this we can not bypass data in core...if any user want to register..
//so to register we needs to pass data in model..
export class user{
    name!:string;
    password!:string;
    role!:string;
    mobNumber!:string;
    address!:address;
    //gender!:string;
   // language!:string;
    email!:string;
    dob!:string;
    agreetc!:string;
    age!:string;
    aboutYou!:string;
}

export class address{
    id!:number;
    addLine1!:string;
    addLine2!:string;
    city!:string;
    state!:string;
    zipcode!:string;
}

export class Product{
    id!:number;
    name!:string;
    description!:string;
    mrp!:number;
    dp!:number;
    status!:boolean;
}

export class Order{
    id!:number;
    userId!:string;
    sellerId!:number;
    product!: Product;
    delivaryaddress!: address;
    contact!: number;
    dateTime !: string;
}