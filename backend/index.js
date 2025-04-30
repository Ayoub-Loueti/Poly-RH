const express = require('express');
const cors = require('cors');
const userRoutes = require('./routes/userRoute');
const employeeRoutes = require('./routes/employeeRoutes');
const dashboardRoutes = require('./routes/dshboardRoutes');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/users', userRoutes);
app.use('/employees', employeeRoutes);
app.use('/dashboard', dashboardRoutes);

// Test route
app.get('/test', (req, res) => {
  res.json({ message: 'Server is working!' });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!' });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
