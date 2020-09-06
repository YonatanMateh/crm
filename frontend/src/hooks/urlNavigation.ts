
import { useLocation } from 'react-router-dom';
import { IQuery } from '../interfaces/navigation';

export const useQuery = () => {
    return new URLSearchParams(useLocation().search);
}

export const useClientsQuery = (): IQuery => {
    const query = useQuery();
    const page = query.get("page");
    const size = query.get("size");
    const searchBy = query.get("searchBy");
    const searchText = query.get("searchText");

    return {
        page: page ? parseInt(page) : null,
        size: size ? parseInt(size) : null,
        searchBy,
        searchText
    };

}