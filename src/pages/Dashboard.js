import React from 'react';
import { 
  Container, 
  Typography, 
  Grid, 
  Card, 
  CardContent, 
  CardHeader,
  Button,
  List,
  ListItem,
  ListItemText,
  Divider,
  Box
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useCheckupContext } from '../context/CheckupContext';
import { formatDate, daysUntil } from '../utils/dateUtils';

const Dashboard = () => {
  const navigate = useNavigate();
  const { 
    checkups, 
    reminders, 
    getUpcomingCheckups 
  } = useCheckupContext();

  const upcomingCheckups = getUpcomingCheckups().sort((a, b) => new Date(a.date) - new Date(b.date)).slice(0, 5);
  
  // Count checkups by category
  const checkupsByCategory = checkups.reduce((acc, checkup) => {
    acc[checkup.category] = (acc[checkup.category] || 0) + 1;
    return acc;
  }, {});

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" gutterBottom>
        Dashboard
      </Typography>
      
      <Grid container spacing={3}>
        {/* Summary Cards */}
        <Grid item xs={12} md={4}>
          <Card>
            <CardHeader title="Checkups" />
            <CardContent>
              <Typography variant="h3" align="center">
                {checkups.length}
              </Typography>
              <Typography variant="body2" color="text.secondary" align="center">
                Total checkups recorded
              </Typography>
              <Button 
                variant="contained" 
                fullWidth 
                sx={{ mt: 2 }}
                onClick={() => navigate('/checkups')}
              >
                View All Checkups
              </Button>
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={12} md={4}>
          <Card>
            <CardHeader title="Reminders" />
            <CardContent>
              <Typography variant="h3" align="center">
                {reminders.length}
              </Typography>
              <Typography variant="body2" color="text.secondary" align="center">
                Active reminders
              </Typography>
              <Button 
                variant="contained" 
                fullWidth 
                sx={{ mt: 2 }}
                onClick={() => navigate('/reminders')}
              >
                Manage Reminders
              </Button>
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={12} md={4}>
          <Card>
            <CardHeader title="Categories" />
            <CardContent>
              <Typography variant="h3" align="center">
                {Object.keys(checkupsByCategory).length}
              </Typography>
              <Typography variant="body2" color="text.secondary" align="center">
                Different checkup categories
              </Typography>
              <Button 
                variant="contained" 
                fullWidth 
                sx={{ mt: 2 }}
                onClick={() => navigate('/history')}
              >
                View History
              </Button>
            </CardContent>
          </Card>
        </Grid>
        
        {/* Upcoming Checkups */}
        <Grid item xs={12}>
          <Card>
            <CardHeader 
              title="Upcoming Checkups" 
              action={
                <Button 
                  variant="text" 
                  onClick={() => navigate('/checkups/add')}
                >
                  Add New
                </Button>
              }
            />
            <CardContent>
              {upcomingCheckups.length > 0 ? (
                <List>
                  {upcomingCheckups.map((checkup) => (
                    <React.Fragment key={checkup.id}>
                      <ListItem 
                        button 
                        onClick={() => navigate(`/checkups/${checkup.id}`)}
                      >
                        <ListItemText 
                          primary={checkup.title} 
                          secondary={
                            <Box component="span">
                              <Typography component="span" variant="body2" color="text.primary">
                                {checkup.category}
                              </Typography>
                              {" — "}{formatDate(checkup.date)} 
                              {" ("}
                              {daysUntil(checkup.date)} days from now
                              {")"}
                            </Box>
                          }
                        />
                      </ListItem>
                      <Divider />
                    </React.Fragment>
                  ))}
                </List>
              ) : (
                <Typography variant="body1" align="center">
                  No upcoming checkups. Schedule one now!
                </Typography>
              )}
              {upcomingCheckups.length > 0 && (
                <Button 
                  variant="text" 
                  fullWidth 
                  sx={{ mt: 2 }}
                  onClick={() => navigate('/checkups')}
                >
                  View All
                </Button>
              )}
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Dashboard;
