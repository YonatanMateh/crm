import React, { useState } from 'react';
import { Typography, Paper, Grid, TextField, Input, Button } from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { useUpdateStyle } from '../../styles/style';
import { useStore } from '../../stores/stores';
interface ActionButtonType {
    text: string
}
const ActionButton: React.FC<ActionButtonType> = ({ text }) => {
    const styles = useUpdateStyle();

    return (

        <Button className={styles.actionButton} >{text}</Button>
    )
}


const Update: React.FC = () => {
    const styles = useUpdateStyle();
    const { clientsStore } = useStore();
    return (
        <Paper className={styles.container} elevation={0}>
            <Typography variant="h6">Update</Typography>
            <Grid container direction="row" spacing={6}
                className={styles.grid}
                justify="flex-start">
                <Grid item container xs={6} spacing={2}>
                    <Grid item xs={12} justify="flex-start" container alignItems="center">
                        <Grid item xs={4}><Typography component="div">Client</Typography></Grid>
                        <Grid item xs={6}>
                            <Autocomplete
                                freeSolo
                                options={clientsStore.clientNames}
                                getOptionLabel={(option: any) => option.name}
                                style={{ width: 200 }}
                                renderInput={(params: any) => <TextField {...params} placeholder="Client Name" />}
                            />
                        </Grid>
                    </Grid>
                    <Grid item xs={12} justify="flex-start" container alignItems="center">
                        <Grid item xs={4}><Typography component="div">Transfer ownership to:</Typography></Grid>
                        <Grid item xs={4}> <Autocomplete
                            options={clientsStore.owners}
                            getOptionLabel={(option: any) => option.name}
                            style={{ width: 200 }}
                            renderInput={(params: any) => <TextField {...params} placeholder="Owner" />}
                        /></Grid>
                        <Grid item xs={2}><ActionButton text="Transfer" /></Grid>
                    </Grid>
                    <Grid item xs={12} justify="flex-start" container alignItems="center">
                        <Grid item xs={4}> <Typography component="div">Send email:</Typography></Grid>
                        <Grid item xs={4}> <Autocomplete
                            options={clientsStore.emails}
                            getOptionLabel={(option: any) => option}
                            style={{ width: 200 }}
                            renderInput={(params: any) => <TextField {...params} placeholder="Email Type" />}
                        /></Grid>
                        <Grid item xs={2}><ActionButton text="Send" /></Grid>
                    </Grid>
                </Grid>

                {/* <Grid item container xs={2} direction="column" spacing={2}>
                <Grid item><ActionButton text="h"/></Grid>
                    <Grid item><ActionButton text="Transfer"/></Grid>
                    <Grid item><ActionButton text="Send" /></Grid>
                    <Grid item><ActionButton text="Declare" /></Grid>
                </Grid> */}
            </Grid>
        </Paper>
    )
}

export default Update;