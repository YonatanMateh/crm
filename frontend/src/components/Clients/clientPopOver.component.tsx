import React from 'react';
import { Typography, Modal, Card, Button, CardActions, CardContent, Grid, Input, IconButton } from '@material-ui/core';

import { observer } from "mobx-react";
import { CancelPresentationOutlined } from '@material-ui/icons'
import { useStore } from '../../stores/stores';
import { useClientsStyle } from '../../styles/style';
interface StyleClass {
  [name: string] : string
}
interface InputFunc {
  (key: string, value: string): void;
}
interface GridFormProps {
  classes: StyleClass,
  labelText: string,
  value: string,
  inputChange: InputFunc
}

const GridForm: React.FC<GridFormProps> = ({classes, labelText, value, inputChange}) => {
  const capitalized = (str: string) => str ? str.charAt(0).toUpperCase() + str.slice(1) : undefined
  return (
    <Grid item xs={12} justify="space-between" container alignItems="center">
    <Typography component="span" className={classes.popOverText}>{capitalized(labelText)}:</Typography>
    <Input onChange={(e) => inputChange(labelText, e.target.value)} value={value} classes={{ underline: classes.underline }} className={classes.popOverText} color="secondary" />
  </Grid>
  )
}

const ClientPopOver: React.FC = observer(() => {
  const { popOverStore, clientsStore } = useStore();
  const {data} = popOverStore;
  const classes = useClientsStyle();
  const BackdropComponent = () => (
      <div className={classes.backDrop} onClick={popOverStore.closePopOver}></div>
    )
  
    const inputChenged = (key: string, value: string) => {
      popOverStore.updateData(key, value);
    }
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
                {data && Object.keys(data).map((d: string) => (
                 d!=='id' ? <GridForm key={d} classes={classes} value={data[d]} labelText={d} inputChange={inputChenged}/> : null)
                )}
            </Grid>
          </CardContent>

          <CardActions>
            <Button onClick={() => data ? clientsStore.updateClient(data) : null} size="medium" className={classes.updateBtn} fullWidth disableFocusRipple={true} disableElevation>Update</Button>
          </CardActions>
        </Card>
      </Modal>
  )
});

export default ClientPopOver;