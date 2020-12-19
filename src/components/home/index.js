import React from 'react';

import styles from './home.module.css';
import Board from '../UI/board';

const HomeComponent = () => {
    return (
        <div className={styles.home_container} >
            <div className={styles.board_container}>
                <Board />
            </div>
        </div>
    )
}

export default HomeComponent;
