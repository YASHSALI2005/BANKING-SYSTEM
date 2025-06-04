# Banking System

A simple banking system built with Node.js, React, and MongoDB Atlas.

## Project Structure

```
banking-system/
├── backend/               # Backend Node.js/Express application
│   ├── models/           # Mongoose models
│   ├── routes/           # API routes
│   ├── middleware/       # Custom middleware
│   ├── server.js         # Express server
│   ├── package.json      # Backend dependencies
│   └── .env             # Backend environment variables
│
└── frontend/             # React frontend application
    ├── public/           # Static files
    ├── src/             # React source code
    │   ├── components/  # React components
    │   ├── contexts/    # React contexts
    │   └── App.js       # Main App component
    └── package.json     # Frontend dependencies
```

## Setup Instructions

### Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file with the following variables:
```
PORT=5000
MONGODB_URI=your_mongodb_atlas_connection_string
JWT_SECRET=your_jwt_secret_key
NODE_ENV=development
```

4. Start the backend server:
```bash
npm run dev
```

### Frontend Setup

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the frontend development server:
```bash
npm start
```

## Features

- User authentication (Customer and Banker roles)
- Account management
- Transaction handling (Deposits and Withdrawals)
- Transaction history
- Banker dashboard for monitoring customer accounts

## Technologies Used

### Backend
- Node.js
- Express.js
- MongoDB with Mongoose
- JWT for authentication
- bcrypt for password hashing

### Frontend
- React.js
- Material-UI
- Axios for API calls
- React Router for navigation 