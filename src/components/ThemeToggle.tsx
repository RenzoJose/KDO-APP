import { IconButton, Tooltip } from '@mui/material';
import { Brightness4, Brightness7 } from '@mui/icons-material';
import { useThemeMode } from '../context/ThemeContext';

const ThemeToggle = () => {
    const { mode, toggleTheme } = useThemeMode();

    return (
        <Tooltip title={mode === 'light' ? 'Activar modo oscuro' : 'Activar modo claro'}>
            <IconButton
                onClick={toggleTheme}
                color="inherit"
                sx={{
                    transition: 'transform 0.3s ease-in-out',
                    '&:hover': {
                        transform: 'rotate(180deg)',
                    },
                }}
            >
                {mode === 'light' ? <Brightness4 /> : <Brightness7 />}
            </IconButton>
        </Tooltip>
    );
};

export default ThemeToggle;
