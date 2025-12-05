import React, { useState, useEffect } from 'react';
import { TextField, Button, MenuItem, Grid, Box } from '@mui/material';
import type { InscripcionFormData, Inscripcion } from '../types/InscripcionTypes';
import { useEscuelas } from '../../../hooks/useEscuelas';

interface InscripcionFormProps {
    onSubmit: (data: InscripcionFormData) => Promise<void>;
    initialData?: Inscripcion | null;
    onCancel?: () => void;
    isSubmitting?: boolean;
}

const initialFormState: InscripcionFormData = {
    nombreEscuela: '',
    nombreAlumno: '',
    apellidoAlumno: '',
    documento: '',
    tipoDocumento: '',
    correoElectronico: '',
    edad: 0,
    peso: 0,
    gradoCinturon: ''
};

const InscripcionForm: React.FC<InscripcionFormProps> = ({ onSubmit, initialData, onCancel, isSubmitting = false }) => {
    const [formData, setFormData] = useState<InscripcionFormData>(initialFormState);
    const [emailError, setEmailError] = useState<string>('');
    const { data: escuelas = [], isLoading: isLoadingEscuelas } = useEscuelas();

    useEffect(() => {
        if (initialData) {
            const { id, fechaInscripcion, ...rest } = initialData;
            setFormData(rest);
        } else {
            setFormData(initialFormState);
        }
    }, [initialData]);

    const validateEmail = (email: string): boolean => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;

        // Validar email en tiempo real
        if (name === 'correoElectronico') {
            if (value && !validateEmail(value)) {
                setEmailError('Por favor, ingrese un correo electrónico válido');
            } else {
                setEmailError('');
            }
        }

        setFormData(prev => ({
            ...prev,
            [name]: name === 'edad' || name === 'peso' ? Number(value) : value
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Validar email antes de enviar
        if (!validateEmail(formData.correoElectronico)) {
            setEmailError('Por favor, ingrese un correo electrónico válido');
            return;
        }

        await onSubmit(formData);
        if (!initialData) {
            setFormData(initialFormState);
            setEmailError('');
        }
    };

    return (
        <Box sx={{ width: '100%' }}>
            <form onSubmit={handleSubmit}>
                <Grid container spacing={2}>
                    <Grid size={{ xs: 12, sm: 6 }}>
                        <TextField
                            select
                            fullWidth
                            label="Nombre de Escuela"
                            name="nombreEscuela"
                            value={formData.nombreEscuela}
                            onChange={handleChange}
                            required
                            disabled={isLoadingEscuelas}
                            helperText={isLoadingEscuelas ? 'Cargando escuelas...' : ''}
                        >
                            {escuelas.map((escuela) => (
                                <MenuItem key={escuela.id} value={escuela.nombre}>
                                    {escuela.nombre} - {escuela.ciudad}, {escuela.pais}
                                </MenuItem>
                            ))}
                        </TextField>
                    </Grid>
                    <Grid size={{ xs: 12, sm: 6 }}>
                        <TextField
                            fullWidth
                            label="Nombre del Alumno"
                            name="nombreAlumno"
                            value={formData.nombreAlumno}
                            onChange={handleChange}
                            required
                        />
                    </Grid>
                    <Grid size={{ xs: 12, sm: 6 }}>
                        <TextField
                            fullWidth
                            label="Apellido del Alumno"
                            name="apellidoAlumno"
                            value={formData.apellidoAlumno}
                            onChange={handleChange}
                            required
                        />
                    </Grid>
                    <Grid size={{ xs: 12, sm: 6 }}>
                        <TextField
                            select
                            fullWidth
                            label="Tipo de Documento"
                            name="tipoDocumento"
                            value={formData.tipoDocumento}
                            onChange={handleChange}
                            required
                        >
                            <MenuItem value="RUT">RUT</MenuItem>
                            <MenuItem value="Pasaporte">Pasaporte</MenuItem>
                            <MenuItem value="DNI">DNI</MenuItem>
                        </TextField>
                    </Grid>
                    <Grid size={{ xs: 12, sm: 6 }}>
                        <TextField
                            fullWidth
                            label="Documento"
                            name="documento"
                            value={formData.documento}
                            onChange={handleChange}
                            required
                        />
                    </Grid>
                    <Grid size={{ xs: 12, sm: 6 }}>
                        <TextField
                            fullWidth
                            label="Correo Electrónico"
                            name="correoElectronico"
                            type="email"
                            value={formData.correoElectronico}
                            onChange={handleChange}
                            required
                            error={!!emailError}
                            helperText={emailError}
                        />
                    </Grid>
                    <Grid size={{ xs: 12, sm: 6 }}>
                        <TextField
                            fullWidth
                            label="Edad"
                            name="edad"
                            type="number"
                            value={formData.edad || ''}
                            onChange={handleChange}
                            required
                            InputProps={{ inputProps: { min: 5, max: 100 } }}
                        />
                    </Grid>
                    <Grid size={{ xs: 12, sm: 6 }}>
                        <TextField
                            fullWidth
                            label="Peso (kg)"
                            name="peso"
                            type="number"
                            value={formData.peso || ''}
                            onChange={handleChange}
                            required
                            InputProps={{ inputProps: { step: 0.1, min: 20, max: 200 } }}
                        />
                    </Grid>
                    <Grid size={{ xs: 12 }}>
                        <TextField
                            select
                            fullWidth
                            label="Grado / Cinturón"
                            name="gradoCinturon"
                            value={formData.gradoCinturon}
                            onChange={handleChange}
                            required
                        >
                            <MenuItem value="Cinta Blanca">Cinta Blanca</MenuItem>
                            <MenuItem value="Cinta Amarilla">Cinta Amarilla</MenuItem>
                            <MenuItem value="Cinta Naranja">Cinta Naranja</MenuItem>
                            <MenuItem value="Cinta Verde">Cinta Verde</MenuItem>
                            <MenuItem value="Cinta Azul">Cinta Azul</MenuItem>
                            <MenuItem value="Cinta Roja">Cinta Roja</MenuItem>
                            <MenuItem value="Cinta Roja-Negra">Cinta Roja-Negra</MenuItem>
                            <MenuItem value="Cinta Negra 1° Dan">Cinta Negra 1° Dan</MenuItem>
                            <MenuItem value="Cinta Negra 2° Dan">Cinta Negra 2° Dan</MenuItem>
                            <MenuItem value="Cinta Negra 3° Dan">Cinta Negra 3° Dan</MenuItem>
                        </TextField>
                    </Grid>
                    <Grid size={{ xs: 12 }}>
                        <Box display="flex" gap={2} justifyContent="flex-end">
                            {initialData && onCancel && (
                                <Button variant="outlined" color="secondary" onClick={onCancel}>
                                    Cancelar
                                </Button>
                            )}
                            <Button
                                type="submit"
                                variant="contained"
                                color="primary"
                                disabled={isSubmitting}
                            >
                                {isSubmitting ? 'Guardando...' : (initialData ? 'Actualizar' : 'Inscribir')}
                            </Button>
                        </Box>
                    </Grid>
                </Grid>
            </form>
        </Box>
    );
};

export default InscripcionForm;
