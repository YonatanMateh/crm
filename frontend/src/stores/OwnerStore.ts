import { observable, action } from 'mobx';
import axios from 'axios';
import { NamesType } from './../interfaces/client';
import { serverUrl } from '../config/generalConfig';

class Owner {
    @observable owners: NamesType[] = [];

    @action getOwners = async(searchText: string) => {
        const [firstName, lastName] = searchText.split(' ');        
        const {data} = await axios.get(`${serverUrl}/api/owner/?f=${firstName || ''}&l=${lastName || ''}`);           
           this.owners = data;
    }

}

export default Owner;