import React, { useState, useEffect } from 'react';
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
  Box,
  Fab,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  Switch,
  FormControlLabel
} from '@mui/material';
import { useCheckupContext } from '../context/CheckupContext';
import { formatDate, formatDateTime } from '../utils/dateUtils';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import NotificationsIcon from '@mui/icons-material/Notifications';

const Reminders = () => {
  const { 
    checkups, 
    reminders, 
    addReminder,
    updateReminder,
    deleteReminder
  } = useCheckupContext();

  const [openDialog, setOpenDialog] = useState(false);
  const [editingReminder, setEditingReminder] = useState(null);
  const [reminderData, setReminderData] = useState({
    checkupId: '',
    title: '',
    message: '',
    reminderDate: '',
    isActive: true
  });
  const [activeReminders, setActiveReminders] = useState([]);

  // Update active reminders when reminders change
  useEffect(() => {
    // Check if any reminders are due
    const now = new Date();
    const active = reminders.filter(reminder => {
      const reminderDate = new Date(reminder.reminderDate);
      return reminder.isActive && reminderDate <= now;
    });
    setActiveReminders(active);
  }, [reminders]);

  // Sort reminders by date (upcoming first)
  const sortedReminders = [...reminders].sort((a, b) => 
    new Date(a.reminderDate) - new Date(b.reminderDate)
  );

  const handleOpenDialog = (reminder = null) => {
    if (reminder) {
      // Format the date for the datetime-local input
      const dateObj = new Date(reminder.reminderDate);
      const formattedDate = dateObj.toISOString().slice(0, 16);
      
      setEditingReminder(reminder);
      setReminderData({
        checkupId: reminder.checkupId,
        title: reminder.title,
        message: reminder.message || '',
        reminderDate: formattedDate,
        isActive: reminder.isActive
      });
    } else {
      setEditingReminder(null);
      setReminderData({
        checkupId: checkups.length > 0 ? checkups[0].id : '',
        title: '',
        message: '',
        reminderDate: new Date().toISOString().slice(0, 16),
        isActive: true
      });
    }
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setReminderData({
      ...reminderData,
      [name]: value
    });
  };

  const handleSwitchChange = (e) => {
    setReminderData({
      ...reminderData,
      isActive: e.target.checked
    });
  };

  const handleSubmit = () => {
    if (editingReminder) {
      updateReminder(editingReminder.id, {
        ...reminderData,
        reminderDate: new Date(reminderData.reminderDate).toISOString()
      });
    } else {
      addReminder({
        ...reminderData,
        reminderDate: new Date(reminderData.reminderDate).toISOString()
      });
    }
    handleCloseDialog();
  };

  const handleDeleteReminder = (id) => {
    if (window.confirm('Are you sure you want to delete this reminder?')) {
      deleteReminder(id);
    }
  };

  const getCheckupTitle = (checkupId) => {
    const checkup = checkups.find(c => c.id === checkupId);
    return checkup ? checkup.title : 'Unknown Checkup';
  };

  const dismissReminder = (id) => {
    updateReminder(id, { isActive: false });
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" gutterBottom>
        Reminders
      </Typography>
      
      {/* Active Reminders */}
      {activeReminders.length > 0 && (
        <Grid item xs={12} sx={{ mb: 3 }}>
          <Card sx={{ bgcolor: 'primary.light' }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                <NotificationsIcon sx={{ mr: 1, verticalAlign: 'middle' }} />
                Active Reminders
              </Typography>
              <List>
                {activeReminders.map((reminder) => (
                  <ListItem key={reminder.id} sx={{ bgcolor: 'background.paper', mb: 1, borderRadius: 1 }}>
                    <ListItemText 
                      primary={reminder.title} 
                      secondary={
                        <Box>
                          <Typography component="span" variant="body2">
                            For: {getCheckupTitle(reminder.checkupId)}
                          </Typography>
                          <Typography variant="body2">
                            {reminder.message}
                          </Typography>
                          <Typography variant="body2">
                            Due: {formatDateTime(reminder.reminderDate)}
                          </Typography>
                        </Box>
                      }
                    />
                    <Button 
                      variant="contained" 
                      size="small"
                      onClick={() => dismissReminder(reminder.id)}
                    >
                      Dismiss
                    </Button>
                  </ListItem>
                ))}
              </List>
            </CardContent>
          </Card>
        </Grid>
      )}
      
      {/* All Reminders */}
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Card>
            <CardContent>
              {sortedReminders.length > 0 ? (
                <List>
                  {sortedReminders.map((reminder) => (
                    <React.Fragment key={reminder.id}>
                      <ListItem>
                        <ListItemText 
                          primary={
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                              <Typography variant="h6" sx={{ mr: 1 }}>
                                {reminder.title}
                              </Typography>
                              {!reminder.isActive && (
                                <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                                  (Inactive)
                                </Typography>
                              )}
                            </Box>
                          } 
                          secondary={
                            <Box>
                              <Typography component="span" variant="body2" color="text.primary">
                                For: {getCheckupTitle(reminder.checkupId)}
                              </Typography>
                              <Typography variant="body2">
                                Reminder Date: {formatDateTime(reminder.reminderDate)}
                              </Typography>
                              {reminder.message && (
                                <Typography variant="body2">
                                  Message: {reminder.message}
                                </Typography>
                              )}
                            </Box>
                          }
                        />
                        <ListItemSecondaryAction>
                          <IconButton 
                            edge="end" 
                            aria-label="edit"
                            onClick={() => handleOpenDialog(reminder)}
                          >
                            <EditIcon />
                          </IconButton>
                          <IconButton 
                            edge="end" 
                            aria-label="delete"
                            onClick={() => handleDeleteReminder(reminder.id)}
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
                  No reminders found. Add a new reminder to get started!
                </Typography>
              )}
            </CardContent>
          </Card>
        </Grid>
      </Grid>
      
      {/* Add Reminder FAB */}
      <Fab 
        color="primary" 
        aria-label="add"
        sx={{ position: 'fixed', bottom: 16, right: 16 }}
        onClick={() => handleOpenDialog()}
        disabled={checkups.length === 0}
      >
        <AddIcon />
      </Fab>
      
      {/* Add/Edit Reminder Dialog */}
      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
        <DialogTitle>
          {editingReminder ? 'Edit Reminder' : 'Add New Reminder'}
        </DialogTitle>
        <DialogContent>
          <Box component="form" sx={{ mt: 1 }}>
            {checkups.length > 0 ? (
              <>
                <FormControl fullWidth margin="normal">
                  <InputLabel>Checkup</InputLabel>
                  <Select
                    name="checkupId"
                    value={reminderData.checkupId}
                    onChange={handleInputChange}
                    label="Checkup"
                  >
                    {checkups.map(checkup => (
                      <MenuItem key={checkup.id} value={checkup.id}>
                        {checkup.title} ({formatDate(checkup.date)})
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  label="Reminder Title"
                  name="title"
                  value={reminderData.title}
                  onChange={handleInputChange}
                />
                <TextField
                  margin="normal"
                  fullWidth
                  label="Message"
                  name="message"
                  multiline
                  rows={2}
                  value={reminderData.message}
                  onChange={handleInputChange}
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  label="Reminder Date & Time"
                  name="reminderDate"
                  type="datetime-local"
                  value={reminderData.reminderDate}
                  onChange={handleInputChange}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
                <FormControlLabel
                  control={
                    <Switch
                      checked={reminderData.isActive}
                      onChange={handleSwitchChange}
                      name="isActive"
                      color="primary"
                    />
                  }
                  label="Active"
                  sx={{ mt: 1 }}
                />
              </>
            ) : (
              <Typography variant="body1" color="error" align="center">
                You need to create a checkup first before adding reminders.
              </Typography>
            )}
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          {checkups.length > 0 && (
            <Button 
              onClick={handleSubmit} 
              variant="contained"
              disabled={!reminderData.title || !reminderData.reminderDate}
            >
              {editingReminder ? 'Update' : 'Add'}
            </Button>
          )}
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default Reminders;
