import { EMPTY, PAWN, ROOK, kNIGHT, BISHOP, QUEEN, KING, BLACK } from '../utils/constants';
import { inverseColor, getPiece, filterAllowedMoves } from '../utils/functions';

export const intializeGame = (myPlayer) => {
    let boardGame = [];
    let color = BLACK;
    let square;
    let piece;
    let player;
    let isMyPiece;

    for (let row = 0; row < 8; row++) {
        let rows = []
        for (let column = 0; column < 8; column++) {
            piece = EMPTY;
            player = 0;
            isMyPiece = false;

            if (row === 1 || row === 6) {
                piece = PAWN;
            }

            if (row === 0 || row === 7) {
                if (column === 0 || column === 7) {
                    piece = ROOK;
                }
                if (column === 1 || column === 6) {
                    piece = kNIGHT;
                }
                if (column === 2 || column === 5) {
                    piece = BISHOP;
                }
                if (column === 3) {
                    piece = QUEEN;
                }
                if (column === 4) {
                    piece = KING;
                }
            }
            if (row === 0 || row === 1) {
                player = 2;
                isMyPiece = (myPlayer === 2) ? true : false;
            }

            if (row === 6 || row === 7) {
                player = 1;
                isMyPiece = (myPlayer === 1) ? true : false;;
            }

            square = { color, piece, player, isMyPiece, row, column };

            rows.push(square);
            color = inverseColor(color);
        };
        boardGame.push(rows);
        color = inverseColor(color);
    };

    return boardGame;
}

export const movePiece = (board, selectedSquare, nextSquare) => {
    board[nextSquare.row][nextSquare.column].piece = selectedSquare.piece;
    board[nextSquare.row][nextSquare.column].player = selectedSquare.player;
    board[nextSquare.row][nextSquare.column].isMyPiece = true;
    board[selectedSquare.row][selectedSquare.column].piece = EMPTY;

    return board;
};

export const calculateAllowedSquares = (board, myPlayer, selectedSquare) => {
    const { piece } = selectedSquare;
    let allowedMoves;

    switch (piece) {
        case PAWN:
            allowedMoves = calculatePawnMoves(board, myPlayer, selectedSquare);
            break;
        case ROOK:
            allowedMoves = calculateRookMoves(board, selectedSquare);
            break;
        case BISHOP:
            allowedMoves = calculateBishopMoves(board, selectedSquare);
            break;
        case kNIGHT:
            allowedMoves = calculateKnightMoves(board, selectedSquare);
            break;
        case KING:
            allowedMoves = calculateKingMoves(board, selectedSquare);
            break;
        case QUEEN:
            allowedMoves = calculateQueenMoves(board, selectedSquare);
            break;
        default:
            allowedMoves = [];
            break;
    }
    
    return filterAllowedMoves(allowedMoves);
};

const calculatePawnMoves = (board, myPlayer, selectedSquare) => {
    const allowedMoves = [];
    const stepAhead = (myPlayer === 1) ? -1 : 1;

    if (getPiece(board, selectedSquare, stepAhead, 0).piece === EMPTY) {
        allowedMoves.push({ row: selectedSquare.row + stepAhead, column: selectedSquare.column });
    }
    if (!getPiece(board, selectedSquare, stepAhead, 1).isMyPiece && getPiece(board, selectedSquare, stepAhead, 1).piece !== EMPTY) {
        allowedMoves.push({ row: selectedSquare.row + stepAhead, column: selectedSquare.column + 1 });
    }
    if (!getPiece(board, selectedSquare, stepAhead, -1).isMyPiece && getPiece(board, selectedSquare, stepAhead, -1).piece !== EMPTY) {
        allowedMoves.push({ row: selectedSquare.row + stepAhead, column: selectedSquare.column - 1 });
    }

    return allowedMoves;
};

const calculateRookMoves = (board, selectedSquare) => {
    return [];
};

const calculateBishopMoves = (board, selectedSquare) => {
    return [];
};

const calculateKnightMoves = (board, selectedSquare) => {
    return [];
};

const calculateKingMoves = (board, selectedSquare) => {
    return [];
};

const calculateQueenMoves = (board, selectedSquare) => {
    return [];
};