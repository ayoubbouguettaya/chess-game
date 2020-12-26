import React, { useContext } from 'react';

import styles from './home.module.css';
import Board from '../UI/board';
import { gameContext } from '../../store';

const HomeComponent = () => {
    const { gameState: { myPlayer, allowedSquares } } = useContext(gameContext);

    return (
        <div className={styles.home_container} >
            <div className={styles.board_container}>
                <Board />
            </div>
            <div>
                <h2>Player: {myPlayer}</h2>
                <h2 style={{fontWeight: '300'}}>Allowed movement</h2>
                {allowedSquares && allowedSquares.map(((square,index) => <p key={index}>{`${square.row} : ${square.column}`}</p>))}
            </div>
        </div>
    )
}

export default HomeComponent;
