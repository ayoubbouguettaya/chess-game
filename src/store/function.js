export const intializeGame = () => {
    let boardGame = [];
    let color = 'black';
    let isMyPiece = false;
    let piece;
    let square;

    for (let row = 0; row < 8; row++) {
        for (let column = 0; column < 8; column++) {
            piece = 'empty';
            color = inverseColor(color, column);

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

            if (row === 6 || row === 7) {
                isMyPiece = true;
            }

            square = { color, piece, isMyPiece, row, column };
            boardGame.push(square);
        };
    };


    return boardGame;
}

export const inverseColor = (colorParams, columnParms) => {
    if (columnParms !== 0) {
        return (colorParams === 'black' ? 'white' : 'black');
    }
    return colorParams;
};

export const checkIsSelected = (square, selectedSquare) => {
    if (selectedSquare && square.row === selectedSquare.row && square.column === selectedSquare.column) {
        return true;
    }

    return false;
};

export const movePiece =  (board, selectedSquare, nextSquare) => {
    return  board.map((square) => {
        if (square.row === nextSquare.row && square.column === nextSquare.column) {
            square.piece = selectedSquare.piece;
            square.isMyPiece = true;
        }
        if (square.row === selectedSquare.row && square.column === selectedSquare.column) {
            square.piece = 'empty';
        }
        return square;
    });
};

export const getPiece = (board, square, AddRow = 0, AddColumn = 0) => {
    return board.find((board) => (board.row === square.row + AddRow) && (board.column === square.column + AddColumn)) || {};
};

export const calculateAllowedSquare = (board, selectedSquare) => {
    const { piece } = selectedSquare;
    switch (piece) {
        case 'pawn':
            return calculatePawnMoves(board, selectedSquare);
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

const calculatePawnMoves = (board, selectedSquare) => {
    const allowedMoves = [];
    if (getPiece(board, selectedSquare, -1, 0).piece === 'empty') {
        allowedMoves.push({ row: selectedSquare.row - 1, column: selectedSquare.column });
    }
    if (!getPiece(board, selectedSquare, -1, 1).isMyPiece) {
        allowedMoves.push({ row: selectedSquare.row - 1, column: selectedSquare.column + 1 });
    }
    if (!getPiece(board, selectedSquare, -1, -1).isMyPiece) {
        allowedMoves.push({ row: selectedSquare.row - 1, column: selectedSquare.column - 1 });
    }

    return allowedMoves.filter((square) => (square.row >= 0 && square.row < 8 && square.column >= 0 && square.column < 8) );
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