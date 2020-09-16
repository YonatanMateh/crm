import { IIds, IField } from './../interfaces/action';

interface INames {
    [key: string]: keyof IField;
}

export const NAMES: INames = {
    CLIENT: 'client',
    OWNER: 'owner',
    EMAILTYPE: 'emailType'
}
interface ids {
    [key: string]: keyof IIds;
 } 
export const IDS: ids= {
    client: 'clientId',
    owner: 'ownerId',
    emailType: 'emailTypeId',
    sold: 'sold'
}