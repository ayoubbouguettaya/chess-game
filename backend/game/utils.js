const disconnectPlayer = (connectedUser, socketId) => {
    let index = 0;
    while (index < connectedUser.length) {
        if (connectedUser[index].socketId === socketId) {
            connectedUser.splice(index, 1);
        } else {
            index++;
        }
    }
};

const disconnectBothPlayers = (connectedUser, gamesStatus, socketId) => {
    const opponentId = getOpponentSocketId(connectedUser, socketId)
    disconnectPlayer(connectedUser, socketId);
    disconnectPlayer(connectedUser, opponentId);
    gamesStatus.NumberliveGames--;
    return opponentId;
}

const connectPlayer = (connectedUser, gamesStatus, { socketId, playerName }) => {
    const myPlayer = (connectedUser.length % 2) + 1;
    if (myPlayer === 1) {
        gamesStatus.NumberliveGames++;
        gamesStatus.NumberTotalGame++;
    }
    connectedUser.push({ socketId, playerName });

    return { gameNumber: gamesStatus.NumberliveGames, myPlayer };
}

const getOpponentSocketId = (connectedUser, socketId) => {
    const index = connectedUser.findIndex((user) => user.socketId === socketId);
    const opponentUser = (index % 2 === 0) ? connectedUser[index + 1] : connectedUser[index - 1];
    return opponentUser && opponentUser.socketId;
}

const getPlayerNames = (connectedUser, socketId) => {
    const { playerName = '' } = connectedUser.find((user) => user.socketId === socketId);
    const opponentId = getOpponentSocketId(connectedUser, socketId);
    const { playerName: opponentPlayerName = '' } = connectedUser.find((user) => user.socketId === opponentId);
    console.log(playerName, opponentPlayerName);
    return { playerName, opponentPlayerName };
}

module.exports = {
    disconnectPlayer,
    disconnectBothPlayers,
    connectPlayer,
    getOpponentSocketId,
    getPlayerNames,
}