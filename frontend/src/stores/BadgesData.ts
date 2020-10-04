import { IClientsCount } from "../interfaces/statistics";
import StatisticsService from "../services/StatisticsService";
import Badge from "./BadgeData";

export default class BadgesData {
    clientsCount: Badge | undefined;
    emailsSentCount: Badge | undefined;
    outstandingClients: Badge | undefined;
    hottestCountry: Badge | undefined;

    getAllData = async () => {
        const newClientsCount: IClientsCount = await StatisticsService.getNewClientsCount();
        this.clientsCount = new Badge('chart-line', `New ${newClientsCount.monthName} Clients`, newClientsCount.count) 
        const howManyEmailsSent = await StatisticsService.getEmailSentCount();
        this.emailsSentCount = new Badge('envelope', 'Emails Sent', howManyEmailsSent.count) 
        const outstandingClients = await StatisticsService.getOutstandingClientsCount();
        this.outstandingClients = new Badge('user-circle', 'Outstanding Clients', outstandingClients.count) 
        const hottestCountry = await StatisticsService.getHottestCountry();
        this.hottestCountry = new Badge('globe-americas', 'Hottest Country', hottestCountry.countryName)
       }
}