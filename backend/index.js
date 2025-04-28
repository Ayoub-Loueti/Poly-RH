const express = require('express');
const cors = require('cors');
const userRoutes = require('./routes/userRoute');

const app = express();
app.use(cors());
app.use(express.json());

// Use user routes
app.use('/users', userRoutes);

app.get('/api/hello', (req, res) => {
  res.json({ message: 'Hello from Node.js backend!' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
