import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles({
  navBar: {
    background: '#0a1612',
  },
  indicator: {
    backgroundColor: 'transparent',
  },
  selectedTab: {
    '& .MuiTouchRipple-root': {
      backgroundColor: "white",
      opacity: 0.1
    }
  }
});

export const useClientsStyle = makeStyles({
  container: {
    padding: '15px',
    backgroundColor: "#ecf0f1",
  },
  tableContainer: {
    backgroundColor: "transparent",
    height: "80vh"
  },
  tableHeader: {
    backgroundColor: "#F7CE3E",
    boxShadow: "0px 3px 2px grey"
  },
  tableNav: {
    display: 'grid',
    gridTemplateColumns: "1fr 1fr 3fr",
    margin: "5px 0",
    backgroundColor: "transparent",
    gridGap: "20px"
  },
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    maxWidth: "350px",
    backgroundColor: "rgba(0,0,0, 0.8)",
    padding: '8px'
  },
  backDrop: {
    backgroundColor: 'transparent',
    zIndex: -1,
    position: "fixed",
    right: 0,
    bottom: 0,
    top: 0,
    left: 0
  },
  cardContext: {
    padding: "8px"
  }
});


export const useActionsStyle = makeStyles({
  container: {
    backgroundColor: "#ecf0f1",
    padding: '25px'
  },
  grid: {
    marginTop: '10px'
  },
  actionButton: {
    color: '#F7CE3E',
    justifyContent: "left"
  }
})

export const useUpdateAutocomplete = makeStyles({
  option: {
    padding: 0
  }
}, { name: 'MuiAutocomplete' });


export const useOptionStyle = makeStyles({
  option: {
    width: "100%",
    paddingTop: 6,
    paddingBottom: 6,
    paddingLeft: 16,
    paddingRight: 16
  }
})