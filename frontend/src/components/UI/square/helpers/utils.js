export const checkIsSelected = (square, selectedSquare) => {
    if (selectedSquare && square.row === selectedSquare.row && square.column === selectedSquare.column) {
        return true;
    }
    return false;
};

export const checkIsHeighlighted = (square, allowedSquares) => {
    if (allowedSquares && allowedSquares.some((allowedSquare) => allowedSquare.row === square.row && allowedSquare.column === square.column)) {
        return true;
    }
    return false;
};