import React from 'react';
import { Paper, Typography, Box, CircularProgress, Card, CardContent, Grid } from '@mui/material';
import { useInscripciones } from '../../hooks/useInscripciones';
import PeopleIcon from '@mui/icons-material/People';
import SchoolIcon from '@mui/icons-material/School';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

// Mapeo de colores reales de cinturones
const getBeltColor = (gradoCinturon: string): string => {
    const beltColors: Record<string, string> = {
        'Cinta Blanca': '#FFFFFF',
        'Cinta Amarilla': '#FFD700',
        'Cinta Naranja': '#FF8C00',
        'Cinta Verde': '#22C55E',
        'Cinta Azul': '#3B82F6',
        'Cinta Roja': '#EF4444',
        'Cinta Roja-Negra': 'linear-gradient(90deg, #EF4444 50%, #1F2937 50%)',
        'Cinta Negra 1° Dan': '#1F2937',
        'Cinta Negra 2° Dan': '#1F2937',
        'Cinta Negra 3° Dan': '#1F2937',
    };

    return beltColors[gradoCinturon] || '#6B7280'; // Gris por defecto si no se encuentra
};

const Dashboard: React.FC = () => {
    const { data: inscripciones, isLoading } = useInscripciones();

    if (isLoading) {
        return <CircularProgress />;
    }

    const totalInscritos = inscripciones?.length || 0;
    const escuelasUnicas = new Set(inscripciones?.map(items => items.nombreEscuela)).size;

    // Datos para gráfico de alumnos por escuela
    const alumnosPorEscuela = inscripciones?.reduce((acc, curr) => {
        const escuela = curr.nombreEscuela;
        acc[escuela] = acc[escuela] ? acc[escuela] + 1 : 1;
        return acc;
    }, {} as Record<string, number>);

    const chartData = Object.entries(alumnosPorEscuela || {}).map(([nombre, cantidad]) => ({
        nombre,
        alumnos: cantidad
    }));

    // Datos para gráficos simples (barras con CSS)
    const porCinturon = inscripciones?.reduce((acc, curr) => {
        acc[curr.gradoCinturon] = acc[curr.gradoCinturon] ? acc[curr.gradoCinturon] + 1 : 1;
        return acc;
    }, {} as Record<string, number>);

    return (
        <Box sx={{ flexGrow: 1, mt: 4 }}>
            <Typography variant="h4" gutterBottom component="div">
                Tablero de Control
            </Typography>
            <Grid container spacing={3}>
                <Grid size={{ xs: 12, sm: 6 }}>
                    <Card
                        sx={{
                            bgcolor: 'primary.main',
                            background: (theme) => theme.palette.mode === 'light'
                                ? 'linear-gradient(135deg, #2563eb 0%, #60a5fa 100%)'
                                : 'linear-gradient(135deg, #06b6d4 0%, #22d3ee 100%)',
                            color: 'white',
                            boxShadow: 3,
                        }}
                    >
                        <CardContent>
                            <Box display="flex" alignItems="center" justifyContent="space-between">
                                <div>
                                    <Typography sx={{ opacity: 0.9 }} gutterBottom>
                                        Total Inscritos
                                    </Typography>
                                    <Typography variant="h3" fontWeight={700}>
                                        {totalInscritos}
                                    </Typography>
                                </div>
                                <PeopleIcon sx={{ fontSize: 60, opacity: 0.8 }} />
                            </Box>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid size={{ xs: 12, sm: 6 }}>
                    <Card
                        sx={{
                            bgcolor: 'secondary.main',
                            background: (theme) => theme.palette.mode === 'light'
                                ? 'linear-gradient(135deg, #7c3aed 0%, #a78bfa 100%)'
                                : 'linear-gradient(135deg, #a78bfa 0%, #c4b5fd 100%)',
                            color: 'white',
                            boxShadow: 3,
                        }}
                    >
                        <CardContent>
                            <Box display="flex" alignItems="center" justifyContent="space-between">
                                <div>
                                    <Typography sx={{ opacity: 0.9 }} gutterBottom>
                                        Escuelas Participantes
                                    </Typography>
                                    <Typography variant="h3" fontWeight={700}>
                                        {escuelasUnicas}
                                    </Typography>
                                </div>
                                <SchoolIcon sx={{ fontSize: 60, opacity: 0.8 }} />
                            </Box>
                        </CardContent>
                    </Card>
                </Grid>

                <Grid size={{ xs: 12, md: 6 }}>
                    <Paper sx={{ p: 3 }}>
                        <Typography variant="h6" gutterBottom>
                            Alumnos por Escuela
                        </Typography>
                        <ResponsiveContainer width="100%" height={300}>
                            <BarChart data={chartData}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="nombre" />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                <Bar dataKey="alumnos" fill="#2563eb" name="Cantidad de Alumnos" />
                            </BarChart>
                        </ResponsiveContainer>
                    </Paper>
                </Grid>

                <Grid size={{ xs: 12, md: 6 }}>
                    <Paper sx={{ p: 2 }}>
                        <Typography variant="h6" gutterBottom>
                            Inscritos por Cinturón
                        </Typography>
                        {porCinturon && Object.entries(porCinturon).map(([cinturon, cantidad]) => {
                            const beltColor = getBeltColor(cinturon);
                            const isGradient = beltColor.includes('gradient');
                            const isWhiteBelt = cinturon === 'Cinta Blanca';

                            return (
                                <Box key={cinturon} sx={{ mb: 2 }}>
                                    <Box display="flex" justifyContent="space-between">
                                        <Typography variant="body2">{cinturon}</Typography>
                                        <Typography variant="body2">{cantidad}</Typography>
                                    </Box>
                                    <Box
                                        sx={{
                                            width: '100%',
                                            bgcolor: (theme) => theme.palette.mode === 'light' ? '#e0e0e0' : '#374151',
                                            borderRadius: 1,
                                            height: 10
                                        }}
                                    >
                                        <Box
                                            sx={{
                                                width: `${(cantidad / totalInscritos) * 100}%`,
                                                background: isGradient ? beltColor : undefined,
                                                bgcolor: !isGradient ? beltColor : undefined,
                                                borderRadius: 1,
                                                height: '100%',
                                                // Añadir borde para la cinta blanca para que sea visible
                                                border: isWhiteBelt ? '1px solid #9CA3AF' : 'none',
                                            }}
                                        />
                                    </Box>
                                </Box>
                            )
                        })}
                    </Paper>
                </Grid>
            </Grid>
        </Box>
    );
};

export default Dashboard;
