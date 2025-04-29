import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { Container } from '@mui/material';
import { CheckupProvider } from './context/CheckupContext';

// Import components
import Navbar from './components/Navbar';
import Dashboard from './pages/Dashboard';
import Checkups from './pages/Checkups';
import Reminders from './pages/Reminders';
import History from './pages/History';

// Create a theme
const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#f50057',
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <CheckupProvider>
        <Router>
          <Navbar />
          <Container sx={{ mt: 4, mb: 4 }}>
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/checkups" element={<Checkups />} />
              <Route path="/reminders" element={<Reminders />} />
              <Route path="/history" element={<History />} />
            </Routes>
          </Container>
        </Router>
      </CheckupProvider>
    </ThemeProvider>
  );
}

export default App;
