import React, { useContext, useState } from 'react';

import styles from './square.module.css';
import { gameContext } from '../../../store';
import { SELECT_PIECE, MOVE_PIECE, CALCULATE_ALLOWED_SQUARE } from '../../../store/action';
import { checkIsSelected } from '../../../store/function';

const Square = ({ color, piece, isMyPiece, row, column }) => {
    const imageSrc = `/assets/${piece}${isMyPiece ? '_' : ''}.png`;

    const { dispatch, gameState: { board, player, selectedSquare, allowedSquare } } = useContext(gameContext);
    const isSelected = checkIsSelected({ row, column }, selectedSquare)

    const handleSelect = () => {
        /* movement */
        if (selectedSquare && !isMyPiece) {
            dispatch({ type: MOVE_PIECE, payload: { board, allowedSquare, selectedSquare, nextSquare: { row, column, piece } } });
        }
        /* selection */
        if (!isSelected && piece !== 'empty' && isMyPiece) {
            dispatch({ type: CALCULATE_ALLOWED_SQUARE, payload: { board, selectedSquare: { row, column, piece } } });
            return dispatch({ type: SELECT_PIECE, payload: { row, column, piece } });
        }
        /* diselection */
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
