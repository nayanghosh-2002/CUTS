const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors'); // Ensure 'cors' is imported
const connectDB = require('./config/db');


dotenv.config();

const app = express();


connectDB();

// Middleware

// TEMPORARILY MODIFIED CORS CONFIGURATION FOR DEBUGGING
// app.use(cors({
//  origin: 'https://cuts-io.vercel.app/',
//  credentials: true,
//  methods: ['GET','POST','PUT','DELETE','OPTIONS'],
//  allowedHeaders: ['Content-Type', 'Authorization']
// }));
app.use(cors()); // Use this simpler, default CORS
app.options('*', cors()); // Enable pre-flight for all routes

app.use(express.json()); 


// THESE LINES ARE COMMENTED OUT FOR DEBUGGING PURPOSES
// const authRoutes = require('./routes/authRoutes');
// const urlRoutes = require('./routes/urlRoutes');
// const redirectRoutes = require('./routes/redirectRoutes');

// app.use('/api/auth', authRoutes);
// app.use('/api/url', urlRoutes);
// app.use('/', redirectRoutes);


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
