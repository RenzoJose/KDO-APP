import React from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    DialogActions,
    Button,
    useTheme,
    alpha,
} from '@mui/material';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';

interface ConfirmDialogProps {
    open: boolean;
    title?: string;
    message: string;
    confirmText?: string;
    cancelText?: string;
    onConfirm: () => void;
    onCancel: () => void;
    severity?: 'warning' | 'error' | 'info';
}

const ConfirmDialog: React.FC<ConfirmDialogProps> = ({
    open,
    title = 'Confirmar acción',
    message,
    confirmText = 'Aceptar',
    cancelText = 'Cancelar',
    onConfirm,
    onCancel,
    severity = 'warning',
}) => {
    const theme = useTheme();

    const getSeverityColor = () => {
        switch (severity) {
            case 'error':
                return theme.palette.error.main;
            case 'warning':
                return theme.palette.warning.main;
            case 'info':
                return theme.palette.info.main;
            default:
                return theme.palette.warning.main;
        }
    };

    return (
        <Dialog
            open={open}
            onClose={onCancel}
            maxWidth="xs"
            fullWidth
            PaperProps={{
                sx: {
                    borderRadius: 2,
                    boxShadow: theme.shadows[10],
                },
            }}
        >
            <DialogTitle
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1.5,
                    pb: 1,
                    fontSize: '1.25rem',
                    fontWeight: 600,
                }}
            >
                <WarningAmberIcon
                    sx={{
                        color: getSeverityColor(),
                        fontSize: 28,
                    }}
                />
                {title}
            </DialogTitle>
            <DialogContent>
                <DialogContentText
                    sx={{
                        color: theme.palette.text.primary,
                        fontSize: '1rem',
                    }}
                >
                    {message}
                </DialogContentText>
            </DialogContent>
            <DialogActions sx={{ px: 3, pb: 2, gap: 1 }}>
                <Button
                    onClick={onCancel}
                    variant="outlined"
                    sx={{
                        borderRadius: 1.5,
                        textTransform: 'none',
                        fontWeight: 500,
                        px: 3,
                        '&:hover': {
                            backgroundColor: alpha(theme.palette.text.primary, 0.05),
                        },
                    }}
                >
                    {cancelText}
                </Button>
                <Button
                    onClick={onConfirm}
                    variant="contained"
                    sx={{
                        borderRadius: 1.5,
                        textTransform: 'none',
                        fontWeight: 600,
                        px: 3,
                        backgroundColor: getSeverityColor(),
                        '&:hover': {
                            backgroundColor: alpha(getSeverityColor(), 0.85),
                        },
                    }}
                    autoFocus
                >
                    {confirmText}
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default ConfirmDialog;
