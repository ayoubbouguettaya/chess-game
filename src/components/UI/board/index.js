import React, { useEffect, useContext } from 'react';

import styles from './board.module.css';
import { gameContext } from '../../../store/';
import Square from '../square';

const Board = () => {
    const { gameState: { board } } = useContext(gameContext);

    return (
        <div className={styles.board}>
            {board.map((row) => {
                return row.map((square) => (<Square key={`${square.row}${square.column}`} {...square} />))
            })}
        </div>
    );
}

export default Board;
