import React, { useState } from 'react';
import { Typography, Box, Snackbar, Alert } from '@mui/material';
import InscripcionList from '../components/InscripcionList';
import { useDeleteInscripcion } from '../../../hooks/useInscripciones';

const InscripcionPage: React.FC = () => {
    const [snackbar, setSnackbar] = useState<{ open: boolean; message: string; severity: 'success' | 'error' }>({
        open: false,
        message: '',
        severity: 'success',
    });

    const deleteMutation = useDeleteInscripcion();

    const handleCloseSnackbar = () => {
        setSnackbar({ ...snackbar, open: false });
    };

    const handleDelete = async (id: string) => {
        if (window.confirm('¿Estás seguro de que deseas eliminar esta inscripción?')) {
            try {
                await deleteMutation.mutateAsync(id);
                setSnackbar({ open: true, message: 'Inscripción eliminada correctamente', severity: 'success' });
            } catch (error) {
                console.error(error);
                setSnackbar({ open: true, message: 'Error al eliminar la inscripción', severity: 'error' });
            }
        }
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

            <Snackbar open={snackbar.open} autoHideDuration={6000} onClose={handleCloseSnackbar}>
                <Alert onClose={handleCloseSnackbar} severity={snackbar.severity} sx={{ width: '100%' }}>
                    {snackbar.message}
                </Alert>
            </Snackbar>
        </Box>
    );
};

export default InscripcionPage;
