import { observable, computed, action } from 'mobx';
import { Client } from "./Client";
import { ClientValue, ClientNamesType } from "../interfaces/client";
import tempData from '../tempData.json';
import {PopOverClient} from '../interfaces/popOver';
class ClientsStore {
    @observable clients: Client[];
    @observable clientNames: ClientNamesType[];
    @observable owners: ClientNamesType[];
    @observable emails: string[];
    constructor() {
        this.clients = []
        this.clientsSetupDev();
        this.clientNames = this.clients.map(c => {
            return { id: c.id, name: `${c.firstName} ${c.lastName}` }
        });

        this.owners = this.clients.map(c => {
            return { id: c.id, name: c.owner }
        })

        this.emails = ['A', 'B', 'C', 'D'];
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

    @action updateClient = (data: PopOverClient) => {
        console.log('update this: ', data);
    }
}





export default ClientsStore;