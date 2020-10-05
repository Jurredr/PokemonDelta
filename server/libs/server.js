import express from 'express';
import socket from 'socket.io';
import Colors from './color';

const app = express();

// basic setup

// todo: check if it's used, if not delete this line
app.use(express.static('../public'));

class Server {
  // todo: move expressApp somewhere else
  constructor({ port = 3000, color = Colors.blue, expressApp = app }) {
    this.server = expressApp.listen(port, () => console.log(color, `Starting server on port: ${port}`));
    this.socketServer = socket(this.server);
    // todo: give a more verbose name
    this.lst = []
  }

  startListening() {
    if (!this.socketServer) {
      return;
    }
    this.socketServer.sockets.on('connection', this.newConnection.bind(this));
  }

  newConnection(socket) {
    for(const i=0; i<this.lst.length; i++) {
      socket.on(this.lst[i].key, this.lst[i].func);
    }
    console.log(Colors.green, socket.id);
  }

  send(key, data) {
    if(!key) key = "send";
    this.socketServer.sockets.emit(key, data);
  }

  on(key, fn) {
    lst.push({
      key: key,
      func: fnc
    });
  }
}

export default Server;