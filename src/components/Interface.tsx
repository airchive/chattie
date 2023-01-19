import * as React from 'react';
import { UpdateMessageParam } from '../App';

interface InterfaceProps {
    message: string;
    userName: string;
    sendMessage: (message: string) => void;
    updateMessage: (event: UpdateMessageParam) => void;
}

const Interface: React.SFC<InterfaceProps> = ({ 
    userName,
    message,
    updateMessage,
    sendMessage
}) => {
    function keyPress(e: React.KeyboardEvent<any>) {
        if (e.key === 'Enter') send();
    }

    function send() {
        sendMessage(message);
    }

    return (
        <div className='interface'>
            <h3>User: {userName} </h3>

            <input 
                value={message}
                onChange={updateMessage}
                onKeyPress={keyPress}
                className='chat-input'
                placeholder='Type a message...'
            />

            <button onClick={send}>Send</button>
        </div>
    );
};

export default Interface;