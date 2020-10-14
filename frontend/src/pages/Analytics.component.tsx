import { makeStyles } from '@material-ui/core';
import React from 'react';
import Badges from '../components/analytics/badges/Badges.component';
import ChartsContainer from '../components/analytics/charts/ChartsContainer.component';

const useStyle = makeStyles({
    container: {
        padding: '25px',
        margin: 0
    }
})

const Analytics = (props: any) => {
    const classes = useStyle()

    return (
        <div className={classes.container}>
            <Badges />
            <ChartsContainer />
        </div>
    )
}

export default Analytics;