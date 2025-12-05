import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { DataGrid, GridActionsCellItem } from '@mui/x-data-grid';
import type { GridColDef } from '@mui/x-data-grid';
import { useInscripciones } from '../../../hooks/useInscripciones';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import VisibilityIcon from '@mui/icons-material/Visibility';
import {
    Paper,
    CircularProgress,
    Alert,
    Box,
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Typography,
    Divider,
    Stack
} from '@mui/material';

interface InscripcionListProps {
    onDelete: (id: string) => void;
}

interface Inscripcion {
    id: string;
    nombreEscuela: string;
    nombreAlumno: string;
    apellidoAlumno: string;
    documento: string;
    tipoDocumento: string;
    correoElectronico: string;
    edad: number;
    peso: number;
    gradoCinturon: string;
    fechaInscripcion?: string;
}

const InscripcionList: React.FC<InscripcionListProps> = ({ onDelete }) => {
    const navigate = useNavigate();
    const { data: inscripciones, isLoading, isError } = useInscripciones();
    const [openModal, setOpenModal] = useState(false);
    const [selectedInscripcion, setSelectedInscripcion] = useState<Inscripcion | null>(null);

    const handleViewDetails = (inscripcion: Inscripcion) => {
        setSelectedInscripcion(inscripcion);
        setOpenModal(true);
    };

    const handleCloseModal = () => {
        setOpenModal(false);
        setSelectedInscripcion(null);
    };

    const columns: GridColDef[] = [
        {
            field: 'id',
            headerName: 'ID',
            width: 70,
            align: 'center',
            headerAlign: 'center',
        },
        {
            field: 'nombreEscuela',
            headerName: 'Escuela',
            flex: 1,
            minWidth: 180,
            headerAlign: 'center',
        },
        {
            field: 'nombreAlumno',
            headerName: 'Nombre',
            flex: 0.7,
            minWidth: 120,
            headerAlign: 'center',
        },
        {
            field: 'apellidoAlumno',
            headerName: 'Apellido',
            flex: 0.7,
            minWidth: 120,
            headerAlign: 'center',
        },
        {
            field: 'documento',
            headerName: 'Documento',
            width: 130,
            align: 'center',
            headerAlign: 'center',
        },
        {
            field: 'gradoCinturon',
            headerName: 'Grado',
            flex: 0.8,
            minWidth: 140,
            headerAlign: 'center',
        },
        {
            field: 'edad',
            headerName: 'Edad',
            type: 'number',
            width: 80,
            align: 'center',
            headerAlign: 'center',
        },
        {
            field: 'actions',
            type: 'actions',
            headerName: 'Acciones',
            width: 120,
            headerAlign: 'center',
            getActions: (params) => [
                <GridActionsCellItem
                    icon={<VisibilityIcon sx={{ color: 'info.main' }} />}
                    label="Ver Detalles"
                    onClick={() => handleViewDetails(params.row as Inscripcion)}
                    showInMenu={false}
                />,
                <GridActionsCellItem
                    icon={<EditIcon sx={{ color: 'primary.main' }} />}
                    label="Editar"
                    onClick={() => navigate(`/inscripciones/editar/${params.id}`)}
                    showInMenu={false}
                />,
                <GridActionsCellItem
                    icon={<DeleteIcon sx={{ color: 'error.main' }} />}
                    label="Eliminar"
                    onClick={() => onDelete(params.id as string)}
                    showInMenu={false}
                />,
            ],
        },
    ];

    if (isLoading) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" p={4}>
                <CircularProgress />
            </Box>
        );
    }

    if (isError) {
        return (
            <Box display="flex" justifyContent="center" p={2}>
                <Alert severity="error" sx={{ width: '100%', maxWidth: 600 }}>
                    Error al cargar las inscripciones
                </Alert>
            </Box>
        );
    }

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                width: '100%',
                px: { xs: 1, sm: 2, md: 3 },
                gap: 2,
            }}
        >
            <Box
                sx={{
                    width: '100%',
                    maxWidth: 1400,
                    display: 'flex',
                    justifyContent: 'flex-end',
                }}
            >
                <Button
                    variant="contained"
                    color="primary"
                    startIcon={<AddIcon />}
                    onClick={() => navigate('/inscripciones/nueva')}
                    sx={{
                        px: 3,
                        py: 1,
                        fontWeight: 'bold',
                        boxShadow: 3,
                        '&:hover': {
                            boxShadow: 6,
                            transform: 'translateY(-2px)',
                            transition: 'all 0.2s ease-in-out',
                        },
                    }}
                >
                    Nueva Inscripción
                </Button>
            </Box>
            <Paper
                elevation={3}
                sx={{
                    width: '100%',
                    maxWidth: 1400,
                    overflow: 'hidden',
                    borderRadius: 2,
                    '& .MuiDataGrid-root': {
                        border: 'none',
                    },
                    '& .MuiDataGrid-cell': {
                        borderBottom: '1px solid rgba(224, 224, 224, 0.4)',
                    },
                    '& .MuiDataGrid-columnHeaders': {
                        backgroundColor: 'primary.main',
                        color: 'white',
                        fontSize: '0.95rem',
                        fontWeight: 600,
                        borderRadius: 0,
                    },
                    '& .MuiDataGrid-columnHeaderTitle': {
                        fontWeight: 600,
                    },
                    '& .MuiDataGrid-row': {
                        '&:hover': {
                            backgroundColor: 'action.hover',
                            cursor: 'pointer',
                            transition: 'background-color 0.2s ease',
                        },
                        '&.Mui-selected': {
                            backgroundColor: 'action.selected',
                            '&:hover': {
                                backgroundColor: 'action.selected',
                            },
                        },
                    },
                    '& .MuiDataGrid-footerContainer': {
                        borderTop: '2px solid rgba(224, 224, 224, 0.8)',
                        backgroundColor: 'background.paper',
                    },
                    '& .MuiTablePagination-root': {
                        color: 'text.primary',
                    },
                }}
            >
                <DataGrid
                    rows={inscripciones || []}
                    columns={columns}
                    initialState={{
                        pagination: {
                            paginationModel: { page: 0, pageSize: 5 },
                        },
                    }}
                    pageSizeOptions={[5, 10, 20]}
                    disableRowSelectionOnClick
                    autoHeight
                    sx={{
                        '& .MuiDataGrid-cell:focus': {
                            outline: 'none',
                        },
                        '& .MuiDataGrid-cell:focus-within': {
                            outline: 'none',
                        },
                    }}
                />
            </Paper>

            {/* Modal para visualizar detalles */}
            <Dialog
                open={openModal}
                onClose={handleCloseModal}
                maxWidth="md"
                fullWidth
                TransitionProps={{
                    timeout: 200
                }}
                PaperProps={{
                    sx: {
                        borderRadius: 2,
                        boxShadow: 24,
                    }
                }}
            >
                <DialogTitle
                    sx={{
                        backgroundColor: 'primary.main',
                        color: 'white',
                        fontWeight: 'bold',
                        fontSize: '1.5rem',
                    }}
                >
                    Detalles de Inscripción
                </DialogTitle>
                <DialogContent sx={{ mt: 2 }}>
                    {selectedInscripcion && (
                        <Stack spacing={3}>
                            {/* Datos del Alumno */}
                            <Box>
                                <Typography variant="h6" color="primary" gutterBottom>
                                    Datos del Alumno
                                </Typography>
                                <Divider sx={{ mb: 2 }} />
                                <Stack spacing={2}>
                                    <Box>
                                        <Typography variant="body2" color="text.secondary">
                                            ID
                                        </Typography>
                                        <Typography variant="body1" fontWeight="bold">
                                            {selectedInscripcion.id}
                                        </Typography>
                                    </Box>

                                    <Box>
                                        <Typography variant="body2" color="text.secondary">
                                            Nombre Completo
                                        </Typography>
                                        <Typography variant="body1" fontWeight="bold">
                                            {selectedInscripcion.nombreAlumno} {selectedInscripcion.apellidoAlumno}
                                        </Typography>
                                    </Box>

                                    <Box>
                                        <Typography variant="body2" color="text.secondary">
                                            Documento
                                        </Typography>
                                        <Typography variant="body1" fontWeight="bold">
                                            {selectedInscripcion.documento}
                                        </Typography>
                                    </Box>

                                    <Box>
                                        <Typography variant="body2" color="text.secondary">
                                            Tipo de Documento
                                        </Typography>
                                        <Typography variant="body1" fontWeight="bold">
                                            {selectedInscripcion.tipoDocumento}
                                        </Typography>
                                    </Box>

                                    <Box>
                                        <Typography variant="body2" color="text.secondary">
                                            Correo Electrónico
                                        </Typography>
                                        <Typography variant="body1" fontWeight="bold">
                                            {selectedInscripcion.correoElectronico}
                                        </Typography>
                                    </Box>

                                    <Stack direction="row" spacing={4}>
                                        <Box>
                                            <Typography variant="body2" color="text.secondary">
                                                Edad
                                            </Typography>
                                            <Typography variant="body1" fontWeight="bold">
                                                {selectedInscripcion.edad} años
                                            </Typography>
                                        </Box>

                                        <Box>
                                            <Typography variant="body2" color="text.secondary">
                                                Peso
                                            </Typography>
                                            <Typography variant="body1" fontWeight="bold">
                                                {selectedInscripcion.peso} kg
                                            </Typography>
                                        </Box>
                                    </Stack>
                                </Stack>
                            </Box>

                            {/* Información Académica */}
                            <Box>
                                <Typography variant="h6" color="primary" gutterBottom>
                                    Información Académica
                                </Typography>
                                <Divider sx={{ mb: 2 }} />
                                <Stack spacing={2}>
                                    <Box>
                                        <Typography variant="body2" color="text.secondary">
                                            Escuela
                                        </Typography>
                                        <Typography variant="body1" fontWeight="bold">
                                            {selectedInscripcion.nombreEscuela}
                                        </Typography>
                                    </Box>

                                    <Box>
                                        <Typography variant="body2" color="text.secondary">
                                            Grado de Cinturón
                                        </Typography>
                                        <Typography variant="body1" fontWeight="bold">
                                            {selectedInscripcion.gradoCinturon}
                                        </Typography>
                                    </Box>

                                    {selectedInscripcion.fechaInscripcion && (
                                        <Box>
                                            <Typography variant="body2" color="text.secondary">
                                                Fecha de Inscripción
                                            </Typography>
                                            <Typography variant="body1" fontWeight="bold">
                                                {new Date(selectedInscripcion.fechaInscripcion).toLocaleDateString('es-ES', {
                                                    year: 'numeric',
                                                    month: 'long',
                                                    day: 'numeric',
                                                    hour: '2-digit',
                                                    minute: '2-digit'
                                                })}
                                            </Typography>
                                        </Box>
                                    )}
                                </Stack>
                            </Box>
                        </Stack>
                    )}
                </DialogContent>
                <DialogActions sx={{ p: 2, gap: 1 }}>
                    <Button
                        onClick={handleCloseModal}
                        variant="outlined"
                        color="primary"
                    >
                        Cerrar
                    </Button>
                    {selectedInscripcion && (
                        <Button
                            onClick={() => {
                                navigate(`/inscripciones/editar/${selectedInscripcion.id}`);
                                handleCloseModal();
                            }}
                            variant="contained"
                            color="primary"
                            startIcon={<EditIcon />}
                        >
                            Editar
                        </Button>
                    )}
                </DialogActions>
            </Dialog>
        </Box>
    );
};

export default InscripcionList;
