import { intializeGame, movePiece, calculateAllowedSquares } from '../utils/logic';
import { INITIALIZE_GAME, SELECT_PIECE, MOVE_PIECE, CALCULATE_ALLOWED_SQUARE } from './actions';

export const gameReducer = (state, action) => {
    const {
        board = '',
        allowedSquares = '',
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
            const newAllowedSquares = calculateAllowedSquares(board,myPlayer, selectedSquare);

            return { ...state, allowedSquares: newAllowedSquares };
        case MOVE_PIECE:
            const isAllowed = allowedSquares.some((move) => move.row === nextSquare.row && move.column === nextSquare.column)
            if (isAllowed) {
                const newBoard = movePiece(board, selectedSquare, nextSquare);
                return { ...state, board: newBoard, selectedSquare: undefined, allowedSquares: [] }
            }
            return state;
        default:
            break;
    }
    return state;
};
