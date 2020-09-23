import { stores } from './stores';
import { ClientValue } from "../interfaces/client";
import { observable, action } from 'mobx';
import ClientsService from '../services/ClientsService';

export class Client implements ClientValue {
    readonly id: string;
    @observable firstName: string;
    @observable lastName: string;
    @observable email: string;
    @observable firstContact: Date;
    @observable emailType: string | null | undefined;
    @observable sold: boolean;
    @observable owner: string;
    @observable country: string;
    @observable countryId: number;

    constructor(id: string, firstName: string, lastName: string, email: string, firstContact: Date,
        emailType: string, sold: boolean, owner: string, country: string, countryId: number) {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.firstContact = firstContact;
        this.emailType = emailType;
        this.sold = sold;
        this.owner = owner;
        this.country = country;
        this.countryId = countryId;
    }

    @action update = async (firstName: string, lastName: string, country: string) => {
        const clientToUpdate = {
            ...this,
            firstName,
            lastName,
            country
        }
        const data = await ClientsService.updateClient(clientToUpdate)
        if (data.country !== this.country) {
            this.updateAllCountries(data.countryId, data.country)
        }
        Object.keys(this).forEach((key: string) => {
            if (key !== 'id' && data[key]) {
                this[key as keyof this] = data[key]
            }
        })
    }

    private updateAllCountries = (countryId: number, newCountryName: string) => {
        const clients = stores.clientsStore
        clients.updateCountryLocally(countryId, newCountryName)
    }
}