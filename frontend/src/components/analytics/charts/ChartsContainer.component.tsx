import React from 'react';
import { Grid } from '@material-ui/core';
import CountryChart from './CountryChart.component';
import { TopEmployee } from './TopEmployee.component';
import DateChart from './DateChart.component';
import ClientAcquisitionChart from './ClientAcquisitionChart.component';

const ChartsContainer = () => {
    return (
        <Grid container spacing={4} >
            <Grid item xs={12} sm={6} md={4} >
                <TopEmployee />
            </Grid>
            <Grid item xs={12} sm={6} md={8}>
                <CountryChart />
            </Grid>
            <Grid item xs={12} sm={6} md={8} >
                <DateChart />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
                <ClientAcquisitionChart />
            </Grid>
        </Grid>
    )
}

export default ChartsContainer