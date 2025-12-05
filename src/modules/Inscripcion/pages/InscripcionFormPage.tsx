import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Typography, Box, Snackbar, Alert, Button, Paper } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import InscripcionForm from '../components/InscripcionForm';
import type { InscripcionFormData } from '../types/InscripcionTypes';
import { useCreateInscripcion, useUpdateInscripcion, useInscripcion } from '../../../hooks/useInscripciones';

const InscripcionFormPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const isEditing = Boolean(id);

    const [snackbar, setSnackbar] = useState<{ open: boolean; message: string; severity: 'success' | 'error' }>({
        open: false,
        message: '',
        severity: 'success',
    });

    const createMutation = useCreateInscripcion();
    const updateMutation = useUpdateInscripcion();
    const { data: editingInscripcion } = useInscripcion(id || '');

    const handleCloseSnackbar = () => {
        setSnackbar({ ...snackbar, open: false });
    };

    const handleSubmit = async (data: InscripcionFormData) => {
        try {
            if (isEditing && id) {
                await updateMutation.mutateAsync({ id, data });
                setSnackbar({ open: true, message: 'Inscripción actualizada correctamente', severity: 'success' });
            } else {
                await createMutation.mutateAsync(data);
                setSnackbar({ open: true, message: 'Alumno inscrito correctamente', severity: 'success' });
            }
            // Navigate back to list after short delay
            setTimeout(() => {
                navigate('/inscripciones');
            }, 1500);
        } catch (error) {
            console.error(error);
            setSnackbar({ open: true, message: 'Error al guardar la inscripción', severity: 'error' });
        }
    };

    const handleCancel = () => {
        navigate('/inscripciones');
    };

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: 0 }}>
            <Box sx={{ mb: 3, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Typography variant="h3" component="h1" color="primary" sx={{ fontWeight: 'bold' }}>
                    {isEditing ? '✏️ Editar Inscripción' : '➕ Nueva Inscripción'}
                </Typography>
                <Button
                    variant="outlined"
                    startIcon={<ArrowBackIcon />}
                    onClick={handleCancel}
                    sx={{ fontWeight: 'bold' }}
                >
                    Volver a la Lista
                </Button>
            </Box>

            <Paper
                elevation={3}
                sx={{
                    p: { xs: 2, sm: 3 },
                    maxWidth: 1200,
                    mx: 'auto',
                    width: '100%'
                }}
            >
                <InscripcionForm
                    onSubmit={handleSubmit}
                    initialData={isEditing ? editingInscripcion : null}
                    onCancel={handleCancel}
                    isSubmitting={createMutation.isPending || updateMutation.isPending}
                />
            </Paper>

            <Snackbar open={snackbar.open} autoHideDuration={6000} onClose={handleCloseSnackbar}>
                <Alert onClose={handleCloseSnackbar} severity={snackbar.severity} sx={{ width: '100%' }}>
                    {snackbar.message}
                </Alert>
            </Snackbar>
        </Box>
    );
};

export default InscripcionFormPage;
