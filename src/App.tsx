import * as React from 'react';
import { connect } from 'react-redux';

import { AppState } from './store/store';
import History from './components/History';
import Interface from './components/Interface';
import { ChatState } from './store/chat/types';
import { SystemState } from './store/system/types';
import { sendMessage } from './store/chat/actions';
import { updateSession } from './store/system/actions';

import './App.css';

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
            userName: 'Airscript',
        });

        this.props.sendMessage({
            user: 'Panny',
            timestamp: new Date().getTime(),
            message: 'Well done, I am working!',
        })
    }

    updateMessage = (event: UpdateMessageParam) => {
        this.setState({ message: event.currentTarget.value });
    };

    sendMessage = (message: string) => {
        this.props.sendMessage({
            message: message,
            timestamp: new Date().getTime(),
            user: this.props.system.userName,
        });

        this.setState({ message: ''});
    };

    render() {
        return (
            <div className='parent'>
                <History messages={this.props.chat.messages} />
                
                <Interface 
                    userName={this.props.system.userName}
                    message={this.state.message}
                    updateMessage={this.updateMessage}
                    sendMessage={this.sendMessage}
                />
            </div>
        );
    }
}

const mapStateToProps = (state: AppState) => ({
    chat: state.chat,
    system: state.system,
});

export default connect(mapStateToProps, { sendMessage, updateSession })(App);