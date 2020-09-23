import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import ClientCell from './ClientCell.component';
import { useClientsStyle } from '../../styles/style';
import { Client } from '../../stores/Client';


const ClientsTable = (props: { clients: Client[] }) => {
  const { clients } = props;
  const classes = useClientsStyle();
  return (
    <TableContainer component={Paper} className={classes.tableContainer}>
      <Table stickyHeader>
        <TableHead className={classes.tableHeader}>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Surname</TableCell>
            <TableCell>Country</TableCell>
            <TableCell>First Contact</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Sold</TableCell>
            <TableCell>Owner</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {clients.map((row) => (
            <ClientCell client={row} key={row.id} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>

  );
}

export default ClientsTable;