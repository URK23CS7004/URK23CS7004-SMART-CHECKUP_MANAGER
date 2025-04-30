# Smart Checkup Manager - Exam Guide

## Project Overview

This project is a medical checkup management system that helps users track their medical appointments and health records. It's designed to be simple and easy to understand for exam purposes.

## Learning Objectives

1. **React Fundamentals**
   - Component structure
   - State management
   - Props and events
   - Routing

2. **Frontend Development**
   - Basic React components
   - Form handling
   - Data display
   - Material-UI components

3. **Backend Basics**
   - Express.js server
   - REST API concepts
   - Basic routing
   - JSON data handling

## Core Components

### Frontend Components

1. **Navbar Component**
```javascript
// Navbar.js
import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav>
      <h1>Smart Checkup Manager</h1>
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/checkups">Checkups</Link></li>
        <li><Link to="/reminders">Reminders</Link></li>
      </ul>
    </nav>
  );
}
```

2. **Checkup Form Component**
```javascript
// CheckupForm.js
import React, { useState } from 'react';

function CheckupForm({ onSubmit }) {
  const [formData, setFormData] = useState({
    title: '',
    date: '',
    doctor: '',
    notes: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <form onSubmit={(e) => {
      e.preventDefault();
      onSubmit(formData);
    }}>
      <input
        type="text"
        name="title"
        placeholder="Checkup Title"
        value={formData.title}
        onChange={handleChange}
      />
      <input
        type="date"
        name="date"
        value={formData.date}
        onChange={handleChange}
      />
      <input
        type="text"
        name="doctor"
        placeholder="Doctor's Name"
        value={formData.doctor}
        onChange={handleChange}
      />
      <textarea
        name="notes"
        placeholder="Additional Notes"
        value={formData.notes}
        onChange={handleChange}
      />
      <button type="submit">Save Checkup</button>
    </form>
  );
}
```

### Backend API

1. **Server Setup**
```javascript
// server.js
const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());

// Sample data
let checkups = [];

// API Routes
app.get('/api/checkups', (req, res) => {
  res.json(checkups);
});

app.post('/api/checkups', (req, res) => {
  const newCheckup = {
    id: Date.now(),
    ...req.body
  };
  checkups.push(newCheckup);
  res.status(201).json(newCheckup);
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
```

## Key Concepts to Remember

1. **React State Management**
   - Use useState for component state
   - Use useEffect for side effects
   - Pass data through props

2. **Form Handling**
   - Use controlled components
   - Handle form submissions
   - Validate input data

3. **API Integration**
   - Use axios for HTTP requests
   - Handle API responses
   - Error handling

4. **Routing**
   - Use react-router-dom
   - Define routes
   - Navigate between pages

## Exam Tips

1. **React Component Structure**
   ```javascript
   function ComponentName({ props }) {
     const [state, setState] = useState(initialState);
     
     return (
       <div>
         {/* Component content */}
       </div>
     );
   }
   ```

2. **Form Handling Pattern**
   ```javascript
   const [formData, setFormData] = useState({
     field1: '',
     field2: ''
   });

   const handleChange = (e) => {
     setFormData({
       ...formData,
       [e.target.name]: e.target.value
     });
   };
   ```

3. **API Call Pattern**
   ```javascript
   import axios from 'axios';

   const fetchData = async () => {
     try {
       const response = await axios.get('/api/data');
       return response.data;
     } catch (error) {
       console.error('Error:', error);
     }
   };
   ```

## Common Interview Questions

1. **React Lifecycle**
   - Explain useState and useEffect
   - Describe component mounting and unmounting

2. **State Management**
   - How to manage component state
   - When to use props vs state

3. **Form Handling**
   - How to create controlled components
   - Form validation techniques

4. **API Integration**
   - How to make API calls
   - Error handling in API requests

## Practice Questions

1. Write a React component that displays a list of checkups
2. Create a form component for adding new checkups
3. Implement a delete functionality for checkups
4. Add a search feature to filter checkups
5. Create a reminder system using setTimeout

## Tips for Exam Success

1. **Understand the Basics**
   - React component lifecycle
   - State management
   - Props and events

2. **Practice Coding**
   - Write components from scratch
   - Implement basic CRUD operations
   - Handle form submissions

3. **Study Common Patterns**
   - Form handling
   - API integration
   - State management

4. **Review Error Handling**
   - Form validation
   - API error handling
   - User feedback

This guide provides a simplified version of the Smart Checkup Manager project, focusing on essential concepts that are likely to appear in your exam. Make sure to practice implementing these components and understand how they work together in a full-stack application.

Good luck with your exam!
