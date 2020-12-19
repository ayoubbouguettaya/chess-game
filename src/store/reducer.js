import intializeGame from './function';
import { INITIALIZE_GAME, SELECT_PIECE } from './action';

export const gameReducer = (state, action) => {
    switch (action.type) {
        case INITIALIZE_GAME:
            const board = intializeGame();
            return { ...state, board };
        case SELECT_PIECE:
            const { payload: { row, column } } = action;
            return { ...state, selectedSquare: { row, column } }
            break;
        default:
            break;
    }
    return state;
};
