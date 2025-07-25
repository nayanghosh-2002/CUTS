const express = require('express');
const dotenv = require('dotenv');
// UNCOMMENT THIS LINE
const connectDB = require('./config/db');


dotenv.config();

const app = express();

// UNCOMMENT THIS LINE
connectDB();

// Keep all middleware commented out for now
// const cors = require('cors');
// app.use(cors());
// app.options('*', cors());
// app.use(express.json());

// Keep all custom routes commented out
// const authRoutes = require('./routes/authRoutes');
// const urlRoutes = require('./routes/urlRoutes');
// const redirectRoutes = require('./routes/redirectRoutes');
// app.use('/api/auth', authRoutes);
// app.use('/api/url', urlRoutes);
// app.use('/', redirectRoutes);


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT} with minimal setup`));
