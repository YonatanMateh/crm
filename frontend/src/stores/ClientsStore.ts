import { observable, computed, action } from 'mobx';
import { Client } from "./Client";
import { ClientValue, ClientNamesType } from "../interfaces/client";
// import tempData from '../tempData.json';
import {PopOverClient} from '../interfaces/popOver';
import {serverUrl} from '../config/generalConfig';
import { IQuery } from '../interfaces/navigation';
import axios from 'axios';
class ClientsStore {
    @observable clients: Client[];
    @observable clientNames: ClientNamesType[];
    @observable owners: ClientNamesType[];
    @observable emails: string[];
    constructor() {
        this.clients = []
        // this.clientsSetupDev();
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

    @action getClientsWithPagination = async (query: IQuery) => {
        const {page, size, searchBy, searchText} = query;

        const searchRoute = searchBy && searchText ? `&searchText=${searchText}&=searchBy${searchBy}` : "";
 const {data} = await axios.get(`${serverUrl}/api/clients?page=${page}&size=${size}`);
// this.clients = data.clients;
data.clients.forEach((c:Client )=> this.addClient(c));
console.log(this.clients);
}

    // @computed get getPagination(page:number, size: number) {
    //     const limit = size ? +size : 3;
    //     const offset = page ? page * limit : 0;
      
    //     return { limit, offset };
    //   };

    // @action clientsSetupDev() {
    //     for (let c of tempData) {
    //         const [firstName, lastName] = c.name.split(" ");
    //         const {id, firstContact, email, emailType, sold, owner, country } = c;
    //         const newClient: ClientValue = {
    //             id, firstContact, email, emailType, sold, owner, country, firstName, lastName
    //         }
    //         this.addClient(newClient);
    //     }
    // }

    @action updateClient = (data: PopOverClient) => {
        console.log('update this: ', data);
    }
}





export default ClientsStore;