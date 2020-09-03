import { Client } from './Client';
import { observable, action } from 'mobx';

class PopOverStore {
    @observable isOpen = false;
    @observable client: Client | undefined;

    @action openPopOver = (currentClient: Client) => {
        this.isOpen = true;
        this.client = currentClient;
    }
    @action closePopOver = () => {
        this.isOpen = false;
        this.client = undefined;
    }
}


export default PopOverStore;