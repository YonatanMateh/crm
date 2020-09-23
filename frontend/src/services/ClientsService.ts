import { Client } from './../stores/Client';
import { INewClient } from './../interfaces/addClient';
import { IIds } from "../interfaces/action";
import { IQuery } from "../interfaces/navigation";
import HttpService from "./HttpService";

const clientBase = '/api/clients';

const getClients = (query: IQuery) => {
    const { page, size, searchBy, searchText } = query;
    const searchRoute = searchBy && searchText ? `&searchText=${searchText}&searchBy=${searchBy}` : "";
    return HttpService.get(`${clientBase}?page=${page}&size=${size}${searchRoute}`);
}

const getClientsNames = (searchText: string) => {
    const [firstName, lastName] = searchText.split(' ');
    return HttpService.get(`${clientBase}/names?f=${firstName || ''}&l=${lastName || ''}`);
}

const getEmailTypes = () => {
    return HttpService.get('/api/emailType');
}

const updateClientField = (id: number, field: keyof IIds, text: number | boolean) => {
    const data = {
        id,
        field,
        text
    }
    return HttpService.put(`${clientBase}/update`, data);
}

const updateClient = (client: Client) => {
    return HttpService.put(`${clientBase}/nameAndCountry`, client);
}

const addClient = (client: INewClient) => {
    return HttpService.post(clientBase, client)
}

export default {
    getClients,
    getClientsNames,
    getEmailTypes,
    updateClientField,
    updateClient,
    addClient
}