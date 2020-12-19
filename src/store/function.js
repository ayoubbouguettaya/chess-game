const intializeGame = () => {
    let boardGame = [];
    let color = 'black';
    let player = 2;
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
                player = 1;
            }

            square = { color, piece, player, row, column };
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
    if(selectedSquare && square.row === selectedSquare.row && square.column == selectedSquare.column){
        return true;
    }

    return false;
}

export default intializeGame;
