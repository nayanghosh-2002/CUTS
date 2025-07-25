const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db'); // Keep this uncommented


dotenv.config();

const app = express();


connectDB(); // Keep this uncommented

// Middleware

// Keep CORS commented out for now
// const cors = require('cors');
// app.use(cors());
// app.options('*', cors());

// UNCOMMENT THIS LINE:
app.use(express.json()); 


// Keep all custom routes commented out
// const authRoutes = require('./routes/authRoutes');
// const urlRoutes = require('./routes/urlRoutes');
// const redirectRoutes = require('./routes/redirectRoutes');
// app.use('/api/auth', authRoutes);
// app.use('/api/url', urlRoutes);
// app.use('/', redirectRoutes);


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT} with minimal setup`));
