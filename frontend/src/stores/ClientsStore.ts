import { IIds } from './../interfaces/action';
import { observable, action } from 'mobx';
import { Client } from "./Client";
import { NamesType } from "../interfaces/client";
import { serverUrl } from '../config/generalConfig';
import { IQuery } from '../interfaces/navigation';
import axios from 'axios';
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

    @action addClient(client: any) {
        const { id, firstName, lastName, email, firstContact,
            sold, ownerName, countryName, email_type, countryId } = client;
        const newClient = new Client(id, firstName, lastName, email, firstContact,
            email_type, sold, ownerName, countryName, countryId);
        this.clients.push(newClient)
    }

    @action getClientsWithPagination = async (query: IQuery) => {
        const { data } = await axios.get(this.getUrlWithQueryParams(query));
            this.totalClients = data.totalItems;
            this.totalPages = data.totalPages;
            this.clients = [];
            
            data.clients.forEach((c: any) => this.addClient(c));
    }

    @action updateCountryLocally = (countryId: number, newCountryName: string) => {
        this.clients.forEach((client: Client) => {
            if (client.countryId === countryId) {
                client.country = newCountryName;
            }
        })
    }

    @action updateClientField = async (id: number, field: keyof IIds, text: number | boolean) => {
        if (text > 0 && id > 0) {
            const data = {
                id,
                field,
                text
            }
            await axios.put(`${serverUrl}/api/clients/update`, data)
        }
    }

    @action getClientsNames = async (searchText: string) => {
        const [firstName, lastName] = searchText.split(' ');
        const { data } = await axios.get(`${serverUrl}/api/clients/names?f=${firstName || ''}&l=${lastName || ''}`);
        this.clientNames = data;
    }

    @action getEmailTypes = async () => {
        const { data } = await axios.get(`${serverUrl}/api/emailType`);
        this.emails = data
    }

    private getUrlWithQueryParams = (query: IQuery): string => {
        const { page, size, searchBy, searchText } = query;
        const searchRoute = searchBy && searchText ? `&searchText=${searchText}&searchBy=${searchBy}` : "";
        return `${serverUrl}/api/clients?page=${page}&size=${size}${searchRoute}`
    }
}


export default ClientsStore;