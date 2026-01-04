// require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { connectDB } = require('./database/dbConnection');
const router = require('./routes/router');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use(router);

// Start server only after DB connects
const startServer = async () => {
  try {
    await connectDB(); // Wait for DB to connect
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
      console.log(` Server running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error(" Failed to start server:", error);
    process.exit(1);
  }
};

startServer();