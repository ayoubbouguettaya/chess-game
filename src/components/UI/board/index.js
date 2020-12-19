import React, { useEffect, useContext } from 'react';

import styles from './board.module.css';
import { gameContext } from '../../../store/';
import Square from '../square';


const Board = () => {
    const { gameState, dispatch } = useContext(gameContext);

    useEffect(() => {
        dispatch({ type: 'initialise' });
    }, []);

    return (
        <div className={styles.board}>
            {gameState.map((square) => <Square {...square} />)}
        </div>
    );
}

export default Board;
