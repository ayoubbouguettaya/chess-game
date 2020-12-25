import React, { useEffect, useContext } from 'react';

import styles from './board.module.css';
import { gameContext } from '../../../store/';
import Square from '../square';
import { INITIALIZE_GAME } from '../../../store/action';

const Board = () => {
    const { gameState: { board ,myPlayer}, dispatch } = useContext(gameContext);

    useEffect(() => {
        dispatch({ type: INITIALIZE_GAME, payload: { myPlayer} });
    }, []);

    return (
        <div className={styles.board}>
            {board.map((row) => {
                return row.map((square) => (<Square key={`${square.row}${square.column}`} {...square} />))
            })}
        </div>
    );
}

export default Board;
