import { format, parseISO, isAfter, isBefore, addDays } from 'date-fns';

// Format a date string to a human-readable format
export const formatDate = (dateString) => {
  try {
    const date = parseISO(dateString);
    return format(date, 'MMMM dd, yyyy');
  } catch (error) {
    console.error('Error formatting date:', error);
    return 'Invalid date';
  }
};

// Format a date string to include time
export const formatDateTime = (dateString) => {
  try {
    const date = parseISO(dateString);
    return format(date, 'MMMM dd, yyyy h:mm a');
  } catch (error) {
    console.error('Error formatting date and time:', error);
    return 'Invalid date';
  }
};

// Check if a date is in the past
export const isPastDate = (dateString) => {
  try {
    const date = parseISO(dateString);
    return isBefore(date, new Date());
  } catch (error) {
    console.error('Error checking if date is in past:', error);
    return false;
  }
};

// Check if a date is in the future
export const isFutureDate = (dateString) => {
  try {
    const date = parseISO(dateString);
    return isAfter(date, new Date());
  } catch (error) {
    console.error('Error checking if date is in future:', error);
    return false;
  }
};

// Calculate days until a future date
export const daysUntil = (dateString) => {
  try {
    const date = parseISO(dateString);
    const today = new Date();
    const diffTime = Math.abs(date - today);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  } catch (error) {
    console.error('Error calculating days until date:', error);
    return 0;
  }
};

// Get a date string for N days from now
export const getDateInDays = (days) => {
  return addDays(new Date(), days).toISOString();
};
