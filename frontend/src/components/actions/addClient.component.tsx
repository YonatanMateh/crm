import React, { useState, useEffect } from 'react';
import { Grid, Paper, Typography } from '@material-ui/core';
import { useActionsStyle } from '../../styles/style';
import { GridForm } from '../GridForm';
import UpdateButton from '../UpdateButton';
import { INewClient } from '../../interfaces/addClient';
import { useStore } from '../../stores/stores';
import { IMessage, IMessageProp } from '../MessageHandler';

const AddClient: React.FC<IMessageProp> = (props) => {
    const styles = useActionsStyle();
    const keys = ["first Name", "last Name", "email", "country", "owner"];
    const { clientsStore } = useStore();

    const [client, setClient] = useState<INewClient>({
        firstName: '',
        lastName: '',
        email: '',
        country: '',
        owner: ''
    });

    const [message, setMessage] = useState<IMessage>({
        type: 'error',
        text: ''
    });

    const inputChanged = (key: string, value: string) => {
        const currentClient = { ...client };
        currentClient[removeKeySpaces(key)] = value.trim();
        setClient(currentClient)
    }

    const addClient = async () => {
        const { firstName, lastName, owner, email, country } = client
        if (firstName && lastName && owner && email && country) {
            try {
                await clientsStore.addClient(client);
                setMessage({
                    text: 'Client was added successfully',
                    type: 'success'
                })
            } catch (error) {
                setMessage({
                    text: 'Something went wrong, client was not added',
                    type: 'error'
                })
            }
        } else {
            setMessage({
                text: 'It will not work if you not insert text :)',
                type: 'warning'
            })
        }

    }

    useEffect(() => {
        if (message.text !== '') {
            props.handleMessage(message)
        }
        setMessage({
            text: '',
            type: 'success'
        })
    }, [message.text])

    const removeKeySpaces = (str: string) => str.replace(/\s/g, '') as keyof INewClient;
    return (
        <Paper className={styles.container} elevation={0}>
            <Typography variant="h6">Add Client</Typography>
            <form noValidate autoComplete="off">
                <Grid container item direction="row" spacing={2}
                    xs={4}
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
                    <Grid container item xs={12} justify="center">
                        <Grid item xs={12} md={4}>
                            <UpdateButton onClick={addClient} text={"Add Client"} />
                        </Grid>
                    </Grid>
                </Grid>
            </form>
        </Paper>
    )
}

export default AddClient;