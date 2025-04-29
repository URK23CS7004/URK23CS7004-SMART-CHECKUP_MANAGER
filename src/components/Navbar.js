import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';

const Navbar = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        <CalendarMonthIcon sx={{ mr: 2 }} />
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Smart Checkup Manager
        </Typography>
        <Box>
          <Button 
            color="inherit" 
            component={RouterLink} 
            to="/"
          >
            Dashboard
          </Button>
          <Button 
            color="inherit" 
            component={RouterLink} 
            to="/checkups"
          >
            Checkups
          </Button>
          <Button 
            color="inherit" 
            component={RouterLink} 
            to="/reminders"
          >
            Reminders
          </Button>
          <Button 
            color="inherit" 
            component={RouterLink} 
            to="/history"
          >
            History
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
