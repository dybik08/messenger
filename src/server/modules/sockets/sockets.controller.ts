import usersService from '../users/users.service';
import * as sockets from 'socket.io';
import conversationsService from '../conversations/conversations.service';

export class SocketsController {
    private _io: sockets.Server;
    constructor(http: any) {
        this._io = sockets(http);
        this.configure();
    }

    private configure() {
        this._io.on('connection', (socket: sockets.Socket) => {
            console.log('a user connected');
            socket.on('signin', (userId: string) => {
                console.log('user signed in: ', userId);
                usersService.connectSocket(userId, socket.id);
                socket.broadcast.emit('userconnected', userId);
            });
            socket.on('signout', async () => {
                console.log('client signout');
                usersService.disconnectSocket(socket.id);
                const user = await usersService.getUserBySocket(socket.id);
                socket.broadcast.emit('userdisconnected', user._id);
            });
            socket.on('disconnect', async () => {
                console.log('client disconnected');
                usersService.disconnectSocket(socket.id);
                const user = await usersService.getUserBySocket(socket.id);
                socket.broadcast.emit('userdisconnected', user._id);
            });
            socket.on('message', async (message: any) => {
                console.log('received message: ', message);
                const user = await usersService.getUserSocket(message.to);
                await conversationsService.pushMessage(message);
                socket.broadcast.to(user).emit('receive', message);
            });
            socket.on('notifyUserUpdate', (userId: string) => {
                socket.broadcast.emit('updateUser', userId);
            })
        })
    }
}

export default SocketsController;
