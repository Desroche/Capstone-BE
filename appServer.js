require("dotenv").config();
const express = require('express');
const connectToDB = require('./connection');
const authRoutes = require('./routes/authRoutes');
const adminRoutes = require('./routes/adminRoutes');
const recipeRoutes = require('./routes/recipeRoutes');


//Express App  *** Production Port not added in env file yet defaults to 3001 ***
// 3001 is also in package as proxy to facilitate api

const port = process.env.PORT || 3001;
const server = express();
server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

connectToDB();

server.use(express.json());


// Mounted Routes
server.use('/auth', authRoutes);
server.use(recipeRoutes);
server.use('/admin', adminRoutes);
