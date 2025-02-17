# Timer App

A feature-rich timer application built with React, allowing users to create, manage, and run multiple timers simultaneously. The app includes notifications, persistent storage, and a responsive design.

## Features

**Multiple Simultaneous Timers**
- Create and run multiple timers concurrently
- Each timer operates independently

**Smart Notifications**
- Snack bar notifications when timers complete
- Notification sound plays until dismissed

**Persistent Storage**
- Timers persist across page refreshes using localStorage
- Automatic state recovery on app launch

**Timer Management**
- Create, edit, and delete timers
- Pause/resume functionality
- Restart completed timers
- Duration support up to 24 hours

**Form Validation**
- Real-time input validation
- Error notifications for invalid inputs
- Clear user feedback

**Responsive Design**
- Toast notifications are responsive: desktop top-right, mobile bottom


## Getting Started

1. Clone the repository:
   ```bash
   git clone git@github.com:9thDuck/timerapp.git
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Run tests:
   ```bash
   npm run test
   ```

## Project Structure

```
src/
├── components/         # Reusable UI components
├── store/             # Redux store and state
├── utils/             # Helper functions and
├── hooks/             # Custom hooks
├── types/             # TypeScript type definitions
└── assets/            # Static assets
```

## Testing

The project includes comprehensive test coverage:
- Unit tests for validation logic
- Component tests for reusable components
- Integration tests for core functionality

Run the test suite:
```bash
npm run test
```