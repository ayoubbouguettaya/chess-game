import React from 'react';
import styles from '../home.module.css';

const TurnIndicator = ({name,isMyTurn}) => {
    return (
        <div className={styles.indicator_container} >
            {name}{isMyTurn && ' (is my turn) '}
        </div>
    )
}

export default TurnIndicator;
