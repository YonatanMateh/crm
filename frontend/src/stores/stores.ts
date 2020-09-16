
import { useContext, createContext } from "react";
import ClientsStore from './ClientsStore'
import PopOverStore from './PopOverStore'
import OwnersStore from './OwnerStore';
interface IStores {
    clientsStore: ClientsStore,
    popOverStore: PopOverStore,
    ownerStore: OwnersStore
}

export const stores: IStores = {
    clientsStore: new ClientsStore(),
    popOverStore: new PopOverStore(),
    ownerStore: new OwnersStore()

}

export const StoresContext = createContext(stores);

export const useStore = () => {
    return useContext(StoresContext);
};