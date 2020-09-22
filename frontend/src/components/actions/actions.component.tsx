import React from 'react';
import { Divider } from '@material-ui/core';

import AddClient from './addClient.component';
import Update from "./update.component";
const Actions = (props: any) => {
    return (
        <>
            <Update />
            <Divider />
            <AddClient />
        </>
    )
}

export default Actions;