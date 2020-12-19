import React, { useEffect, useContext } from 'react';

import styles from './board.module.css';
import { gameContext } from '../../../store/';
import Square from '../square';
import { INITIALIZE_GAME } from '../../../store/action';


const Board = () => {
    const { gameState, dispatch } = useContext(gameContext);

    useEffect(() => {
        dispatch({ type: INITIALIZE_GAME });
    }, []);

    return (
        <div className={styles.board}>
            {gameState.map((square) => <Square {...square} />)}
        </div>
    );
}

export default Board;
