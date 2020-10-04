export interface ICount {
    count: number
}

export interface IClientsCount extends ICount{
    monthName: string
}

export interface IHottestCountry {
    countryId: number,
    countryName: string,
    sales: number
}