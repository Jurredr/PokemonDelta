import dotenv from 'dotenv';
dotenv.config();
import Server from './Server';

new Server({ port: process.env.PORT });
