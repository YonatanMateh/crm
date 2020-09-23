import { observable, action } from 'mobx';
import { NamesType } from './../interfaces/client';
import OwnersService from '../services/OwnersService';
class Owner {
    @observable owners: NamesType[] = [];

    @action getOwners = async (searchText: string) => {
        this.owners = await OwnersService.getOwners(searchText);
    }
}

export default Owner;