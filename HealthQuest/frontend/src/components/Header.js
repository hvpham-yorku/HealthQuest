import React from 'react';
import './Darkmode.css';
import { useDarkMode } from '../context/DarkModeContext';
import './Header.css'; // Importing a separate CSS file for the Header component


const Header = () => {
    const { isDarkMode, toggleDarkMode } = useDarkMode();

    return (
        <header className="header-container">
            <h1 className="title">HealthQuest</h1>
            <label className="darkswitch">
                <input
                    type="checkbox"
                    checked={isDarkMode}
                    onChange={toggleDarkMode}
                />
                <span className="slider" />
            </label>
        </header>
    );
};

export default Header;
