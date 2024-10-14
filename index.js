const express = require('express');
const connectDB = require('./config/db');
const userRoutes = require('./routes/user');
const employeeRoutes = require('./routes/employee');
const cors = require('cors');

const app = express();
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/v1/user', userRoutes);
app.use('/api/v1/emp', employeeRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
