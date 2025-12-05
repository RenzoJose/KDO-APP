import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './APP/App.tsx'
import { ThemeModeProvider } from './context/ThemeContext'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeModeProvider>
      <App />
    </ThemeModeProvider>
  </StrictMode>,
)
