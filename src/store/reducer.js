import { intializeGame, movePiece, calculateAllowedSquare } from './function';
import { INITIALIZE_GAME, SELECT_PIECE, MOVE_PIECE, CALCULATE_ALLOWED_SQUARE } from './action';

export const gameReducer = (state, action) => {
    const {
        board = '',
        allowedSquare = '',
        row = '',
        column = '',
        piece = '',
        selectedSquare = '',
        nextSquare = '',
        myPlayer = '',
        player = '',
    } = action.payload || {};

    switch (action.type) {
        case INITIALIZE_GAME:
            const intilaizedBoard = intializeGame(myPlayer);

            return { ...state, board: intilaizedBoard };
        case SELECT_PIECE:

            return { ...state, selectedSquare: { row, column, piece, player } };
        case CALCULATE_ALLOWED_SQUARE:
            const newAllowedSquare = calculateAllowedSquare(board,myPlayer, selectedSquare);

            return { ...state, allowedSquare: newAllowedSquare };
        case MOVE_PIECE:
            const isAllowed = allowedSquare.some((move) => move.row === nextSquare.row && move.column === nextSquare.column)
            if (isAllowed) {
                const newBoard = movePiece(board, selectedSquare, nextSquare);
                return { ...state, board: newBoard, selectedSquare: undefined, allowedSquare: [] }
            }
            return state;
        default:
            break;
    }
    return state;
};
