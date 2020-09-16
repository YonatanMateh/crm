/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useMemo } from 'react';
import { Typography, Paper, Grid } from '@material-ui/core';
import { useUpdateStyle } from '../../styles/style';
import { useStore } from '../../stores/stores';
import { observer } from 'mobx-react';
import UpdateForm from './UpdateForm.component';
import ActionButton from './ActionButton';
import { NAMES, IDS } from '../../config/actions';
import { IIds, IField } from '../../interfaces/action';


const Update: React.FC = observer(() => {
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
    const styles = useUpdateStyle();
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
            await ownerStore.getOwners(fields.owner)
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
        await clientsStore.updateClientField(ids.clientId, key, ids[key])
    }

    const declareSale = async () => {
        if (ids.clientId > 0) {
            updateIds(true, IDS.sold)
        }
    }

    const methods = {
        handleChange: updateField,
        rowClicked: updateIds,
        update: updateClient
    }

    const clientForm = useMemo(() => {
        return (<UpdateForm name={NAMES.CLIENT}
            title={'Client'}
            placeholder={'Client Name'}
            data={clientsStore.clientNames}
            {...methods} />)
    }, [clientsStore.clientNames]);

    const ownerForm = useMemo(() => {
        return (<UpdateForm name={NAMES.OWNER}
            title={'Transfer ownership to:'}
            placeholder={'Owner'}
            actionBtnText={'Transfer'}
            data={ownerStore.owners}
            {...methods} />)
    }, [ownerStore.owners, ids])

    const emailTypeForm = useMemo(() => {
        return (
            <UpdateForm name={NAMES.EMAILTYPE}
                title={'Send email:'}
                placeholder={'Email Type'}
                actionBtnText={'Send'}
                data={clientsStore.emails}
                {...methods} />
        )
    }, [clientsStore.emails, ids])

    return (
        <Paper className={styles.container} elevation={0}>
            <Typography variant="h6">Update</Typography>
            <Grid container direction="row" spacing={6}
                className={styles.grid}
                justify="flex-start">
                <Grid item container xs={12} md={8} spacing={2}>
                    {clientForm}
                    {ownerForm}
                    {emailTypeForm}
                    <Grid item xs={12} justify="flex-start" container alignItems="center">
                        <Grid item xs={4}> <Typography component="div">Declare Sale! </Typography></Grid>
                        <Grid item xs={4}>
                        </Grid>
                        <Grid item xs={2}><ActionButton text="Declare" onClick={declareSale} /></Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Paper>
    )
})

export default Update;