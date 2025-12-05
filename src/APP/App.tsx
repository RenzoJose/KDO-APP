import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { BrowserRouter, Routes, Route, Link, Navigate, useLocation } from 'react-router-dom'
import { ThemeProvider, CssBaseline, AppBar, Toolbar, Typography, Button, Container } from '@mui/material'
import { useMemo } from 'react'
import InscripcionPage from '../modules/Inscripcion/pages/InscripcionPage'
import InscripcionFormPage from '../modules/Inscripcion/pages/InscripcionFormPage'
import Dashboard from '../modules/Dashboard/Dashboard'
import { useThemeMode } from '../context/ThemeContext'
import { getTheme } from '../theme/theme'
import ThemeToggle from '../components/ThemeToggle'

// Create a client
const queryClient = new QueryClient()

function AppContent() {
  const location = useLocation();
  const { mode } = useThemeMode();

  // Crear tema dinámico basado en el modo actual
  const theme = useMemo(() => getTheme(mode), [mode]);

  // Determine current view based on location
  const currentView = location.pathname.startsWith('/inscripciones') ? 'inscripciones' : 'dashboard';

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppBar
        position="static"
        elevation={0}
        sx={{
          background: mode === 'light'
            ? 'linear-gradient(135deg, #2563eb 0%, #7c3aed 100%)'
            : 'linear-gradient(135deg, #06b6d4 0%, #a78bfa 100%)',
          backdropFilter: 'blur(10px)',
        }}
      >
        <Toolbar>
          <Typography
            variant="h6"
            component="div"
            sx={{
              flexGrow: 1,
              fontWeight: 700,
              letterSpacing: '0.5px',
            }}
          >
            🥋 KDO App
          </Typography>
          <Button
            component={Link}
            to="/dashboard"
            color="inherit"
            sx={{
              fontWeight: currentView === 'dashboard' ? 700 : 400,
              borderBottom: currentView === 'dashboard' ? '2px solid white' : 'none',
            }}
          >
            Dashboard
          </Button>
          <Button
            component={Link}
            to="/inscripciones"
            color="inherit"
            sx={{
              fontWeight: currentView === 'inscripciones' ? 700 : 400,
              borderBottom: currentView === 'inscripciones' ? '2px solid white' : 'none',
              mx: 2,
            }}
          >
            Inscripciones
          </Button>
          <ThemeToggle />
        </Toolbar>
      </AppBar>
      <Container maxWidth="xl" sx={{ height: 'calc(100vh - 64px)', display: 'flex', flexDirection: 'column', py: 2 }}>
        <Routes>
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/inscripciones" element={<InscripcionPage />} />
          <Route path="/inscripciones/nueva" element={<InscripcionFormPage />} />
          <Route path="/inscripciones/editar/:id" element={<InscripcionFormPage />} />
        </Routes>
      </Container>
    </ThemeProvider>
  )
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  )
}

export default App
