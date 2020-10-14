import StatisticsService from "../services/StatisticsService"

const getTopEmployees = async () => {
    return await StatisticsService.getTopEmployees()
}

const getSalesByCountry = async () => {
    return await StatisticsService.getSalesByCountry()
}

const getSalesByDate = async (date: Date, hasSold=true) => {
    return await StatisticsService.getSalesByDate(date, hasSold);
}

const getClientAcquisition = async() => {
    return await StatisticsService.getClientAcquisition();
}

export default {
    getTopEmployees,
    getSalesByCountry,
    getSalesByDate,
    getClientAcquisition
}