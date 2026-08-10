require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const runBootstrap = require('./bootstrap');
const authRoutes = require('./routes/authRoutes');
const employeeRoutes = require('./routes/employeeRoutes');
const quickLinkRoutes = require('./routes/quickLinkRoutes');
const holidayRoutes = require('./routes/holidayRoutes');
const newsRoutes = require('./routes/newsRoutes');

// Connect to database, then ensure starter content/admin exist
connectDB().then(runBootstrap);

const app = express();

// Middleware
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/employees', employeeRoutes);
app.use('/api/quicklinks', quickLinkRoutes);
app.use('/api/holidays', holidayRoutes);
app.use('/api/news', newsRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
