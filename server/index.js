import dotenv from 'dotenv';
dotenv.config();
import Server from './Server';

new Server({ port: process.env.PORT });

// import DB from './DB';
