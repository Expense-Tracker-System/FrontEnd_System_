// ModeContext.js
import React, { createContext, useState } from 'react';

const ModeContext = createContext();

export const ModeProvider = ({ children }) => {
    const [mode, setMode] = useState(localStorage.getItem('mode') || 'user');

    const toggleMode = () => {
        const newMode = mode === 'admin' ? 'user' : 'admin';
        setMode(newMode);
        localStorage.setItem('mode', newMode);
    };

    return (
        <ModeContext.Provider value={{ mode, toggleMode }}>
            {children}
        </ModeContext.Provider>
    );
};

export default ModeContext;
