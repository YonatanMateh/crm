import React, { useEffect, useState } from 'react'
import { makeStyles, Typography } from '@material-ui/core';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Label, ResponsiveContainer } from 'recharts';
import StatisticsService from '../../../stores/StatisticsData';
import { useChartsStyle} from '../../../styles/style';


export const TopEmployee = () => {
    const [data, setData] = useState();
    const classes = useChartsStyle()
    useEffect(() => {   
        (async() => {
            const response = await StatisticsService.getTopEmployees();
            setData(response);
        })()
    }, [])

    return (
        <>
            <Typography variant="h6" className={classes.header}>Top Employees</Typography>
            <ResponsiveContainer width="100%" height={250}>

            <BarChart data={data}
                layout="vertical"
                margin={{ bottom: 30, left: 30 }}
            >
                <XAxis type="number" >
                    <Label value="Sales" offset={0} position="bottom" />
                </XAxis>
                <YAxis type="category" dataKey="ownerName" />
                <Tooltip />
                <Bar dataKey="sales" barSize={20} fill="#013f5b" />
            </BarChart>
            </ResponsiveContainer>
        </>
    )
}
