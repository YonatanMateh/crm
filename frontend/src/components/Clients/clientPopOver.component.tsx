import React, { useState, useEffect } from 'react';
import { Typography, Modal, Card, Button, CardActions, CardContent, Grid, Input, IconButton } from '@material-ui/core';

import { observer } from "mobx-react";
import { CancelPresentationOutlined } from '@material-ui/icons';
import { useStore } from '../../stores/stores';
import { useClientsStyle } from '../../styles/style';
import { PopOverClient, clientKeysType, GridFormProps } from '../../interfaces/popOver';

const GridForm: React.FC<GridFormProps> = ({ classes, clientKey, value, inputChange }) => {
  const capitalized = (str: string) => str.charAt(0).toUpperCase() + str.slice(1)
  return (
    <Grid item xs={12} justify="space-between" container alignItems="center">
      <Typography component="span" className={classes.popOverText}>{capitalized(clientKey)}:</Typography>
      <Input onChange={(e) => inputChange(clientKey, e.target.value)} value={value} classes={{ underline: classes.underline }} className={classes.popOverText} color="secondary" />
    </Grid>
  )
}

const ClientPopOver: React.FC = observer(() => {
  const { popOverStore, clientsStore } = useStore();
  const { data: { id, firstName, lastName, country } } = popOverStore;
  const [client, setClient] = useState<PopOverClient>({
    id, firstName, lastName, country
  });

  const classes = useClientsStyle();
  const BackdropComponent = () => (
    <div className={classes.backDrop} onClick={popOverStore.closePopOver}></div>
  )

  const inputChanged = (key: clientKeysType, value: string) => {
    const updatedClient: PopOverClient = { ...client };
    updatedClient[key] = value;
    setClient(updatedClient)
  }

  const keys: clientKeysType[] = ['firstName', 'lastName', 'country'];

  useEffect(() => {
    setClient({
      id, firstName, lastName, country
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id])
  return (
    <Modal
      BackdropComponent={BackdropComponent}
      className={classes.modal}
      open={popOverStore.isOpen}>
      <Card className={classes.paper}>
        <CardContent className={classes.cardContext}>
          <IconButton size="small" color="secondary" onClick={() => popOverStore.closePopOver()}>
            <CancelPresentationOutlined />
          </IconButton>
          <Grid container direction="row" spacing={2}
            justify="space-around"
            alignItems="center">
            {keys.map((d: clientKeysType) => (
              <GridForm key={d} classes={classes} value={client[d]} clientKey={d} inputChange={inputChanged} />
            ))}
          </Grid>
        </CardContent>

        <CardActions>
          <Button onClick={() => clientsStore.updateClient(client)} size="medium" className={classes.updateBtn} fullWidth disableFocusRipple={true} disableElevation>Update</Button>
        </CardActions>
      </Card>
    </Modal>
  )
});

export default ClientPopOver;