import React, { useEffect, useState } from 'react';
import { Typography } from '@material-ui/core';
import { ResponsiveContainer, PieChart, Pie, Tooltip, Legend } from 'recharts';
import StatisticsService from '../../../stores/StatisticsData';
import { useChartsStyle } from '../../../styles/style';

interface ISales {
    name: string,
    count: number,
    fill: number
}

const ClientAcquisitionChart = () => {
    const classes = useChartsStyle();
    const [sales, setSales] = useState<ISales[]>([]);
    
    useEffect(() => {
        (async () => {
            const response = await StatisticsService.getClientAcquisition()
            setSales(response)
        })()
    }, [])

    return (
        <>
            <Typography variant="h6" className={classes.header}>Client Acquisition</Typography>
            <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                    <Pie
                        dataKey="count"
                        data={sales}
                        fill="#fff"
                    // label={({ payload: { name, count }, fill, x, y }) =>
                    //     (<text {...{ x, y, fill }}>{name} {count}</text>)}
                    >
                    </Pie>
                    <Legend formatter={(name, entry, i) =>
                        (<span>{name} {sales.find(s => s.name === name)?.count}</span>)
                    } />

                    <Tooltip />
                </PieChart>
            </ResponsiveContainer>
        </>
    )
}

export default ClientAcquisitionChart
