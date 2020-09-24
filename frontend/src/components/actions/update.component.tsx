/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import { Typography, Paper, Grid } from '@material-ui/core';
import { useActionsStyle } from '../../styles/style';
import { useStore } from '../../stores/stores';
import { observer } from 'mobx-react';
import ActionButton from './ActionButton';
import { IDS } from '../../config/actions';
import { IIds, IField } from '../../interfaces/action';
import { IMessage, IMessageProp } from '../MessageHandler';
import UpdateForms from './UpdateForms.component';

const Update: React.FC<IMessageProp> = observer((props) => {
    const [fields, setFields] = useState<IField>({
        client: '',
        owner: '',
        emailType: ''
    });

    const [ids, setIDs] = useState<IIds>({
        clientId: -1,
        ownerId: -1,
        emailTypeId: -1,
        sold: false
    })

    const [message, setMessage] = useState<IMessage>({
        type: 'error',
        text: ''
    });

    const styles = useActionsStyle();
    const { clientsStore, ownerStore } = useStore();

    useEffect(() => {
        (async () => {
            if (fields.client === '') {
                updateIds(-1, IDS.client)
                updateIds(false, IDS.sold)
            }
            await clientsStore.getClientsNames(fields.client)
        })()
    }, [fields.client])

    useEffect(() => {
        (async () => {
            if (fields.owner === '') {
                updateIds(-1, IDS.owner)
            }
            await ownerStore.getOwners(fields.owner);

        })()
    }, [fields.owner])

    useEffect(() => {
        if (fields.emailType === '') {
            updateIds(-1, IDS.emailType)
        }
    }, [fields.emailType]);

    useEffect(() => {
        (async () => {
            if (ids.sold) {
                await updateClient(IDS.sold)
            }
        })()
    }, [ids.sold])

    useEffect(() => {
        if (message.text !== '') {
            props.handleMessage(message)
        }
        setMessage({
            text: '',
            type: 'success'
        })
    }, [message.text])

    const updateField = (value: string, name: keyof IField) => {
        const prev = { ...fields };
        setFields({
            ...prev,
            [name]: value
        })
    }

    const updateIds = (value: number | boolean, key: keyof IIds) => {
        const prev = { ...ids };
        setIDs({
            ...prev,
            [key]: value
        })
    }

    const updateClient = async (key: keyof IIds) => {
        if (ids.clientId < 0) {
            setMessage({
                text: 'You need to select client...',
                type: 'warning'
            })
        } else if (ids[key] < 0) {
            setMessage({
                text: 'It will not work if you not insert text :)',
                type: 'warning'
            })
        } else {
            try {
                await clientsStore.updateClientField(ids.clientId, key, ids[key])
                setMessage({
                    text: 'Update successfully',
                    type: 'success'
                })
            } catch (error) {
                setMessage({
                    text: 'Something went wrong, client was not updated',
                    type: 'error'
                })
            }
        }
    }

    const declareSale = async () => {
        if (ids.clientId > 0) {
            updateIds(true, IDS.sold)
        } else {
            setMessage({
                text: 'You need to select client...',
                type: 'warning'
            })
        }
    }

    const updateFormsProps = {
        ids, clientsStore, ownerStore,
        updateField, updateIds, updateClient
    }

    return (
        <Paper className={styles.container} elevation={0}>
            <Typography variant="h6">Update</Typography>
            <Grid container direction="row" spacing={6}
                className={styles.grid}
                justify="flex-start">
                <Grid item container xs={12} md={8} spacing={2}>
                    <UpdateForms {...updateFormsProps} />
                    <Grid item xs={12} justify="flex-start" container alignItems="center">
                        <Grid item xs={4}>
                            <Typography component="div">Declare Sale!</Typography>
                        </Grid>
                        <Grid item xs={4} />
                        <Grid item xs={2}>
                            <ActionButton text="Declare" onClick={declareSale} />
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Paper>
    )
})

export default Update;