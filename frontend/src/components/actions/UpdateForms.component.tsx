import React, { useMemo } from 'react'
import UpdateForm from './UpdateForm.component';
import { NAMES } from '../../config/actions';
import { IIds, IField } from '../../interfaces/action';
import ClientsStore from '../../stores/ClientsStore';
import OwnerStore from '../../stores/OwnerStore';

interface IUpdateForms {
    updateField: (value: string, name: keyof IField) => void,
    updateIds: (value: number | boolean, key: keyof IIds) => void,
    updateClient: (key: keyof IIds) => void,
    ids: IIds,
    clientsStore: ClientsStore,
    ownerStore: OwnerStore
}

const UpdateForms: React.FC<IUpdateForms> = (props) => {
    const { clientsStore, ownerStore } = props;
    const methods = {
        handleChange: props.updateField,
        rowClicked: props.updateIds,
        update: props.updateClient
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
    }, [ownerStore.owners, props.ids])

    const emailTypeForm = useMemo(() => {
        return (
            <UpdateForm name={NAMES.EMAILTYPE}
                title={'Send email:'}
                placeholder={'Email Type'}
                actionBtnText={'Send'}
                data={clientsStore.emails}
                {...methods} />
        )
    }, [clientsStore.emails, props.ids])
    return (
        <>
            {clientForm}
            {ownerForm}
            {emailTypeForm}
        </>
    )
}

export default UpdateForms
