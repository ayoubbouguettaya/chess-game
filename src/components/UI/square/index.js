import React, { useContext, useState } from 'react';

import styles from './square.module.css';
import { gameContext } from '../../../store';
import { SELECT_PIECE, MOVE_PIECE, CALCULATE_ALLOWED_SQUARE } from '../../../store/action';
import { checkIsSelected, checkIsHeighlighted } from './helpers/utils';

const Square = ({ color, row, column, piece, isMyPiece, player }) => {
    const {
        dispatch, gameState: { board, myPlayer, selectedSquare, allowedSquare },
    } = useContext(gameContext);

    const imageSrc = `/assets/${piece}${player === 1 ? '_' : ''}.png`;

    const isSelected = checkIsSelected({ row, column }, selectedSquare);
    const isHighlighted = checkIsHeighlighted({ row, column }, allowedSquare);

    const className = `${styles.square} ${isSelected ? styles.is_selected : ''} ${isHighlighted ? styles.is_highlighted : ''} ${color === 'black' ? styles.square_black : styles.square_white}`

    const handleSelect = () => {
        if (!isSelected && piece !== 'empty' && isMyPiece) {
            dispatch({
                type: CALCULATE_ALLOWED_SQUARE,
                payload: { board, myPlayer, selectedSquare: { row, column, piece } }
            });

            return dispatch({
                type: SELECT_PIECE,
                payload: { row, column, piece, player }
            });
        }

        if (selectedSquare && !isMyPiece) {
            dispatch({
                type: MOVE_PIECE,
                payload: { board, allowedSquare, selectedSquare, nextSquare: { row, column } }
            });
        }
    }

    return (
        <div
            className={className}
            onClick={handleSelect}
        >
            {(piece !== 'empty') ? <img src={imageSrc} /> : '.'}
        </div>
    );
};

export default Square;
