import React, { useState } from 'react';
import { Typography, Box, Snackbar, Alert } from '@mui/material';
import InscripcionList from '../components/InscripcionList';
import { useDeleteInscripcion } from '../../../hooks/useInscripciones';
import ConfirmDialog from '../../../components/ConfirmDialog';

const InscripcionPage: React.FC = () => {
    const [snackbar, setSnackbar] = useState<{ open: boolean; message: string; severity: 'success' | 'error' }>({
        open: false,
        message: '',
        severity: 'success',
    });

    const [confirmDialog, setConfirmDialog] = useState<{ open: boolean; id: string | null }>({
        open: false,
        id: null,
    });

    const deleteMutation = useDeleteInscripcion();

    const handleCloseSnackbar = () => {
        setSnackbar({ ...snackbar, open: false });
    };

    const handleDelete = (id: string) => {
        setConfirmDialog({ open: true, id });
    };

    const handleConfirmDelete = async () => {
        if (confirmDialog.id) {
            try {
                await deleteMutation.mutateAsync(confirmDialog.id);
                setSnackbar({ open: true, message: 'Inscripción eliminada correctamente', severity: 'success' });
            } catch (error) {
                console.error(error);
                setSnackbar({ open: true, message: 'Error al eliminar la inscripción', severity: 'error' });
            }
        }
        setConfirmDialog({ open: false, id: null });
    };

    const handleCancelDelete = () => {
        setConfirmDialog({ open: false, id: null });
    };

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: 0 }}>
            <Typography variant="h3" component="h1" gutterBottom align="center" color="primary" sx={{ fontWeight: 'bold', mb: 1 }}>
                🥋 Torneo de Taekwondo
            </Typography>
            <Typography variant="subtitle1" gutterBottom align="center" color="textSecondary" sx={{ mb: 1.5 }}>
                Sistema de Inscripción y Gestión de Participantes
            </Typography>

            <InscripcionList onDelete={handleDelete} />

            <ConfirmDialog
                open={confirmDialog.open}
                title="Confirmar eliminación"
                message="¿Estás seguro de que deseas eliminar esta inscripción?"
                confirmText="Aceptar"
                cancelText="Cancelar"
                severity="error"
                onConfirm={handleConfirmDelete}
                onCancel={handleCancelDelete}
            />

            <Snackbar open={snackbar.open} autoHideDuration={6000} onClose={handleCloseSnackbar}>
                <Alert onClose={handleCloseSnackbar} severity={snackbar.severity} sx={{ width: '100%' }}>
                    {snackbar.message}
                </Alert>
            </Snackbar>
        </Box>
    );
};

export default InscripcionPage;

