import React from 'react';
import { Grid, makeStyles, Paper, Typography } from '@material-ui/core';
import BadgeData from '../../../stores/BadgeData';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

interface IBadge {
    data?: BadgeData,
    id: number
}

const useStyle = makeStyles({
    container: {
        backgroundColor: '#ecf0f1',
        paddingBottom: '25px'
    },
    icon: {
        color: 'white',
        height: '60px',
        width: '60px',
        fontSize: '40px',
        textAlign: 'center',
        alignItems: 'center',
        lineHeight: '60px',
        borderRadius: '50%'
    }
})

const Badge = (props: IBadge) => {
    const classes = useStyle();
    const { data, id } = props;

    const colors = ['#2ecc71', '#3598da', '#e84b3b', '#f2c40e']

    return (
        <Paper elevation={0} className={classes.container} >
            {data ?
                <Grid spacing={3} container direction="row" justify="center" alignItems="center">
                    <Grid item xs={3} md={4}  >
                        <Paper className={classes.icon} style={{ background: colors[id] }}>
                            <FontAwesomeIcon icon={data?.icon} />
                        </Paper>
                    </Grid>
                    <Grid item container xs={8} direction="column">
                        <Grid item xs>
                            <Typography variant="h4">
                                {data?.count}
                            </Typography>
                        </Grid>
                        <Grid item xs>
                            <Typography variant="subtitle2" color="textSecondary">
                                {data?.description}
                            </Typography>
                        </Grid>
                    </Grid>
                </Grid>
                : null}
        </Paper>
    )
}

export default Badge