
import React from 'react';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import { Check, Remove } from '@material-ui/icons';
import { useStore } from '../../stores/stores';
import { Client } from '../../stores/Client';
import { observer } from 'mobx-react';
interface T {
    client: Client 
}
const ClientCell: React.FC<T> = observer((props) => {
    const { popOverStore } = useStore();
    const {client} = props
    const rowClicked = () => {
        popOverStore.openPopOver(props.client)
    }
    return (
        <TableRow onClick={rowClicked}>
            <TableCell>{client.firstName}</TableCell>
            <TableCell>{client.lastName}</TableCell>
            <TableCell>{client.country}</TableCell>
            <TableCell>{client.firstContact}</TableCell>
            <TableCell>{client.emailType ? client.emailType : <Remove />}</TableCell>
            <TableCell>{client.sold ? <Check /> : <Remove />}</TableCell>
            <TableCell>{client.owner}</TableCell>
        </TableRow>
    )
})

export default ClientCell;