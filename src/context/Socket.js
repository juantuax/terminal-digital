import React from 'react';
import { io } from 'socket.io-client';

// export const socket = io('http://74.208.42.112:6000', { transports: ["websocket"] });
export const socket = io('http://74.208.42.112:5000', { transports: ["websocket"] });
// export const socket = io('http://74.208.42.112:5001', { transports: ["websocket"] });
export const SocketContext = React.createContext();
