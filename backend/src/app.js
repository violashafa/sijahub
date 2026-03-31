const express = require('express');
const cors = require('cors');
const helmet = require('helmet'); 
const rateLimit = require('express-rate-limit'); 
const morgan = require('morgan'); 
const compression = require('compression'); 
const connectDB = require('./config/db');
require('dotenv').config();
const errorHandler = require('./middlewares/errorHandler');

const app = express();

// ===== 1. SETTING PROXY (WAJIB UNTUK DOCKER/NGINX) =====
app.set('trust proxy', 1); 

connectDB();

// ===== 2. MIDDLEWARE KEAMANAN & OPTIMASI =====
app.use(
  helmet({
    crossOriginResourcePolicy: false, 
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        imgSrc: ["'self'", "data:", "https://res.cloudinary.com"], 
      },
    },
  })
); 

app.use(compression()); 
app.use(morgan('dev')); 
app.use(cors());

// Pembatasan Request
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, 
  max: 100, 
  message: {
    success: false,
    message: 'Terlalu banyak permintaan dari IP ini, coba lagi nanti.'
  }
});
app.use('/api/', limiter); 

app.use(express.json());
app.use('/uploads', express.static('uploads'));

// ===== 3. ROUTES (PASTIKAN PAKAI 'S' / PLURAL) =====
const studentRoutes = require('./routes/studentRoutes');
const achievementRoutes = require('./routes/achievementRoutes');
const competitionRoutes = require('./routes/competitionRoutes'); 
const jobRoutes = require('./routes/jobRoutes');
const authRoutes = require('./routes/authRoutes'); 

app.use('/api/students', studentRoutes);
app.use('/api/achievements', achievementRoutes); // Jalur: /api/achievements
app.use('/api/competitions', competitionRoutes);
app.use('/api/jobs', jobRoutes);
app.use('/api/auth', authRoutes); 

app.get('/', (req, res) => {
  res.send('SijaHub API is running with Cloudinary & Security Enabled');
});

app.use(errorHandler);

module.exports = app;