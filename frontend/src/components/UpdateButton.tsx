import React from 'react';
import { Button, makeStyles } from '@material-ui/core';

interface UpdateButtonType {
    text: string,
    onClick?: (t: any) => void
}

const useStyle = makeStyles({
    btn: {
        marginTop: '10px',
        backgroundColor: "#F7CE3E",
        "&:hover": {
            backgroundColor: "#F7CE3E"
        }
    }
})

const UpdateButton: React.FC<UpdateButtonType> = ({ text, onClick }) => {
    const classes = useStyle()
    return (
        <Button
            onClick={onClick}
            size="medium"
            className={classes.btn}
            fullWidth
            disableFocusRipple={true}
            disableElevation>{text}</Button>
    )
}

export default UpdateButton;
