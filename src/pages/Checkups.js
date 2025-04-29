import React, { useState } from 'react';
import { 
  Container, 
  Typography, 
  Grid, 
  Card, 
  CardContent,
  Button,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Divider,
  TextField,
  MenuItem,
  Box,
  Fab,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControl,
  InputLabel,
  Select
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useCheckupContext } from '../context/CheckupContext';
import { formatDate } from '../utils/dateUtils';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

const Checkups = () => {
  const navigate = useNavigate();
  const { 
    checkups, 
    addCheckup,
    updateCheckup,
    deleteCheckup
  } = useCheckupContext();

  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [openDialog, setOpenDialog] = useState(false);
  const [editingCheckup, setEditingCheckup] = useState(null);
  const [checkupData, setCheckupData] = useState({
    title: '',
    category: '',
    doctor: '',
    location: '',
    notes: '',
    date: ''
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

  // Filter checkups based on category and search term
  const filteredCheckups = checkups.filter(checkup => {
    const matchesCategory = filter === 'all' || checkup.category === filter;
    const matchesSearch = checkup.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         (checkup.doctor && checkup.doctor.toLowerCase().includes(searchTerm.toLowerCase())) ||
                         (checkup.notes && checkup.notes.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  // Sort checkups by date (most recent first)
  const sortedCheckups = [...filteredCheckups].sort((a, b) => new Date(b.date) - new Date(a.date));

  const handleOpenDialog = (checkup = null) => {
    if (checkup) {
      // Format the date for the date input (YYYY-MM-DD)
      const dateObj = new Date(checkup.date);
      const formattedDate = dateObj.toISOString().split('T')[0];
      
      setEditingCheckup(checkup);
      setCheckupData({
        title: checkup.title,
        category: checkup.category,
        doctor: checkup.doctor || '',
        location: checkup.location || '',
        notes: checkup.notes || '',
        date: formattedDate
      });
    } else {
      setEditingCheckup(null);
      setCheckupData({
        title: '',
        category: 'General',
        doctor: '',
        location: '',
        notes: '',
        date: new Date().toISOString().split('T')[0]
      });
    }
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCheckupData({
      ...checkupData,
      [name]: value
    });
  };

  const handleSubmit = () => {
    if (editingCheckup) {
      updateCheckup(editingCheckup.id, {
        ...checkupData,
        date: new Date(checkupData.date).toISOString()
      });
    } else {
      addCheckup({
        ...checkupData,
        date: new Date(checkupData.date).toISOString()
      });
    }
    handleCloseDialog();
  };

  const handleDeleteCheckup = (id) => {
    if (window.confirm('Are you sure you want to delete this checkup?')) {
      deleteCheckup(id);
    }
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" gutterBottom>
        Manage Checkups
      </Typography>
      
      <Grid container spacing={3}>
        {/* Filters */}
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Search checkups"
                    variant="outlined"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
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
              </Grid>
            </CardContent>
          </Card>
        </Grid>
        
        {/* Checkups List */}
        <Grid item xs={12}>
          <Card>
            <CardContent>
              {sortedCheckups.length > 0 ? (
                <List>
                  {sortedCheckups.map((checkup) => (
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
                        <ListItemSecondaryAction>
                          <IconButton 
                            edge="end" 
                            aria-label="edit"
                            onClick={() => handleOpenDialog(checkup)}
                          >
                            <EditIcon />
                          </IconButton>
                          <IconButton 
                            edge="end" 
                            aria-label="delete"
                            onClick={() => handleDeleteCheckup(checkup.id)}
                          >
                            <DeleteIcon />
                          </IconButton>
                        </ListItemSecondaryAction>
                      </ListItem>
                      <Divider />
                    </React.Fragment>
                  ))}
                </List>
              ) : (
                <Typography variant="body1" align="center">
                  No checkups found. Add a new checkup to get started!
                </Typography>
              )}
            </CardContent>
          </Card>
        </Grid>
      </Grid>
      
      {/* Add Checkup FAB */}
      <Fab 
        color="primary" 
        aria-label="add"
        sx={{ position: 'fixed', bottom: 16, right: 16 }}
        onClick={() => handleOpenDialog()}
      >
        <AddIcon />
      </Fab>
      
      {/* Add/Edit Checkup Dialog */}
      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
        <DialogTitle>
          {editingCheckup ? 'Edit Checkup' : 'Add New Checkup'}
        </DialogTitle>
        <DialogContent>
          <Box component="form" sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              label="Title"
              name="title"
              value={checkupData.title}
              onChange={handleInputChange}
            />
            <FormControl fullWidth margin="normal">
              <InputLabel>Category</InputLabel>
              <Select
                name="category"
                value={checkupData.category}
                onChange={handleInputChange}
                label="Category"
              >
                {categories.map(category => (
                  <MenuItem key={category} value={category}>{category}</MenuItem>
                ))}
              </Select>
            </FormControl>
            <TextField
              margin="normal"
              fullWidth
              label="Doctor"
              name="doctor"
              value={checkupData.doctor}
              onChange={handleInputChange}
            />
            <TextField
              margin="normal"
              fullWidth
              label="Location"
              name="location"
              value={checkupData.location}
              onChange={handleInputChange}
            />
            <TextField
              margin="normal"
              fullWidth
              label="Date"
              name="date"
              type="date"
              value={checkupData.date}
              onChange={handleInputChange}
              InputLabelProps={{
                shrink: true,
              }}
            />
            <TextField
              margin="normal"
              fullWidth
              label="Notes"
              name="notes"
              multiline
              rows={4}
              value={checkupData.notes}
              onChange={handleInputChange}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button 
            onClick={handleSubmit} 
            variant="contained"
            disabled={!checkupData.title || !checkupData.date}
          >
            {editingCheckup ? 'Update' : 'Add'}
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default Checkups;
