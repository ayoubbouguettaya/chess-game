const {
  connectPlayer,
  disconnectBothPlayers,
  getOpponentSocketId,
  getPlayerNames,
} = require('./utils');

const EventHandler = (io) => {
  let connectedUser = [];
  let gamesStatus = {
    NumberliveGames: 0,
    NumberTotalGame: 0,
  };

  io.on("connection", (socket) => {

    socket.on('request_match', (data) => {
      const { playerName } = data;
      const { gameNumber, myPlayer } = connectPlayer(connectedUser, gamesStatus, { socketId: socket.id, playerName });

      socket.emit('request_match', { gameNumber, myPlayer });
    });

    socket.on('initialize_game', (data) => {
      const opponentId = getOpponentSocketId(connectedUser, socket.id)
      const { playerName, opponentPlayerName } = getPlayerNames(connectedUser, socket.id)
      socket.emit('ready_game', { opponentPlayerName });
      io.to(opponentId).emit('ready_game', { opponentPlayerName: playerName });

    });

    socket.on('move', (data) => {
      const { selectedSquare, nextSquare } = data;
      const opponentId = getOpponentSocketId(connectedUser, socket.id);
      io.to(opponentId).emit('move', {
        IncomingSelectedSquare: selectedSquare, IncommingNextSquare: nextSquare,
      });
    });

    socket.on('disconnect', (reason) => {
      const opponentId = disconnectBothPlayers(connectedUser, gamesStatus, socket.id);
      io.to(opponentId).emit('resign','your opponent has resign the game');
    });

  });
};

module.exports = EventHandler;