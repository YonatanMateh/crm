import React from 'react';
import { CircularProgress, makeStyles, createStyles, Theme } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center'
    },
  }),
);

const Loader = (props: any) => {
  const classes = useStyles();

  const { isLoading } = props;
  return (
    isLoading ?
      <div className={classes.root}>
        <CircularProgress />
      </div>
      : props.children
  )
}


export default Loader;