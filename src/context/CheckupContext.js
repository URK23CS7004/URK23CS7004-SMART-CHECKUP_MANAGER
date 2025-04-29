import React, { createContext, useState, useEffect, useContext } from 'react';

const CheckupContext = createContext();

export const useCheckupContext = () => useContext(CheckupContext);

export const CheckupProvider = ({ children }) => {
  const [checkups, setCheckups] = useState(() => {
    const savedCheckups = localStorage.getItem('checkups');
    return savedCheckups ? JSON.parse(savedCheckups) : [];
  });
  
  const [reminders, setReminders] = useState(() => {
    const savedReminders = localStorage.getItem('reminders');
    return savedReminders ? JSON.parse(savedReminders) : [];
  });

  // Save checkups to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('checkups', JSON.stringify(checkups));
  }, [checkups]);

  // Save reminders to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('reminders', JSON.stringify(reminders));
  }, [reminders]);

  // Add a new checkup
  const addCheckup = (checkup) => {
    const newCheckup = {
      ...checkup,
      id: Date.now().toString(),
      date: new Date(checkup.date).toISOString(),
      createdAt: new Date().toISOString(),
    };
    setCheckups([...checkups, newCheckup]);
    return newCheckup;
  };

  // Update an existing checkup
  const updateCheckup = (id, updatedData) => {
    setCheckups(
      checkups.map((checkup) =>
        checkup.id === id ? { ...checkup, ...updatedData } : checkup
      )
    );
  };

  // Delete a checkup
  const deleteCheckup = (id) => {
    setCheckups(checkups.filter((checkup) => checkup.id !== id));
    // Also delete any reminders associated with this checkup
    setReminders(reminders.filter((reminder) => reminder.checkupId !== id));
  };

  // Add a reminder
  const addReminder = (reminder) => {
    const newReminder = {
      ...reminder,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
    };
    setReminders([...reminders, newReminder]);
    return newReminder;
  };

  // Update a reminder
  const updateReminder = (id, updatedData) => {
    setReminders(
      reminders.map((reminder) =>
        reminder.id === id ? { ...reminder, ...updatedData } : reminder
      )
    );
  };

  // Delete a reminder
  const deleteReminder = (id) => {
    setReminders(reminders.filter((reminder) => reminder.id !== id));
  };

  // Get all checkups for a specific category
  const getCheckupsByCategory = (category) => {
    return checkups.filter((checkup) => checkup.category === category);
  };

  // Get all upcoming checkups (scheduled in the future)
  const getUpcomingCheckups = () => {
    const now = new Date().toISOString();
    return checkups.filter((checkup) => checkup.date > now);
  };

  // Get all past checkups
  const getPastCheckups = () => {
    const now = new Date().toISOString();
    return checkups.filter((checkup) => checkup.date <= now);
  };

  // Get reminders for a specific checkup
  const getRemindersByCheckupId = (checkupId) => {
    return reminders.filter((reminder) => reminder.checkupId === checkupId);
  };

  return (
    <CheckupContext.Provider
      value={{
        checkups,
        reminders,
        addCheckup,
        updateCheckup,
        deleteCheckup,
        addReminder,
        updateReminder,
        deleteReminder,
        getCheckupsByCategory,
        getUpcomingCheckups,
        getPastCheckups,
        getRemindersByCheckupId,
      }}
    >
      {children}
    </CheckupContext.Provider>
  );
};
