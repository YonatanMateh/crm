import { IIds } from './../interfaces/action';
import { observable, action } from 'mobx';
import { Client } from "./Client";
import { NamesType } from "../interfaces/client";
import { IQuery } from '../interfaces/navigation';
import { INewClient } from '../interfaces/addClient';
import ClientsService from '../services/ClientsService';
class ClientsStore {
    @observable clients: Client[] = [];
    @observable clientNames: NamesType[] = [];
    @observable owners: NamesType[] = [];
    @observable emails: NamesType[] = [];

    totalClients: number = 0;
    totalPages: number = 0;
    constructor() {
        (async () => {
            await this.getEmailTypes()
        })()
    }

    addClientToArray(client: any) {
        const { id, firstName, lastName, email, firstContact,
            sold, ownerName, countryName, email_type, countryId } = client;
        const newClient = new Client(id, firstName, lastName, email, firstContact,
            email_type, sold, ownerName, countryName, countryId);
        this.clients.push(newClient)
    }

    updateCountryLocally = (countryId: number, newCountryName: string) => {
        this.clients.forEach((client: Client) => {
            if (client.countryId === countryId) {
                client.country = newCountryName;
            }
        })
    }

    @action getClientsWithPagination = async (query: IQuery) => {
        const data = await ClientsService.getClients(query);
        this.totalClients = data.totalItems;
        this.totalPages = data.totalPages;
        this.clients = [];
        data.clients.forEach((c: any) => this.addClientToArray(c));
    }

    @action updateClientField = async (id: number, field: keyof IIds, text: number | boolean) => {
        if (text > 0 && id > 0) {
            await ClientsService.updateClientField(id, field, text)
        }
    }

    @action getClientsNames = async (searchText: string) => {
        this.clientNames = await ClientsService.getClientsNames(searchText);
    }

    @action getEmailTypes = async () => {
        this.emails = await ClientsService.getEmailTypes();
    }

    @action addClient = async (client: INewClient) => {
        await ClientsService.addClient(client)
    }
}

export default ClientsStore;