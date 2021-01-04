const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const socketIOServer = require("http").createServer();
const io = require("socket.io")(socketIOServer, { cors: { origin: "*" } });

const indexRouter = require('./routes/index');

const app = express();

let NbrConnectedUser = 0;
io.on("connection", (socket) => {
  console.log(socket.id);
  console.log(`NbrConnectedUser: ${NbrConnectedUser}`);
  NbrConnectedUser++;

  socket.on('disconnect', (reason) => {
    NbrConnectedUser--;
    console.log(reason);
  });

  socket.on('move', (data) => {

  });

  socket.on('initialize-game', (data) => {

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
