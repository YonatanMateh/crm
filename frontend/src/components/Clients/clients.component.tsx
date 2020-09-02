import React, { useState, useEffect } from 'react';
import Paper from '@material-ui/core/Paper';
import { TablePagination, TextField, FormControl, InputLabel, Select, MenuItem } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import { observer } from 'mobx-react';
import { useStore } from '../../stores/stores';
import { useClientsStyle } from '../../styles/style';
import { useClientsQuery } from '../../hooks/urlNavigation';
import {useDebounce} from '../../hooks/use-debounce';
import ClientPopOver from './clientPopOver.component';
import ClientsTable from './clientsTable.component';
import Loader from '../loader.component';

const Clients: React.FC = observer(() => {
  const query = useClientsQuery();
  const classes = useClientsStyle();
  const { clientsStore } = useStore();
  const history = useHistory()
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = useState<number>(query.size || 25);
  const [isLoading, setLoading] = useState<boolean>(false);
  const [searchText, setSearchText] = useState<string>(query.searchText || "");
  const [searchBy, setSearchBy] = useState<string>(query.searchBy || "Name");
  
  const debouncedSearchText = useDebounce(searchText, 500);

  const searchFields = ["Name", "Sold", "Email", "Owner", "Country"]

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
    setLoading(false);
  }

  const updateQuery = () => {
    let queries = `?page=${currentPage}&size=${rowsPerPage}`
    if (searchText !== "") {
      queries = `?page=${0}&size=${rowsPerPage}&searchText=${searchText}&searchBy=${searchBy}`
    }
    history.push({
      pathname: "",
      search: queries
    });
  }

  // render when route changed
  useEffect(() => {
    (async () => {
     await loadData();
    })()
  }, [history.location.search]);

  useEffect(() => {
   updateQuery()
  }, [currentPage, rowsPerPage, searchBy, debouncedSearchText])

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
        <ClientsTable clients={clientsStore.clients} />
      </Loader>
      <ClientPopOver />
    </Paper>
  );
})

export default Clients;