import HttpService from "./HttpService";

const getOwners = (searchText: string) => {
    return HttpService.get(`/api/owner/?s=${searchText || ''}`)
}

export default {
    getOwners
}