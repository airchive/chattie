import { SEND_MESSAGE, DELETE_MESSAGE, ChatState, Message, ChatActionTypes } from './types';

const initalState: ChatState = {
    messages: []
}

export function chatReducer(state = initalState, action: ChatActionTypes): ChatState {
    switch (action.type) {
        case SEND_MESSAGE: {
            return {
                messages: [...state.messages, action.payload]
            };
        }
        case DELETE_MESSAGE: {
            return {
                messages: state.messages.filter(
                    message => message.timestamp !== action.meta.timestamp
                )
            };
        }
        default:
            return state;

    }
}