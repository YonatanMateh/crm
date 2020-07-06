
import { useContext, createContext } from "react";
import ClientsStore from './ClientsStore'
import PopOverStore from './PopOverStore'
interface IStores {
    clientsStore: ClientsStore,
    popOverStore: PopOverStore
}

export const stores: IStores = {
    clientsStore: new ClientsStore(),
    popOverStore: new PopOverStore()
}

export const StoresContext = createContext(stores);

export const useStore = () => {
    return useContext(StoresContext);
};