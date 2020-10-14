import React, { useEffect, useState } from 'react'
import { Typography } from '@material-ui/core';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import StatisticsService from '../../../stores/StatisticsData';
import { useChartsStyle } from '../../../styles/style';

const CountryChart = () => {
    const classes = useChartsStyle();
    const [data, setData] = useState();

    useEffect(() => {
        (async () => {
            const response = await StatisticsService.getSalesByCountry()
            setData(response);
        })()
    }, [])
    return (
        <>
            <Typography variant="h6" className={classes.header}>Sales By Country</Typography>
            <ResponsiveContainer width="100%" height={250}>
                <BarChart data={data}
                    margin={{ bottom: 30, left: 30 }}
                >
                    <XAxis dataKey="countryName" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="sales" barSize={50} fill="#955095" />
                </BarChart>
            </ResponsiveContainer>
        </>
    )
}

export default CountryChart;
