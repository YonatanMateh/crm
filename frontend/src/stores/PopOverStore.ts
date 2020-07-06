import { observable, action } from 'mobx';
import {PopOverClient} from '../interfaces/popOver';

class PopOverStore {
    @observable isOpen = false;
    @observable data: PopOverClient;

    constructor() {
        this.data = {
            id: '',
            firstName: '',
            lastName: '',
            country: ''
        }
    }
    @action openPopOver = (popOverData: PopOverClient) => {
        this.isOpen = true;
        this.data = popOverData;
    }

    @action closePopOver = () =>{
        this.isOpen = false;
        this.data.id = '';
    }

    @action updateData = (key: string, value: string) => {
        debugger
        if(this.data.id) {
            this.data[key] = value;
        }
    }
 
}


export default PopOverStore;