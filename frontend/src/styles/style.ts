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
