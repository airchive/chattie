import * as React from 'react';
import { connect } from 'react-redux';
import { AppState } from './store/store';

import './App.css';

import { SystemState } from './store/system/types';
import { updateSession } from './store/system/actions';

import { ChatState } from './store/chat/types';
import { sendMessage } from './store/chat/actions';

import ChatHistory from './components/chatHistory';
import ChatInterface from './components/chatInterface';

interface AppProps {
    sendMessage: typeof sendMessage;
    updateSession: typeof updateSession;
    chat: ChatState;
    system: SystemState;
}

export type UpdateMessageParam = React.SyntheticEvent<{ value: string }>;

class App extends React.Component<AppProps> {
    state = {
        message: ''
    };

    componentDidMount() {
        this.props.updateSession({
            loggedIn: true,
            session: 'my_session',
            userName: 'Airscript'
        });

        this.props.sendMessage({
            user: 'Panny',
            message: 'Well done, I am working!',
            timestamp: new Date().getTime()
        })
    }

    updateMessage = (event: UpdateMessageParam) => {
        this.setState({ message: event.currentTarget.value });
    };

    sendMessage = (message: string) => {
        this.props.sendMessage({
            user: this.props.system.userName,
            message: message,
            timestamp: new Date().getTime()
        });

        this.setState({ message: ''});
    };

    render() {
        return (
            <div className='parent'>
                <ChatHistory messages={this.props.chat.messages} />
                
                <ChatInterface 
                    userName={this.props.system.userName} message={this.state.message} 
                    updateMessage={this.updateMessage} sendMessage={this.sendMessage} 
                />
            </div>
        );
    }
}

const mapStateToProps = (state: AppState) => ({
    system: state.system,
    chat: state.chat
});

export default connect(mapStateToProps, { sendMessage, updateSession })(App);