import { ICount, IHottestCountry } from './../interfaces/statistics';
import { IClientsCount } from "../interfaces/statistics";
import HttpService from "./HttpService";

const statisticsGetRequest = async (endpoint: string) => {
    return await HttpService.get(`/api/statistics${endpoint}`);
}

const getNewClientsCount = async (month?: number, year?: number): Promise<IClientsCount> => {
    let query = '';
    if (month && year) {
        query = `?month=${month}&year=${year}`;
    }
    const data: IClientsCount = await statisticsGetRequest(`/countByDate${query}`);
    return data;
}

const getEmailSentCount = async (): Promise<ICount> => {
    return await statisticsGetRequest('/countEmailSent')
}

const getOutstandingClientsCount = async (): Promise<ICount> => {
    return await statisticsGetRequest('/countOutstandingClients')
}

const getHottestCountry = async (): Promise<IHottestCountry> => {
    return await statisticsGetRequest('/salesByCountry?hotSeller=true')
}

const getTopEmployees = async () => {
    return await statisticsGetRequest('/topEmployees');
}

const getSalesByCountry = async () => {
    return await statisticsGetRequest('/salesByCountry');
}

const getSalesByDate = async (date: Date, hasSold = true) => {
    return await statisticsGetRequest(`/salesByDate?d=${date}&hasSold=${hasSold}`);
}

const getClientAcquisition = async () => {
    return await statisticsGetRequest(`/clientAcquisition`);
}
export default {
    getNewClientsCount,
    getEmailSentCount,
    getOutstandingClientsCount,
    getHottestCountry,
    getTopEmployees,
    getSalesByCountry,
    getSalesByDate,
    getClientAcquisition
}