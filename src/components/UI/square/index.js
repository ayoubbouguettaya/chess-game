import React, { useContext, useState } from 'react';

import styles from './square.module.css';
import { gameContext } from '../../../store';
import { SELECT_PIECE } from '../../../store/action';
import { checkIsSelected } from '../../../store/function';

const Square = ({ color, piece, player, row, column }) => {
    const imageSrc = `/assets/${piece}${player === 1 ? '_' : ''}.png`;

    const { dispatch, gameState: { player: myPlayer, selectedSquare } } = useContext(gameContext);
    const isSelected = checkIsSelected({ row, column }, selectedSquare)

    const handleSelect = () => {
        if (selectedSquare) {
            console.log('move action require :1/ the global state,2/ selected square, 3/ square to move');
        }

        if (!isSelected && piece !== 'empty' && myPlayer === player) {
            return dispatch({ type: SELECT_PIECE, payload: { row, column } })
        }
    }

    return (
        <div
            className={`${styles.square} ${isSelected ? styles.is_checked : ''} ${color === 'black' ? styles.square_black : styles.square_white}`}
            onClick={handleSelect}
        >
            {(piece !== 'empty') ? <img src={imageSrc} /> : '.'}
        </div>
    );
};

export default Square;
