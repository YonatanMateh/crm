import React, { useEffect, useState } from 'react'
import { Alert, Color } from '@material-ui/lab';
import { Collapse, IconButton } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';

export interface IMessage {
    text: string | null,
    type: Color,
}

export interface IMessageProp {
    handleMessage: (message: IMessage) => void
  }

interface IMessageHandler extends IMessage {
    onClose: () => void
}

function MessageHandler(props: IMessageHandler) {
    const { text, type, onClose } = props;
    const [open, setOpen] = useState(false);

    useEffect(() => {
        if (text !== '') {
            setOpen(true)
        }
       const timeout = setTimeout(() => {
            close()
        }, 5000);
        
        return () => clearTimeout(timeout)
    }, [text])

    const close = () => {
        setOpen(false);
        onClose()
    }

    return (
        <Collapse in={open}>
            <Alert
                severity={type}
                action={
                    <IconButton
                        aria-label="close"
                        color="inherit"
                        size="small"
                        onClick={close}>
                        <CloseIcon fontSize="inherit" />
                    </IconButton>
                }>
                {text}
            </Alert>
        </Collapse>
    )
}

export {
    MessageHandler
};