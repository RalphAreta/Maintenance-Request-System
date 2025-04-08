const express = require('express');
const path = require('path');
const cors = require('cors');
const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json()); // To parse JSON request bodies

// Add this middleware to filter out requests to .git and node_modules
app.use((req, res, next) => {
  const requestedPath = path.join(__dirname, req.path);
  // If the requested file is within .git or node_modules, block it
  if (requestedPath.includes('.git') || requestedPath.includes('node_modules')) {
    return res.status(403).send('Access Forbidden');  // Forbidden error for sensitive paths
  }
  next();  // Otherwise, proceed to the next middleware
});

// Serve static files from the 'frontend' folder
app.use(express.static(path.join(__dirname, '..', 'frontend')));

// Import API routes
const authRoutes = require('./routes/authRoutes'); // Authentication routes
const maintenanceRoutes = require('./routes/maintenanceRoutes'); // Maintenance routes (if needed)

// API Routes (these should be above the catch-all route)
app.use('/api/auth', authRoutes); // Authentication routes
app.use('/api/maintenance', maintenanceRoutes); // Maintenance routes (if needed)

// Serve the login page on the root route
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'frontend', 'MRS', 'LOGIN.html')); // Corrected path
});

// Serve the login page
app.get('/LOGIN.html', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'frontend', 'MRS', 'LOGIN.html'));
});

// Serve the signup page
app.get('/SIGNUP.html', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'frontend', 'MRS', 'SIGNUP.html'));
});

// Serve the homepage (acting as the dashboard) on the /dashboard route
app.get('/dashboard', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'frontend', 'MRS', 'USER', 'HOMEPAGE.html'));
});

// Start the server
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
