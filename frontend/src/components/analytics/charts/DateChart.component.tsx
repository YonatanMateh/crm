import React, { useEffect, useState } from 'react';
import { makeStyles, Typography } from '@material-ui/core';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import StatisticsService from '../../../stores/StatisticsData';
import { useChartsStyle } from '../../../styles/style';
import moment from 'moment'

const DateChart = () => {
    const classes = useChartsStyle();
    const [sales, setSales] = useState();
const [date, setDate] = useState();
    useEffect(() => {
        (async () => {
            const response = await StatisticsService.getSalesByDate(new Date('1-1-2017'));
            // console.log(response);
            setSales(response.sales);
            setDate(response.sales[0].firstContact)
        })()
    }, [])
    return (
        <>
        <Typography variant="h6" className={classes.header}>Sales Since {moment(date).format("MMM-D YYYY")}</Typography>
        <ResponsiveContainer width="100%" height={250}>
            <LineChart data={sales}
                margin={{ bottom: 30, left: 30 }}
            >
                <XAxis dataKey="firstContact" tickFormatter={(d)=> moment(d).format("MMM-D")} />
                <YAxis />
                <Tooltip labelFormatter={(d)=> moment(d).format('L')} formatter={(value, name, props) => [value, 'sales']}/>
                <Line type="natural" dataKey="count" fill="#fe7c65"  dot={false} />
            </LineChart>
        </ResponsiveContainer>
    </>
    )
}

export default DateChart