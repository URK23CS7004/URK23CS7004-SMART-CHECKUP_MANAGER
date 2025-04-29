# Smart Checkup Manager

A React.js web application for managing medical checkups, setting reminders, and viewing health history.

## Features

- **Dashboard**: Get an overview of your checkups, reminders, and health categories
- **Checkup Management**: Add, edit, and delete medical checkups with detailed information
- **Reminder System**: Set and manage reminders for upcoming checkups
- **Health History**: View past checkups organized chronologically with filtering options

## Technologies Used

- React.js
- React Router for navigation
- Material-UI for the user interface
- Local Storage for data persistence
- date-fns for date manipulation

## Getting Started

### Prerequisites

- Node.js (v14.0.0 or later)
- npm (v6.0.0 or later)

### Installation

1. Clone the repository or download the source code
2. Navigate to the project directory
3. Install dependencies:

```bash
npm install
```

4. Start the development server:

```bash
npm start
```

5. Open your browser and navigate to `http://localhost:3000`

## Usage Guide

### Adding a Checkup

1. Navigate to the Checkups page
2. Click the "+" button in the bottom right corner
3. Fill in the checkup details:
   - Title (required)
   - Category
   - Doctor
   - Location
   - Date (required)
   - Notes
4. Click "Add" to save the checkup

### Setting a Reminder

1. Navigate to the Reminders page
2. Click the "+" button in the bottom right corner
3. Select the checkup you want to be reminded about
4. Fill in the reminder details:
   - Title (required)
   - Message
   - Date and time (required)
5. Toggle "Active" to enable/disable the reminder
6. Click "Add" to save the reminder

### Viewing Health History

1. Navigate to the History page
2. Use the filters to find specific checkups:
   - Search by keyword
   - Filter by category
   - Filter by date range
3. View your checkups organized by month and year

## Project Structure

```
smart-checkup-manager/
├── public/
│   ├── index.html
│   └── ...
├── src/
│   ├── assets/       # Static assets
│   ├── components/   # Reusable UI components
│   │   └── Navbar.js
│   ├── context/      # React context for state management
│   │   └── CheckupContext.js
│   ├── pages/        # Main application pages
│   │   ├── Dashboard.js
│   │   ├── Checkups.js
│   │   ├── Reminders.js
│   │   └── History.js
│   ├── utils/        # Utility functions
│   │   └── dateUtils.js
│   ├── App.js        # Main application component
│   └── index.js      # Application entry point
└── package.json      # Project dependencies and scripts
```

## Future Enhancements

- User authentication
- Cloud data synchronization
- Export health records as PDF
- Integration with calendar applications
- Mobile app version

## License

This project is licensed under the MIT License.

## Acknowledgements

- This project was created as a college assignment
- Icons provided by Material-UI
- Date handling powered by date-fns
