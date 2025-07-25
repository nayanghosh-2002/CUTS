const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors'); // Keep this uncommented
const connectDB = require('./config/db');


dotenv.config();

const app = express();


connectDB(); // Keep this uncommented

// Middleware

// REINTRODUCE YOUR ORIGINAL CORS CONFIGURATION HERE:
app.use(cors({
 origin: 'https://cuts-io.vercel.app/',
 credentials: true,
 methods: ['GET','POST','PUT','DELETE','OPTIONS'],
 allowedHeaders: ['Content-Type', 'Authorization']
}));
app.options('*', cors()); // Keep this as well

app.use(express.json()); // Keep this uncommented


// Keep all custom routes commented out
// const authRoutes = require('./routes/authRoutes');
// const urlRoutes = require('./routes/urlRoutes');
// const redirectRoutes = require('./routes/redirectRoutes');
// app.use('/api/auth', authRoutes);
// app.use('/api/url', urlRoutes);
// app.use('/', redirectRoutes);


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT} with minimal setup`));
