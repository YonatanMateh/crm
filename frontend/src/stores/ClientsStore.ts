import { observable, computed, action } from 'mobx';
import { useContext, createContext } from "react";
import { Client } from "./Client";
import { ClientValue } from "../interfaces/client";
import tempData from '../tempData.json';

class ClientsStore {
    @observable clients: Client[];
    constructor() {
        this.clients = []
        this.clientsSetupDev();
    }
    @computed get getClientsLength() {
        return this.clients.length;
    }

    @action addClient(client: ClientValue) {
        const newClient = new Client(client);
        this.clients.push(newClient)
    }

    @action clientsSetupDev() {
        for (let c of tempData) {
            this.addClient(c);
        }
    }
}





interface IStores {
    clientsStore: ClientsStore
}

export const stores: IStores = {
    clientsStore: new ClientsStore()
}

export const StoresContext = createContext(stores);

export const useStore = () => {
    return useContext(StoresContext);
};