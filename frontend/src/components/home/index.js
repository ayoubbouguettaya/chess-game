import React, { useEffect, useState, useContext } from 'react';
import { socket_io } from '../../utils/socket-io';

import styles from './home.module.css';
import Board from '../UI/board';
import { gameContext } from '../../store';
import { INITIALIZE_GAME, SYNC_OPPONENT_MOVE } from '../../store/actions';


const HomeComponent = () => {
    const { gameState: { myPlayer, allowedSquares }, dispatch } = useContext(gameContext);
    const [playerName, setPlayerName] = useState('');
    const [gameNumber, SetGameNumber] = useState(0);
    const [messageToDisplay, SetMessageToDisplay] = useState('');

    const handleInputChange = (event) => {
        event.persist();
        setPlayerName(event.target.value);
    }

    const handleInitializeGame = () => {
        socket_io.emit('request_match', { playerName }, () => {
            SetMessageToDisplay('initialize game (emit)')
        });
    };

    useEffect(() => {
        socket_io.on("connect", () => {
            SetMessageToDisplay(`I'm connecting ..........(${socket_io.id})`);
        });

        socket_io.on('request_match', (data) => {
            SetMessageToDisplay('initialize game (reciving)');
            SetGameNumber(data.gameNumber)

            if (data.myPlayer === 2) {
                console.log('initialise game')
                socket_io.emit('initialize_game', {});
            }

            dispatch({ type: INITIALIZE_GAME, payload: { myPlayer: data.myPlayer } });
        });

        socket_io.on('ready_game', (data) => {
            const { opponentPlayerName } = data;
            SetMessageToDisplay(`opponentPlayerName : ${opponentPlayerName}`);
        });

        socket_io.on('resign',(data) => {
            SetMessageToDisplay('your opponent has resign the game');
        })
        socket_io.on('move', (data) => {
            const { IncomingSelectedSquare, IncommingNextSquare } = data;
            SetMessageToDisplay('the opponent has moved a piece');
            dispatch({ type: SYNC_OPPONENT_MOVE, payload: { IncomingSelectedSquare, IncommingNextSquare } })
        })
    }, [dispatch]);
    return (
        <div className={styles.home_container} >
            <div className={styles.board_container}>
                <Board />
            </div>
            <div>
                <p>{messageToDisplay}</p>
                <h4>Player: {myPlayer}</h4>
                <h4 style={{ fontWeight: '300' }}>Allowed movement</h4>
                {allowedSquares && allowedSquares.map(((square, index) => <p key={index}>{`${square.row} : ${square.column}`}</p>))}
                <h5>game N° {gameNumber}</h5>
                <input name="playerName" value={playerName} placeholder="player Name" onChange={handleInputChange} />
                <button onClick={handleInitializeGame}>initialize_game</button>
            </div>
        </div>
    )
}

export default HomeComponent;
