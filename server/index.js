import dotenv from 'dotenv';
dotenv.config();
import Server from './Server';

Server.init({ port: process.env.PORT });
