import React,{useState} from 'react';

import styles from './square.module.css';

const Square = ({ color, piece, player, row, column }) => {
    const  [isChecked,setIsChecked] = useState(false);    
    
    const imageSrc = `/assets/${piece}${player === 2 ? '_' : ''}.png`;
    
    const handleSelect = () => {
        setIsChecked((state) => !state);
    }
    
    return (
        <div 
        className={`${styles.square} ${isChecked ? styles.is_checked : ''} ${color === 'black' ? styles.square_black : styles.square_white}`}
        onClick={handleSelect}
        >
            {(piece !== 'empty') ? <img src={imageSrc}/> : '.'} 
        </div>
    );
};

export default Square;
