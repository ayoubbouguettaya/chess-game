import React, { useState, useEffect } from 'react'
import styles from './modal.module.css';

const Modal = ({ handleSetPlayerName }) => {
    const [playerName, setPlayerName] = useState('');
    const [showModal, setShowModal] = useState(false);

    const handleInputChange = (event) => {
        event.persist();
        setPlayerName(event.target.value);
    }

    useEffect(() => {
        if (!sessionStorage.getItem('playerName')) {
            setShowModal(true)
        }
    }, []);

    const handleSave = () => {
        sessionStorage.setItem('playerName', playerName);
        handleSetPlayerName(playerName)
        setShowModal(false);
    }

    return (
        <div className={`${styles.modal_container} ${!showModal ? styles.hide_modal : ''}`}>
            <div className={styles.body}>
                <h1>welcome to chess-game</h1>
                <p>Introduce a userName that your opponent will see.</p>
                <input name="playerName" value={playerName} placeholder="player Name" onChange={handleInputChange} />
                <button onClick={handleSave} type='button'>get started</button>
            </div>
        </div>
    )
}

export default Modal
