import { createTheme } from '@mui/material/styles';
import type { ThemeOptions } from '@mui/material/styles';

// Paleta de colores mejorada para Light Mode
const lightThemeOptions: ThemeOptions = {
    palette: {
        mode: 'light',
        primary: {
            main: '#2563eb', // Azul vibrante moderno
            light: '#60a5fa',
            dark: '#1e40af',
            contrastText: '#ffffff',
        },
        secondary: {
            main: '#7c3aed', // Púrpura moderno
            light: '#a78bfa',
            dark: '#5b21b6',
            contrastText: '#ffffff',
        },
        background: {
            default: '#f8fafc',
            paper: '#ffffff',
        },
        text: {
            primary: '#1e293b',
            secondary: '#64748b',
        },
        error: {
            main: '#ef4444',
        },
        warning: {
            main: '#f59e0b',
        },
        info: {
            main: '#06b6d4',
        },
        success: {
            main: '#10b981',
        },
    },
    typography: {
        fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
        h1: {
            fontWeight: 700,
        },
        h2: {
            fontWeight: 700,
        },
        h3: {
            fontWeight: 600,
        },
        h4: {
            fontWeight: 600,
        },
        h5: {
            fontWeight: 600,
        },
        h6: {
            fontWeight: 600,
        },
    },
    shape: {
        borderRadius: 12,
    },
    shadows: [
        'none',
        '0 1px 2px 0 rgb(0 0 0 / 0.05)',
        '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
        '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
        '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
        '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
        '0 25px 50px -12px rgb(0 0 0 / 0.25)',
        '0 25px 50px -12px rgb(0 0 0 / 0.25)',
        '0 25px 50px -12px rgb(0 0 0 / 0.25)',
        '0 25px 50px -12px rgb(0 0 0 / 0.25)',
        '0 25px 50px -12px rgb(0 0 0 / 0.25)',
        '0 25px 50px -12px rgb(0 0 0 / 0.25)',
        '0 25px 50px -12px rgb(0 0 0 / 0.25)',
        '0 25px 50px -12px rgb(0 0 0 / 0.25)',
        '0 25px 50px -12px rgb(0 0 0 / 0.25)',
        '0 25px 50px -12px rgb(0 0 0 / 0.25)',
        '0 25px 50px -12px rgb(0 0 0 / 0.25)',
        '0 25px 50px -12px rgb(0 0 0 / 0.25)',
        '0 25px 50px -12px rgb(0 0 0 / 0.25)',
        '0 25px 50px -12px rgb(0 0 0 / 0.25)',
        '0 25px 50px -12px rgb(0 0 0 / 0.25)',
        '0 25px 50px -12px rgb(0 0 0 / 0.25)',
        '0 25px 50px -12px rgb(0 0 0 / 0.25)',
        '0 25px 50px -12px rgb(0 0 0 / 0.25)',
        '0 25px 50px -12px rgb(0 0 0 / 0.25)',
    ],
};

// Paleta de colores mejorada para Dark Mode
const darkThemeOptions: ThemeOptions = {
    palette: {
        mode: 'dark',
        primary: {
            main: '#06b6d4', // Cyan brillante
            light: '#22d3ee',
            dark: '#0891b2',
            contrastText: '#0f172a',
        },
        secondary: {
            main: '#a78bfa', // Púrpura pastel
            light: '#c4b5fd',
            dark: '#7c3aed',
            contrastText: '#0f172a',
        },
        background: {
            default: '#0f172a',
            paper: '#1e293b',
        },
        text: {
            primary: '#f1f5f9',
            secondary: '#cbd5e1',
        },
        error: {
            main: '#f87171',
        },
        warning: {
            main: '#fbbf24',
        },
        info: {
            main: '#38bdf8',
        },
        success: {
            main: '#34d399',
        },
    },
    typography: {
        fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
        h1: {
            fontWeight: 700,
        },
        h2: {
            fontWeight: 700,
        },
        h3: {
            fontWeight: 600,
        },
        h4: {
            fontWeight: 600,
        },
        h5: {
            fontWeight: 600,
        },
        h6: {
            fontWeight: 600,
        },
    },
    shape: {
        borderRadius: 12,
    },
    shadows: [
        'none',
        '0 1px 2px 0 rgb(0 0 0 / 0.3)',
        '0 1px 3px 0 rgb(0 0 0 / 0.4), 0 1px 2px -1px rgb(0 0 0 / 0.4)',
        '0 4px 6px -1px rgb(0 0 0 / 0.4), 0 2px 4px -2px rgb(0 0 0 / 0.4)',
        '0 10px 15px -3px rgb(0 0 0 / 0.4), 0 4px 6px -4px rgb(0 0 0 / 0.4)',
        '0 20px 25px -5px rgb(0 0 0 / 0.4), 0 8px 10px -6px rgb(0 0 0 / 0.4)',
        '0 25px 50px -12px rgb(0 0 0 / 0.5)',
        '0 25px 50px -12px rgb(0 0 0 / 0.5)',
        '0 25px 50px -12px rgb(0 0 0 / 0.5)',
        '0 25px 50px -12px rgb(0 0 0 / 0.5)',
        '0 25px 50px -12px rgb(0 0 0 / 0.5)',
        '0 25px 50px -12px rgb(0 0 0 / 0.5)',
        '0 25px 50px -12px rgb(0 0 0 / 0.5)',
        '0 25px 50px -12px rgb(0 0 0 / 0.5)',
        '0 25px 50px -12px rgb(0 0 0 / 0.5)',
        '0 25px 50px -12px rgb(0 0 0 / 0.5)',
        '0 25px 50px -12px rgb(0 0 0 / 0.5)',
        '0 25px 50px -12px rgb(0 0 0 / 0.5)',
        '0 25px 50px -12px rgb(0 0 0 / 0.5)',
        '0 25px 50px -12px rgb(0 0 0 / 0.5)',
        '0 25px 50px -12px rgb(0 0 0 / 0.5)',
        '0 25px 50px -12px rgb(0 0 0 / 0.5)',
        '0 25px 50px -12px rgb(0 0 0 / 0.5)',
        '0 25px 50px -12px rgb(0 0 0 / 0.5)',
        '0 25px 50px -12px rgb(0 0 0 / 0.5)',
    ],
};

export const getTheme = (mode: 'light' | 'dark') => {
    return createTheme(mode === 'light' ? lightThemeOptions : darkThemeOptions);
};
