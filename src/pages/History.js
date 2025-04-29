import React, { useState } from 'react';
import { 
  Container, 
  Typography, 
  Grid, 
  Card, 
  CardContent,
  List,
  ListItem,
  ListItemText,
  Divider,
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  Chip,
  Paper
} from '@mui/material';
import { useCheckupContext } from '../context/CheckupContext';
import { formatDate } from '../utils/dateUtils';
import EventNoteIcon from '@mui/icons-material/EventNote';

const History = () => {
  const { checkups, getPastCheckups } = useCheckupContext();
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [dateRange, setDateRange] = useState({
    startDate: '',
    endDate: ''
  });

  // Categories for the dropdown
  const categories = [
    'General',
    'Dental',
    'Eye',
    'Cardiology',
    'Dermatology',
    'Orthopedic',
    'Gynecology',
    'Pediatric',
    'Other'
  ];

  // Get past checkups
  const pastCheckups = getPastCheckups();

  // Filter checkups based on category, search term, and date range
  const filteredCheckups = pastCheckups.filter(checkup => {
    const matchesCategory = filter === 'all' || checkup.category === filter;
    const matchesSearch = checkup.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         (checkup.doctor && checkup.doctor.toLowerCase().includes(searchTerm.toLowerCase())) ||
                         (checkup.notes && checkup.notes.toLowerCase().includes(searchTerm.toLowerCase()));
    
    let matchesDateRange = true;
    if (dateRange.startDate) {
      const checkupDate = new Date(checkup.date);
      const startDate = new Date(dateRange.startDate);
      matchesDateRange = checkupDate >= startDate;
    }
    if (dateRange.endDate && matchesDateRange) {
      const checkupDate = new Date(checkup.date);
      const endDate = new Date(dateRange.endDate);
      // Set end date to end of day
      endDate.setHours(23, 59, 59, 999);
      matchesDateRange = checkupDate <= endDate;
    }
    
    return matchesCategory && matchesSearch && matchesDateRange;
  });

  // Sort checkups by date (most recent first)
  const sortedCheckups = [...filteredCheckups].sort((a, b) => new Date(b.date) - new Date(a.date));

  // Group checkups by year and month
  const groupedCheckups = sortedCheckups.reduce((acc, checkup) => {
    const date = new Date(checkup.date);
    const year = date.getFullYear();
    const month = date.toLocaleString('default', { month: 'long' });
    const key = `${year}-${month}`;
    
    if (!acc[key]) {
      acc[key] = {
        title: `${month} ${year}`,
        checkups: []
      };
    }
    
    acc[key].checkups.push(checkup);
    return acc;
  }, {});

  // Get unique years for summary
  const years = [...new Set(pastCheckups.map(checkup => new Date(checkup.date).getFullYear()))].sort((a, b) => b - a);

  // Count checkups by category
  const checkupsByCategory = pastCheckups.reduce((acc, checkup) => {
    acc[checkup.category] = (acc[checkup.category] || 0) + 1;
    return acc;
  }, {});

  const handleDateRangeChange = (e) => {
    const { name, value } = e.target;
    setDateRange({
      ...dateRange,
      [name]: value
    });
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" gutterBottom>
        Health History
      </Typography>
      
      <Grid container spacing={3}>
        {/* Summary */}
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Summary
              </Typography>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2 }}>
                {years.map(year => (
                  <Chip 
                    key={year}
                    label={`${year}: ${pastCheckups.filter(c => new Date(c.date).getFullYear() === year).length} checkups`}
                    color="primary"
                    variant="outlined"
                  />
                ))}
              </Box>
              <Typography variant="subtitle1" gutterBottom>
                By Category:
              </Typography>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                {Object.entries(checkupsByCategory).map(([category, count]) => (
                  <Chip 
                    key={category}
                    label={`${category}: ${count}`}
                    color="secondary"
                    variant="outlined"
                  />
                ))}
              </Box>
            </CardContent>
          </Card>
        </Grid>
        
        {/* Filters */}
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Grid container spacing={2}>
                <Grid item xs={12} md={4}>
                  <TextField
                    fullWidth
                    label="Search history"
                    variant="outlined"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12} md={2}>
                  <FormControl fullWidth variant="outlined">
                    <InputLabel>Category</InputLabel>
                    <Select
                      value={filter}
                      onChange={(e) => setFilter(e.target.value)}
                      label="Category"
                    >
                      <MenuItem value="all">All Categories</MenuItem>
                      {categories.map(category => (
                        <MenuItem key={category} value={category}>{category}</MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} md={3}>
                  <TextField
                    fullWidth
                    label="Start Date"
                    type="date"
                    name="startDate"
                    value={dateRange.startDate}
                    onChange={handleDateRangeChange}
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                </Grid>
                <Grid item xs={12} md={3}>
                  <TextField
                    fullWidth
                    label="End Date"
                    type="date"
                    name="endDate"
                    value={dateRange.endDate}
                    onChange={handleDateRangeChange}
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
        
        {/* History Timeline */}
        <Grid item xs={12}>
          {Object.values(groupedCheckups).length > 0 ? (
            Object.values(groupedCheckups).map((group) => (
              <Paper 
                key={group.title} 
                elevation={1} 
                sx={{ mb: 3, overflow: 'hidden' }}
              >
                <Box 
                  sx={{ 
                    bgcolor: 'primary.main', 
                    color: 'white', 
                    p: 2,
                    display: 'flex',
                    alignItems: 'center'
                  }}
                >
                  <EventNoteIcon sx={{ mr: 1 }} />
                  <Typography variant="h6">
                    {group.title}
                  </Typography>
                </Box>
                <List>
                  {group.checkups.map((checkup) => (
                    <React.Fragment key={checkup.id}>
                      <ListItem>
                        <ListItemText 
                          primary={
                            <Typography variant="h6">
                              {checkup.title}
                            </Typography>
                          } 
                          secondary={
                            <Box>
                              <Typography component="span" variant="body2" color="text.primary">
                                {checkup.category}
                              </Typography>
                              {" — "}{formatDate(checkup.date)}
                              {checkup.doctor && (
                                <Typography variant="body2">
                                  Doctor: {checkup.doctor}
                                </Typography>
                              )}
                              {checkup.location && (
                                <Typography variant="body2">
                                  Location: {checkup.location}
                                </Typography>
                              )}
                              {checkup.notes && (
                                <Typography variant="body2">
                                  Notes: {checkup.notes}
                                </Typography>
                              )}
                            </Box>
                          }
                        />
                      </ListItem>
                      <Divider />
                    </React.Fragment>
                  ))}
                </List>
              </Paper>
            ))
          ) : (
            <Card>
              <CardContent>
                <Typography variant="body1" align="center">
                  No past checkups found. Your health history will appear here after you've had checkups.
                </Typography>
              </CardContent>
            </Card>
          )}
        </Grid>
      </Grid>
    </Container>
  );
};

export default History;
