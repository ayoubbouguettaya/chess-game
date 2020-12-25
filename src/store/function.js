export const intializeGame = (myPlayer) => {
    let boardGame = [];
    let color = 'black';
    let square;
    let piece;
    let player ;
    let isMyPiece;

    for (let row = 0; row < 8; row++) {
        let rows = []
        for (let column = 0; column < 8; column++) {
            piece = 'empty';
            player = 0;
            isMyPiece = false;

            if (row === 1 || row === 6) {
                piece = 'pawn';
            }

            if (row === 0 || row === 7) {
                if (column === 0 || column === 7) {
                    piece = 'rook';
                }
                if (column === 1 || column === 6) {
                    piece = 'knight';
                }
                if (column === 2 || column === 5) {
                    piece = 'bishop';
                }
                if (column === 3) {
                    piece = 'queen';
                }
                if (column === 4) {
                    piece = 'king';
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

const inverseColor = (colorParams) => {
    return (colorParams === 'black' ? 'white' : 'black');
};

export const movePiece = (board, selectedSquare, nextSquare) => {
    board[nextSquare.row][nextSquare.column].piece = selectedSquare.piece;
    board[nextSquare.row][nextSquare.column].player = selectedSquare.player;
    board[nextSquare.row][nextSquare.column].isMyPiece = true;
    board[selectedSquare.row][selectedSquare.column].piece = 'empty';

    return board;
};

export const calculateAllowedSquare = (board, myPlayer, selectedSquare) => {
    const { piece } = selectedSquare;
    switch (piece) {
        case 'pawn':
            return calculatePawnMoves(board, myPlayer, selectedSquare);
        case 'rook':
            return calculateRookMoves(board, selectedSquare);
        case 'bishop':
            return calculateBishopMoves(board, selectedSquare);
        case 'knight':
            return calculateKnightMoves(board, selectedSquare);
        case 'king':
            return calculateKingMoves(board, selectedSquare);
        case 'queen':
            return calculateQueenMoves(board, selectedSquare);
        default:
            return [];
    }
};

const getPiece = (board, square, addRow = 0, addColumn = 0) => {
    if (square.row + addRow >= 0 && square.row + addRow < 8
        && square.column + addColumn >= 0 && square.column + addColumn < 8) {

        return board[square.row + addRow][square.column + addColumn];
    }
    return { row: -1, column: -1, piece: '', isMyPiece: false }
}

const calculatePawnMoves = (board, myPlayer, selectedSquare) => {
    const allowedMoves = [];
    const stepAhead = (myPlayer === 1) ? -1 : 1;

    if (getPiece(board, selectedSquare, stepAhead, 0).piece === 'empty') {
        allowedMoves.push({ row: selectedSquare.row + stepAhead, column: selectedSquare.column });
    }
    if (!getPiece(board, selectedSquare, stepAhead, 1).isMyPiece && getPiece(board, selectedSquare, stepAhead, 1).piece !== 'empty') {
        allowedMoves.push({ row: selectedSquare.row + stepAhead, column: selectedSquare.column + 1 });
    }
    if (!getPiece(board, selectedSquare, stepAhead, -1).isMyPiece && getPiece(board, selectedSquare, stepAhead, -1).piece !== 'empty') {
        allowedMoves.push({ row: selectedSquare.row + stepAhead, column: selectedSquare.column - 1 });
    }

    return allowedMoves.filter((square) => (square.row >= 0 && square.row < 8 && square.column >= 0 && square.column < 8));
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