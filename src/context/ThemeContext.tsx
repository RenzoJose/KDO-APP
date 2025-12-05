import { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';

type ThemeMode = 'light' | 'dark';

interface ThemeContextType {
    mode: ThemeMode;
    toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const useThemeMode = () => {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error('useThemeMode must be used within ThemeProvider');
    }
    return context;
};

interface ThemeProviderProps {
    children: ReactNode;
}

export const ThemeModeProvider = ({ children }: ThemeProviderProps) => {
    // Detectar preferencia del sistema o usar localStorage
    const getInitialMode = (): ThemeMode => {
        const savedMode = localStorage.getItem('theme-mode');
        if (savedMode === 'light' || savedMode === 'dark') {
            return savedMode;
        }

        // Detectar preferencia del sistema
        if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
            return 'dark';
        }

        return 'light';
    };

    const [mode, setMode] = useState<ThemeMode>(getInitialMode);

    // Persistir la preferencia en localStorage
    useEffect(() => {
        localStorage.setItem('theme-mode', mode);
    }, [mode]);

    const toggleTheme = () => {
        setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
    };

    return (
        <ThemeContext.Provider value={{ mode, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};
