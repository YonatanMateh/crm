import React, { useState, useEffect } from 'react'
import { Grid } from '@material-ui/core';
import Badge from './Badge.component';
import BadgesData from '../../../stores/BadgesData';

const Badges: React.FC = () => {
    const badgesData = new BadgesData()
    const [data, setData] = useState<BadgesData>();

    useEffect(() => {
        (async () => {
            await badgesData.getAllData()
            setData(badgesData);
        })()
    }, [])

    return (
        <Grid container spacing={2}>
            <Grid item xs={12} sm={6} md={3}>
                <Badge data={data?.clientsCount} id={0} />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
                <Badge data={data?.emailsSentCount} id={1} />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
                <Badge data={data?.outstandingClients} id={2} />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
                <Badge data={data?.hottestCountry} id={3} />
            </Grid>
        </Grid>
    )
}

export default Badges
