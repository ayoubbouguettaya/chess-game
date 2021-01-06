import { BLACK, WHITE } from './constants';

export const inverseColor = (colorParams) => {
    return (colorParams === BLACK ? WHITE : BLACK);
};

export const getPiece = (board, square, addRow = 0, addColumn = 0) => {
    if (square.row + addRow >= 0 && square.row + addRow < 8
        && square.column + addColumn >= 0 && square.column + addColumn < 8) {

        return board[square.row + addRow][square.column + addColumn];
    }
    return { row: -1, column: -1, piece: '', isMyPiece: false }
}

export const filterAllowedMoves = (allowedMoves) => {
    return allowedMoves.filter((square) => (square.row >= 0 && square.row < 8 && square.column >= 0 && square.column < 8));
}

export const IsInboundaries = ({ row, column }, addRow = 0, addColumn = 0) => {
    if (row + addRow >= 0 && row + addRow < 8
        && column + addColumn >= 0 && column + addColumn < 8) {
        return true;
    }

    return false;
};
