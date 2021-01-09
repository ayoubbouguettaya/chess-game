import React, { useEffect, useState, useContext } from 'react';
import { socket_io } from '../../utils/socket-io';

import styles from './home.module.css';
import Board from '../UI/board';
import { gameContext } from '../../store';
import { INITIALIZE_GAME, SYNC_OPPONENT_MOVE ,READY_GAME, RESIGN_GAME} from '../../store/actions';
import TurnIndicator from './helpers/turnIndicator';
import Modal from '../UI/modal';


const HomeComponent = () => {
    const { gameState: { readyGame,isMyTurn}, dispatch } = useContext(gameContext);

    const [opponentPlayerName, setOpponentPlayerName] = useState('');
    const [playerName,setPlayerName] = useState('');
    const [isLoading,setIsLoading] = useState(false); 
    const [messageToDisplay,setMessageToDisplay] = useState('')

    useEffect(()=>{
        setPlayerName(sessionStorage.getItem('playerName') || '')
    },[]);

    const handleSetPlayerName = (playerNameParams) =>{
        setPlayerName(playerNameParams);
    }

    const handleInitializeGame = () => {
        socket_io.emit('request_match', { playerName }, () => {
        });
        setIsLoading(true);
        setMessageToDisplay('')
    };

    useEffect(() => {
        socket_io.on("connect", () => {
        });

        socket_io.on('request_match', (data) => {
            if (data.myPlayer === 2) {
                socket_io.emit('initialize_game', {});
            }

            dispatch({ type: INITIALIZE_GAME, payload: { gameNumber: data.gameNumber, myPlayer: data.myPlayer } });
        });

        socket_io.on('ready_game', (data) => {
            const { opponentPlayerName: opponentName } = data;
            setOpponentPlayerName(opponentName);
            setIsLoading(false);
            dispatch({ type: READY_GAME, payload: {} });
        });

        socket_io.on('resign', (data) => {
            dispatch({ type: RESIGN_GAME, payload: {  } })
            setMessageToDisplay('you won! your opponenet has resign the game')
        })
        socket_io.on('move', (data) => {
            const { IncomingSelectedSquare, IncommingNextSquare } = data;
            dispatch({ type: SYNC_OPPONENT_MOVE, payload: { IncomingSelectedSquare, IncommingNextSquare } })
        })
    }, [dispatch]);
    return (
        <div className={styles.home_container} >
            <div className={styles.board_container}>
            {readyGame && <TurnIndicator isMyTurn={!isMyTurn} name={opponentPlayerName} />}
                <Board />
            <TurnIndicator isMyTurn={isMyTurn} name={playerName} />
            </div>
            <div className={styles.board_status_container} >
                <Modal handleSetPlayerName={handleSetPlayerName} />
                {!readyGame && !isLoading && <button onClick={handleInitializeGame}>start new game</button>}
                {isLoading && 'request matching loading ........'}
                <p>{messageToDisplay && messageToDisplay}</p>
            </div>
        </div>
    )
}

export default HomeComponent;
