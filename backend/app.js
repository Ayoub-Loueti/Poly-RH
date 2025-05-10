const express = require('express');
const cors = require('cors');
const userRoutes = require('./routes/userRoute');
const employeeRoutes = require('./routes/employeeRoutes');
const absenceRoutes = require('./routes/absenceRoutes');
const dashboardRoutes = require('./routes/dashboardRoutes');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Debug middleware to log all requests
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

// Routes
console.log('Setting up routes...');

// Test route
app.get('/test', (req, res) => {
  console.log('Test route hit');
  res.json({ message: 'Server is working!' });
});

// API routes
app.use('/api/absences', absenceRoutes);
app.use('/api/employees', employeeRoutes);
app.use('/users', userRoutes);
app.use('/dashboard', dashboardRoutes);

console.log('Routes set up complete');

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Error:', err.stack);
  res.status(500).json({ 
    message: 'Something went wrong!',
    error: err.message 
  });
});

// 404 handler
app.use((req, res) => {
  console.log('404 Not Found:', req.method, req.url);
  res.status(404).json({ 
    message: 'Route not found',
    path: req.url,
    method: req.method
  });
});

module.exports = app; 