const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');


dotenv.config();

const app = express();


connectDB();

// Middleware

app.use(cors({
  origin: 'https://cuts-io.vercel.app/',
  credentials: true,
  methods: ['GET','POST','PUT','DELETE','OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
// app.options('*', cors());
app.options('/api/*', cors());
app.use(express.json()); 


const authRoutes = require('./routes/authRoutes');
const urlRoutes = require('./routes/urlRoutes');
const redirectRoutes = require('./routes/redirectRoutes');

app.use('/api/auth', authRoutes);       
app.use('/api/url', urlRoutes);         
app.use('/', redirectRoutes);           


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
