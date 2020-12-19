import intialiseGame from './function';
import { INITIALIZE_GAME } from './action';

export const gameReducer = (state, action) => {

    switch (action.type) {
        case INITIALIZE_GAME:
            return intialiseGame();
            break;

        default:
            break;
    }
    return state;
};
