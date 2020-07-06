import { observable, action } from 'mobx';
import {PopOverStoreData} from '../interfaces/popOver';

class PopOverStore {
    @observable isOpen = false;
    @observable data: PopOverStoreData | undefined;

    @action openPopOver = (popOverData: PopOverStoreData) => {
        this.isOpen = true;
        this.data = popOverData;
    }

    @action closePopOver = () =>{
        this.isOpen = false;
        this.data = undefined;
    }

    @action updateData = (key: string, value: string) => {
        debugger
        if(this.data) {
            this.data[key] = value;
        }
    }
 
}


export default PopOverStore;