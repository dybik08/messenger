import { IMessage, IAction, ACTIONS, IErrors } from './messages.constants';
import { Dispatch } from 'redux';
import axios from 'axios';

interface IMessages {
    [user: string]: Array<IMessage>
}

export const receiveMessage = (message: IMessage): IAction => ({
    type: ACTIONS.RECEIVE_MESSAGE,
    payload: message
});

export const receiveMessages = (messages: IMessages): IAction => ({
    type: ACTIONS.RECEIVE_MESSAGES,
    payload: messages
});

export const sendMessage = (message: IMessage): IAction => ({
    type: ACTIONS.SEND_MESSAGE,
    payload: message
});

export const setMessagesErrors = (errors: IErrors): IAction => ({
    type: ACTIONS.SET_MESSAGES_ERRORS,
    payload: errors
});

export const startTyping = (userId: string): IAction => ({
    type: ACTIONS.START_TYPING,
    payload: userId
});

export const stopTyping = (userId: string): IAction => ({
    type: ACTIONS.STOP_TYPING,
    payload: userId
});

export const fetchMessages = (userId: string): any => {
    return async (dispatch: Dispatch) => {
        try {
            const res = await axios.get('/api/conversations');
            const conv = res.data;
            const mapped = conv.map((conversation: any) => {
                const usr1 = conversation.user1;
                const usr2 = conversation.user2;
                const messages = conversation.messages.map((message: any) => {
                    return {
                        from: message.from,
                        to: message.from === usr1 ? usr2 : usr1,
                        content: message.content
                    }
                });
                return {
                    user: userId === usr1 ? usr2 : usr1,
                    messages: messages
                }
            });
            const result: any = {};
            for(const conversation of mapped) {
                result[conversation.user] = {
                    isTyping: false,
                    items: conversation.messages
                };
            }
            dispatch(receiveMessages(result));
        } catch(e) {
            dispatch(setMessagesErrors(e.response.data));
        }
    }
};

