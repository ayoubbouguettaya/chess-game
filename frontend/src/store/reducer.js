import { intializeGame, movePiece, calculateAllowedSquares } from '../utils/logic';
import {
    INITIALIZE_GAME,
    SELECT_PIECE,
    MOVE_PIECE,
    CALCULATE_ALLOWED_SQUARE,
    SYNC_OPPONENT_MOVE,
    READY_GAME,
    RESIGN_GAME,
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
        gameNumber = 0,
        IncomingSelectedSquare = '',
        IncommingNextSquare = '',
    } = action.payload || {};
    let isMyTurn;


    switch (action.type) {
        case INITIALIZE_GAME:
            const intilaizedBoard = intializeGame(myPlayer);
            return { ...state, board: intilaizedBoard, myPlayer, gameNumber };


        case READY_GAME:
            isMyTurn = (state.myPlayer === 1) ? true : false;
            return { ...state, readyGame: true, isMyTurn }

        case RESIGN_GAME:
            return { ...state, readyGame: false, isMyTurn: false }

        case SELECT_PIECE:
            if (!state.isMyTurn) {
                return state;
            }
            return { ...state, selectedSquare: { row, column, piece, player } };


        case CALCULATE_ALLOWED_SQUARE:
            if (!state.isMyTurn) {
                return state;
            }
            const newAllowedSquares = calculateAllowedSquares(board, myPlayer, selectedSquare);
            return { ...state, allowedSquares: newAllowedSquares };


        case MOVE_PIECE:
            const isAllowed = allowedSquares.some((move) => move.row === nextSquare.row && move.column === nextSquare.column);
            if (isAllowed) {
                const newBoard = movePiece(board, selectedSquare, nextSquare, true);
                socket_io.emit('move', { selectedSquare, nextSquare });
                return { ...state, board: newBoard, selectedSquare: undefined, allowedSquares: [], isMyTurn: false }
            }
            return state;


        case SYNC_OPPONENT_MOVE:
            const syncBoard = movePiece(state.board, IncomingSelectedSquare, IncommingNextSquare, false);
            return { ...state, board: syncBoard, isMyTurn: true };
        default:
            break;
    }
    return state;
};
