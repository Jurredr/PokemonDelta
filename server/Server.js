import express from 'express';
import io from 'socket.io';

const Server = {
    init({ port = 3000 }) {
        const app = express();
        app.use(express.static('dist/public'));
        this.server = app.listen(port, () =>
            console.log(`Server listening on port ${port}`)
        );
        this.io = io(this.server);

        this.io.on('connection', (socket) => {
            socket.broadcast.emit('entity:add');
        });
    },
};

export default Server;
