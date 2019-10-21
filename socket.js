const SocketIO = require('socket.io');
const UserService = require('./UserService');

const usersService = new UserService;


module.exports = (server) => {
    
    const io = SocketIO(server);
    
    io.on('connection', (socket) => {
        console.log('connection');
        socket.on('join', (name) => {
            console.log('join');
            usersService.addUser({
                id:socket.id,
                name
            });
            
            io.emit('update', {
                users: usersService.getAllUsers()
            });
            console.log('update');
        });

        socket.on('disconnect', () => {
            console.log('disconnected..');
            usersService.removeUser(socket.id);
            socket.broadcast.emit('update', {
                users: usersService.getAllUsers()
            });
        });

        socket.on('message', (message) => {
            console.log(socket.id);
            const { name } = usersService.getUserById(socket.id);
            socket.broadcast.emit('message', {
                text: message.text,
                from: name
            });
        });
    });
}