import { observable, computed, action } from 'mobx';
import { Client } from "./Client";
import { ClientValue } from "../interfaces/client";
import tempData from '../tempData.json';
import {PopOverStoreData} from '../interfaces/popOver';
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
            const [firstName, lastName] = c.name.split(" ");
            const {id, firstContact, email, emailType, sold, owner, country } = c;
            const newClient: ClientValue = {
                id, firstContact, email, emailType, sold, owner, country, firstName, lastName
            }
            this.addClient(newClient);
        }
    }

    @action updateClient = (data: PopOverStoreData) => {
        console.log('update this: ', data);
    }
}





export default ClientsStore;