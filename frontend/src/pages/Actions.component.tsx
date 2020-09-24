import React, { useState } from 'react';
import { Divider } from '@material-ui/core';

import AddClient from '../components/actions/AddClient.component';
import Update from "../components/actions/Update.component";
import { MessageHandler, IMessage } from '../components/MessageHandler';

const Actions = () => {
    const [message, setMessage] = useState<IMessage>({
        type: 'error',
        text: ''
    })
    const handleMessage = (newMessage: IMessage) => {
        setMessage(newMessage);
    }

    return (
        <>
            <MessageHandler
                type={message.type}
                text={message.text}
                onClose={() => setMessage({ type: 'success', text: '' })} />
            <Update handleMessage={handleMessage} />
            <Divider />
            <AddClient handleMessage={handleMessage}/>
        </>
    )
}

export default Actions;