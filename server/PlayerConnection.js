export default class PlayerConnection {
    constructor(socket, uuid, name) {
        this.socket = socket;
        this.uuid = uuid;
        this.name = name;
        this.world = undefined;
    }
}
