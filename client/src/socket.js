import { isDevelopment } from './utils';
import io from 'socket.io-client';

/*
 * In local development, we server react and socket.io in different ports. So we need to specifically listent to :3001
 * In production, we only have one server, so using io() will get the server the client code is served.
 */

export default io();
