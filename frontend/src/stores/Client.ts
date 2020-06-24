import { ClientValue } from "../interfaces/client";
export class Client implements ClientValue {
    id: string;
    name: string;
    email: string;
    firstContact: string;
    emailType: string | null | undefined;
    sold: boolean;
    owner: string;
    country: string;

    constructor(client: ClientValue) {
        const {id, name, email, firstContact,
            emailType, sold, owner, country} = client;
        this.id = id;
        this.name = name;
        this.email = email;
        this.firstContact = firstContact;
        this.emailType = emailType;
        this.sold = sold;
        this.owner = owner;
        this.country = country;
    }
}