import { makeStyles } from '@material-ui/core/styles';


export const useStyles = makeStyles({
    appContainer: {
        padding: '15px',
        backgroundColor: "#ecf0f1"
    },
    
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
    tableContainer: {
        backgroundColor: "transparent"
    },
    tableHeader: {
        backgroundColor: "#F7CE3E",
        boxShadow: "0px 3px 2px grey"
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
      updateBtn: {
        backgroundColor: "#F7CE3E",
        "&:hover": {
          backgroundColor: "#F7CE3E"
        }
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
      popOverText: {
        color: 'white'
      },
      cardContext: {
        padding: "8px"
      },
      underline: {
        borderBottom: "2px solid rgba(255, 255, 255, 0.85)",
        "&:hover": {
          borderBottom: "2px solid rgba(255, 255, 255, 0.85)",
        }
      }
})