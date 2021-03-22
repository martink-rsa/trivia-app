/// <reference types="node" />
import { Server } from 'socket.io';
import * as http from 'http';
declare const server: http.Server;
declare const serverIo: Server;
export { serverIo, server };
