
import React from 'react';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import { Check, Remove } from '@material-ui/icons';
import { ClientValue } from '../../interfaces/client';
import { useStore } from '../../stores/stores';
const ClientCell: React.FC<ClientValue> = (props) => {
    const { popOverStore } = useStore();
    const rowClicked = () => {
        const {id, country, lastName, firstName } = props;
        popOverStore.openPopOver({id, country, lastName, firstName })
    }
    return (
        <TableRow onClick={rowClicked}>
            <TableCell>{props.firstName}</TableCell>
            <TableCell>{props.country}</TableCell>
            <TableCell>{props.lastName}</TableCell>
            <TableCell>{props.firstContact}</TableCell>
            <TableCell>{props.emailType ? props.emailType : <Remove />}</TableCell>
            <TableCell>{props.sold ? <Check /> : <Remove />}</TableCell>
            <TableCell>{props.owner}</TableCell>
        </TableRow>
    )
}

export default ClientCell;