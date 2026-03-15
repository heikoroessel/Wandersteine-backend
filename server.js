require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const { initDB } = require('./db');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors({
  origin: process.env.FRONTEND_URL || '*',
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve uploaded photos
const uploadPath = process.env.UPLOAD_PATH || './uploads';
app.use('/uploads', express.static(uploadPath));

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/stones', require('./routes/stones'));

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Start server
const start = async () => {
  await initDB();
  app.listen(PORT, () => {
    console.log(`🪨 Wandersteine Backend running on port ${PORT}`);
  });
};

start().catch(console.error);
