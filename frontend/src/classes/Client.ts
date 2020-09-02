import { ClientValue } from "../interfaces/client";
export class Client implements ClientValue {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    firstContact: Date;
    emailType: string | null | undefined;
    sold: boolean;
    owner: any;
    country: string;

    constructor(id: string, firstName: string, lastName:string, email:string, firstContact: Date,
        emailType:string, sold: boolean, owner: any, country: string) {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.firstContact = firstContact;
        this.emailType = emailType;
        this.sold = sold;
        this.owner = owner;
        this.country = country;
    }
}