import usersService from '../users/users.service';
import * as sockets from 'socket.io';

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
                socket.broadcast.emit('userconnected', { userId });
            });
            socket.on('signout', async () => {
                console.log('client signout');
                usersService.disconnectSocket(socket.id);
                const user = await usersService.getUserBySocket(socket.id);
                socket.broadcast.emit('userdisconnected', { userId: user._id });
            });
            socket.on('disconnect', async () => {
                console.log('client disconnected');
                usersService.disconnectSocket(socket.id);
                const user = await usersService.getUserBySocket(socket.id);
                socket.broadcast.emit('userdisconnected', { userId: user._id });
            });
            socket.on('message', async (message: any) => {
                console.log('received message: ', message);
                const user = await usersService.getUserById(message.to);
                console.log(user);
                socket.broadcast.to(user.socket).emit('receive', { to: user.username, content: message.content });
            })
        })
    }
}

export default SocketsController;
