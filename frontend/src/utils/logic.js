import { EMPTY, PAWN, ROOK, kNIGHT, BISHOP, QUEEN, KING, BLACK } from '../utils/constants';
import { inverseColor, getPiece, filterAllowedMoves, IsInboundaries } from '../utils/functions';

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

export const movePiece = (PrevStateBoard, selectedSquare, nextSquare, isMe = true) => {
    const board = PrevStateBoard.slice(0);
    board[nextSquare.row][nextSquare.column].piece = selectedSquare.piece;
    board[nextSquare.row][nextSquare.column].player = selectedSquare.player;
    board[nextSquare.row][nextSquare.column].isMyPiece = isMe;
    board[selectedSquare.row][selectedSquare.column].piece = EMPTY;
    board[selectedSquare.row][selectedSquare.column].isMyPiece = false;

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
    const rowStart = (myPlayer === 1) ? 6 : 1;

    if (getPiece(board, selectedSquare, stepAhead, 0).piece === EMPTY) {
        allowedMoves.push({ row: selectedSquare.row + stepAhead, column: selectedSquare.column });
    }
    if (selectedSquare.row === rowStart && getPiece(board, selectedSquare, (stepAhead * 2), 0).piece === EMPTY) {
        allowedMoves.push({ row: selectedSquare.row + (stepAhead * 2), column: selectedSquare.column });
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
    const allowedMoves = [];
    const { row, column } = selectedSquare;
    const stepVariation = [-1, 1];
    let step;
    for (let variat of stepVariation) {

        step = 1;
        while (IsInboundaries({ row, column }, step * variat, 0) && getPiece(board, { row, column }, step * variat, 0).piece === EMPTY) {
            allowedMoves.push({ row: row + (variat * step), column: column });
            step++;
        }
        if (IsInboundaries({ row, column }, step * variat, 0) && !getPiece(board, { row, column }, step * variat, 0).isMyPiece) {
            allowedMoves.push({ row: row + (variat * step), column: column });
        }

        step = 1;
        while (IsInboundaries({ row, column }, 0, step * variat) && getPiece(board, { row, column }, 0, step * variat).piece === EMPTY) {
            allowedMoves.push({ row: row, column: column + (variat * step) });
            step++;
        }
        if (IsInboundaries({ row, column }, 0, step * variat) && !getPiece(board, { row, column }, 0, step * variat).isMyPiece) {
            allowedMoves.push({ row: row, column: column + (variat * step) });
        }

    }

    return allowedMoves;
};

const calculateBishopMoves = (board, selectedSquare) => {
    const allowedMoves = [];
    const { row, column } = selectedSquare;
    const stepVariation = [-1, 1];
    let step;
    for (let variat of stepVariation) {
        for (let variat2 of stepVariation) {
            step = 1;
            while (IsInboundaries({ row, column }, step * variat, step * variat2) && getPiece(board, { row, column }, step * variat, step * variat2).piece === EMPTY) {
                allowedMoves.push({ row: row + (variat * step), column: column + (variat2 * step) });
                step++;
            }
            if (IsInboundaries({ row, column }, step * variat, step * variat2) && !getPiece(board, { row, column }, step * variat, step * variat2).isMyPiece) {
                allowedMoves.push({ row: row + (variat * step), column: column + (variat2 * step) });
            }
        }
    }

    return allowedMoves;
};

const calculateKnightMoves = (board, selectedSquare) => {
    const allowedMoves = [];
    const stepVariation = [-1, 1];
    const stepVariation2 = [-2, 2]
    let squareToJump, squareToJump2;

    for (let variation of stepVariation) {
        for (let variation2 of stepVariation2) {
            squareToJump = getPiece(board, selectedSquare, variation, variation2);
            if (squareToJump.piece === EMPTY || !squareToJump.isMyPiece) {
                allowedMoves.push({ row: squareToJump.row, column: squareToJump.column })
            }
            squareToJump2 = getPiece(board, selectedSquare, variation2, variation);
            if (squareToJump2.piece === EMPTY || !squareToJump2.isMyPiece) {
                allowedMoves.push({ row: squareToJump2.row, column: squareToJump2.column })
            }
        }
    }

    return allowedMoves;
};

const calculateKingMoves = (board, selectedSquare) => {
    const allowedMoves = [];
    const stepVariation = [-1, 0, 1];

    for (let var1 of stepVariation) {
        for (let var2 of stepVariation) {
            if (!getPiece(board, selectedSquare, var1, var2).isMyPiece) {
                allowedMoves.push({ row: selectedSquare.row + var1, column: selectedSquare.column + var2 })
            }
        }
    }
    return allowedMoves;
};

const calculateQueenMoves = (board, selectedSquare) => {
    return [...calculateBishopMoves(board, selectedSquare), ...calculateRookMoves(board, selectedSquare)];
};
