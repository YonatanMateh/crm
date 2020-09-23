import React, { useState, useEffect } from 'react';
import { TablePagination, TextField, FormControl, InputLabel, Select, MenuItem, Paper } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import { observer } from 'mobx-react';

import { useStore } from '../stores/stores';
import { Client } from '../stores/Client';

import { useClientsQuery } from '../hooks/urlNavigation';
import { useHasChanged } from '../hooks/previousState';
import { useDebounce } from '../hooks/use-debounce';

import ClientPopOver from '../components/clients/ClientPopOver.component';
import ClientsTable from '../components/clients/ClientsTable.component';
import Loader from '../components/Loader.component';

import { useClientsStyle } from '../styles/style';

const Clients: React.FC = observer(() => {
  const query = useClientsQuery();
  const classes = useClientsStyle();
  const { clientsStore } = useStore();
  const history = useHistory()
  const [currentPage, setCurrentPage] = useState<number>(query.page || 0);
  const [rowsPerPage, setRowsPerPage] = useState<number>(query.size || 25);
  const [isLoading, setLoading] = useState<boolean>(false);
  const [searchText, setSearchText] = useState<string>(query.searchText || "");
  const [searchBy, setSearchBy] = useState<string>(query.searchBy || "Name");
  const [clients, setClients] = useState<Client[]>([]);

  const debouncedSearchText = useDebounce(searchText, 500);
  const [hasSearchTextChanged, prevSearchText] = useHasChanged(debouncedSearchText);
  const searchFields = ["Name", "Sold", "Email", "Owner", "Country"];

  const handleChangePage = (event: unknown, newPage: number) => {
    setCurrentPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setCurrentPage(0);
  };

  const loadData = async () => {
    setLoading(true)
    await clientsStore.getClientsWithPagination(query)
    setClients(clientsStore.clients)
    setLoading(false);
  }

  const updateQuery = () => {
    let queries = `?page=${currentPage}&size=${rowsPerPage}`;
    if (searchText !== "") {
      if (searchText !== prevSearchText) {
        setCurrentPage(0)
      }
      queries += `&searchText=${searchText}&searchBy=${searchBy}`
    } else if (hasSearchTextChanged) {
      setCurrentPage(0)
    }

    history.push({
      pathname: "",
      search: queries
    });
  }

  // render when route changed
  useEffect(() => {
    (async () => {
      if (query.page != null && query.size) {
        await loadData();
      } else {
        updateQuery()
      }
    })()
  }, [history.location.search]);

  useEffect(() => {
    updateQuery()
  }, [currentPage, rowsPerPage, debouncedSearchText])


  useEffect(() => {
    setCurrentPage(0)
    updateQuery()
  }, [searchBy]);

  return (
    <Paper className={classes.container} elevation={0}>
      <Paper square={true} elevation={0} className={classes.tableNav}>
        <TextField label="Search" value={searchText} onChange={(e) => setSearchText(e.target.value)} />
        <FormControl >
          <InputLabel>Search By</InputLabel>
          <Select
            value={searchBy}
            onChange={(e) => setSearchBy(e.target.value as string)}>
            {searchFields.map((field, i) => <MenuItem key={i} value={field}>{field}</MenuItem>)}
          </Select>
        </FormControl>
        <TablePagination
          rowsPerPageOptions={[25, 50, 100]}
          component="div"
          count={clientsStore.totalClients}
          rowsPerPage={rowsPerPage}
          labelDisplayedRows={({ from, to, count }) => `${from < to ? from : 1}-${to} of ${count}`}
          page={currentPage}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </Paper>
      <Loader isLoading={isLoading}>
        <ClientsTable clients={clients} />
      </Loader>
      <ClientPopOver />
    </Paper>
  );
})

export default Clients;