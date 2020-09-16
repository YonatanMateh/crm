import { NamesType } from './client';

export interface IField {
    client: string,
    owner: string,
    emailType: string
}

export interface IIds {
    clientId: number,
    ownerId: number,
    emailTypeId: number,
    sold: boolean
}

export interface IUpdateRow {
    data: NamesType[],
    title: string,
    name: keyof IField,
    actionBtnText?: string,
    placeholder: string,
    handleChange: (value: string, name: keyof IField) => void,
    rowClicked: (option: number, name: keyof IIds) => void,
    update: (name: keyof IIds) => void
}


