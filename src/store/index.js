import React, { useMemo, useReducer, createContext } from 'react';

import { gameReducer } from './reducer';

const gameContext = createContext();

const { Provider } = gameContext;
const initialState = {
    board: [],
    myPlayer: 1,
    selectedSquare: undefined,
    allowedSquare: [],
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
