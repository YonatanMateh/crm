import React, { useState, useEffect } from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { useStore } from '../../stores/stores';
import ClientCell from './clientCell.component';
import { useClientsStyle } from '../../styles/style';
import ClientPopOver from './clientPopOver.component';
import { useClientsQuery } from '../../hooks/urlNavigation';


const Clients: React.FC = (props: any) => {
  const query = useClientsQuery();
  console.log(query);
  const classes = useClientsStyle();
  const { clientsStore } = useStore();
  useEffect(() => {
    (async() => {
      await clientsStore.getClientsWithPagination(query)
    })()
  }, []);
  return (
    <Paper className={classes.container} elevation={0}>
      <TableContainer component={Paper} className={classes.tableContainer}>
        <Table aria-label="simple table" >
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
            {clientsStore.clients.map((row) => (
              <ClientCell {...row} key={row.id} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <ClientPopOver />
    </Paper>
  );
}

export default Clients;