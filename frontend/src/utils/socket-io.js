import io from 'socket.io-client';

export const socket_io = io('ws://localhost:5001');
