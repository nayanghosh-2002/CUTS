const express = require('express');
const dotenv = require('dotenv'); // Keep dotenv for environment variables

// Temporarily remove/comment out these imports for now
// const cors = require('cors');
// const connectDB = require('./config/db');


dotenv.config();

const app = express();


// TEMPORARILY COMMENT OUT ALL MIDDLEWARE AND DB CONNECTION
// connectDB();
// app.use(cors());
// app.options('*', cors());
// app.use(express.json());


// Ensure these are still commented out
// const authRoutes = require('./routes/authRoutes');
// const urlRoutes = require('./routes/urlRoutes');
// const redirectRoutes = require('./routes/redirectRoutes');

// app.use('/api/auth', authRoutes);
// app.use('/api/url', urlRoutes);
// app.use('/', redirectRoutes);


const PORT = process.env.PORT || 5000;
// Just start the server with a basic message
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT} with minimal setup`));
