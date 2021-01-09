import React, { useContext } from 'react';

import styles from './board.module.css';
import { gameContext } from '../../../store/';
import Square from '../square';

const Board = () => {
    const { gameState: { board,myPlayer,readyGame } } = useContext(gameContext);

    return (
        <div className={`${styles.board} ${!readyGame ? styles.disabled : ''} ${myPlayer === 2 ? styles.inverse : ''}`}>
            {board.map((row) => {
                return row.map((square) => (<Square key={`${square.row}${square.column}`} {...square} />))
            })}
        </div>
    );
}

export default Board;
