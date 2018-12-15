import * as io from 'socket.io-client';
import store from '../../store';
import { fetchUser, setUserOffline } from 'services/users/users.actions';
import { receiveMessage } from 'services/messages/messages.actions';

export default class Socket {
    static _instance: Socket | undefined;
    private _socket: SocketIOClient.Socket | undefined;
    private _userId: string;

    static getInstance(userId?: string): Socket | undefined {
        if(this._instance)
            return this._instance;

        if(userId) {
            this._instance = new Socket(userId);
        }

        return this._instance;
    }

    destroy(): void {
        Socket._instance = undefined;
        this._socket.disconnect();
    }

    protected constructor(userId: string) {
        this._userId = userId;
        this._socket = io();
        this.configure();
    }

    configure() {
        console.log('running configuration...');
        this._socket.emit('signin', this._userId);
        this._socket.on('userconnected', (userId: string) => {
            store.dispatch(fetchUser(userId));
        });

        this._socket.on('userdisconnected', (userId: string) => {
            store.dispatch(setUserOffline(userId));
        });

        this._socket.on('receive', (message: any) => {
            store.dispatch(receiveMessage(message));
        });
        this._socket.on('updateUser', (userId: string) => {
            store.dispatch(fetchUser(userId));
        });
    }

    notifyUserUpdate(userId: string) {
        this._socket.emit('notifyUserUpdate', userId);
    }

    send(message: any) {
        this._socket.emit('message', message);
    }
}