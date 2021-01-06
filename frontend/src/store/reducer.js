import { intializeGame, movePiece, calculateAllowedSquares } from '../utils/logic';
import {
    INITIALIZE_GAME,
    SELECT_PIECE,
    MOVE_PIECE,
    CALCULATE_ALLOWED_SQUARE,
    SYNC_OPPONENT_MOVE,
} from './actions';
import { socket_io } from '../utils/socket-io';

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
        IncomingSelectedSquare = '',
        IncommingNextSquare = '',
    } = action.payload || {};

    switch (action.type) {
        case INITIALIZE_GAME:
            const intilaizedBoard = intializeGame(myPlayer);

            return { ...state, board: intilaizedBoard, myPlayer };
        case SELECT_PIECE:
            return { ...state, selectedSquare: { row, column, piece, player } };
        case CALCULATE_ALLOWED_SQUARE:
            const newAllowedSquares = calculateAllowedSquares(board, myPlayer, selectedSquare);

            return { ...state, allowedSquares: newAllowedSquares };
        case MOVE_PIECE:
            const isAllowed = allowedSquares.some((move) => move.row === nextSquare.row && move.column === nextSquare.column);

            if (isAllowed) {
                const newBoard = movePiece(board, selectedSquare, nextSquare,true);
                socket_io.emit('move', { selectedSquare, nextSquare });
                return { ...state, board: newBoard, selectedSquare: undefined, allowedSquares: [] }
            }
            return state;
        case SYNC_OPPONENT_MOVE:
            const syncBoard = movePiece(state.board, IncomingSelectedSquare, IncommingNextSquare,false);
            return { ...state, board: syncBoard };
        default:
            break;
    }
    return state;
};
