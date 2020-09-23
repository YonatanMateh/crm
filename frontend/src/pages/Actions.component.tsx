import React from 'react';
import { Divider } from '@material-ui/core';

import AddClient from '../components/actions/AddClient.component';
import Update from "../components/actions/Update.component";

const Actions = () => {
    return (
        <>
            <Update />
            <Divider />
            <AddClient />
        </>
    )
}

export default Actions;