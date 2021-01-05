const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const socketIOServer = require("http").createServer();
const io = require("socket.io")(socketIOServer, { cors: { origin: "*" } });

const indexRouter = require('./routes/index');

const app = express();

let connectedUser = [];
let gameNumber = 0;

const removeUser = (array, value) => {
  let index = 0;
  while (index < array.length) {
    if (array[index] === value) {
      array.splice(index, 1);
    } else {
      index++;
    }
  }
  return array;
};

io.on("connection", (socket) => {

  socket.on('disconnect', (reason) => {
    const index = connectedUser.indexOf(socket.id);
    connectedUser = removeUser(connectedUser, socket.id);
    if (index % 2 === 0) {
      connectedUser = removeUser(connectedUser, connectedUser[index]);
    } else {
      connectedUser = removeUser(connectedUser, connectedUser[index - 1]);
    }
  });

  socket.on('initialize_game', (data) => {
    const myPlayer = (connectedUser.length % 2) + 1;
    if (connectedUser.length % 2 === 0) {
      gameNumber++;
    }
    connectedUser.push(socket.id);

    console.log('gameNumber:', gameNumber);
    console.log('myPlayer:', myPlayer);
    console.log('number of connected user', connectedUser.length)
    console.log('******--------------------****************');

    socket.emit('initialize_game', { gameNumber, myPlayer });
  });

  socket.on('move', (data) => {
    const { selectedSquare, nextSquare } = data;
    const index = connectedUser.indexOf(socket.id)
    const opponentId = (index % 2 === 0) ? connectedUser[index + 1] : connectedUser[index - 1];
    io.to(opponentId).emit('move', {
      IncomingSelectedSquare: selectedSquare, IncommingNextSquare: nextSquare,
    });
  });
});

socketIOServer.listen(5001);

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api', indexRouter);

app.use((err, req, res, next) => {
  console.log(err);
  res.status(err.status || 500);
  res.send();
});

module.exports = app;
