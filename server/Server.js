import express from 'express';

export default class Server {
    constructor({ port = 3000 }) {
        const app = express();
        app.use(express.static('dist/public'));
        this.server = app.listen(port, () =>
            console.log(`Server listening on port ${port}`)
        );
    }
}
