import React, { useState } from 'react';
import { Grid, Paper, Typography } from '@material-ui/core';
import { useActionsStyle } from '../../styles/style';
import { GridForm } from '../GridForm';
import UpdateButton from '../UpdateButton';
import { INewClient } from '../../interfaces/addClient';
import { useStore } from '../../stores/stores';

const AddClient = () => {
    const styles = useActionsStyle();
    const keys = ["first Name", "last Name", "email", "country", "owner"];
    const { clientsStore } = useStore();

    const [client, setClient] = useState<INewClient>({
        firstName: '',
        lastName: '',
        email: '',
        country: '',
        owner: ''
    })
    const inputChanged = (key: string, value: string) => {
        const currentClient = { ...client };
        currentClient[removeKeySpaces(key)] = value.trim();
        setClient(currentClient)
    }

    const addClient = () => {
        const { firstName, lastName, owner, email, country } = client
        if (firstName && lastName && owner && email && country) {
            clientsStore.addClient(client);
        }

    }

    const removeKeySpaces = (str: string) => str.replace(/\s/g, '') as keyof INewClient;
    return (
        <Paper className={styles.container} elevation={0}>
            <Typography variant="h6">Add Client</Typography>
            <form noValidate autoComplete="off">
                <Grid container item direction="row" spacing={2}
                    xs={5}
                    className={styles.grid}
                    justify="flex-start">
                    {keys.map((d: string) =>
                        <Grid item xs={12} key={d}>
                            <GridForm
                                inputKey={d}
                                value={client[removeKeySpaces(d)]}
                                textColor={"black"}
                                inputChange={inputChanged}>
                            </GridForm>
                        </Grid>

                    )}
                    <UpdateButton onClick={addClient} text={"Add Client"} />
                </Grid>
            </form>
        </Paper>
    )
}

export default AddClient;