import express from 'express';
import io from 'socket.io';

import PlayerConnection from './PlayerConnection';

const Server = {
    init({ port = 3000 }) {
        this.players = [];

        const app = express();
        app.use(express.static('dist/public'));
        this.server = app.listen(port, () =>
            console.log(`Server listening on port ${port}`)
        );
        this.io = io(this.server);

        this.io.on('connection', (socket) => {
            socket.on('player:login', (data) => {
                let playerConnection = new PlayerConnection(
                    socket,
                    data.uuid,
                    data.name
                );
                playerConnection.world = 'test';
                this.players.push(playerConnection);

                console.log(this.players);
            });

            socket.on('disconnect', () => {
                const player = this.getPlayerFromProperty('socket', socket);

                if (!player) return;

                this.players.splice(this.players.indexOf(player));

                console.log(this.players);
            });
        });
    },

    getPlayerFromProperty(property, value) {
        const candidates = this.players.filter(
            (player) => player[property] === value
        );

        return candidates.length > 0 ? candidates[0] : undefined;
    },
};

export default Server;
