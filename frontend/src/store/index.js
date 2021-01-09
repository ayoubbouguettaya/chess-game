import React, { useMemo, useReducer, createContext } from 'react';

import { gameReducer } from './reducer';

const gameContext = createContext();

const { Provider } = gameContext;
const initialState = {
    board: [],
    myPlayer: 0,
    gameNumber: 0,
    selectedSquares: undefined,
    allowedSquare: [],
    isMyTurn: undefined,
    readyGame: false,
}

const GameProvider = ({ children }) => {
    const [gameState, dispatch] = useReducer(gameReducer, initialState);
    const contextValue = useMemo(() => ({ gameState, dispatch }), [gameState, dispatch]);
    return (
        <Provider value={contextValue} >
            {children}
        </Provider>);
}

export { gameContext, GameProvider };
