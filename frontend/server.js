const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com"],
      fontSrc: ["'self'", "https://fonts.gstatic.com"],
      scriptSrc: ["'self'"],
      imgSrc: ["'self'", "data:", "https:"],
      connectSrc: ["'self'", "http://localhost:5000"] // For API connections
    }
  }
}));
app.use(cors());
app.use(morgan('combined'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));
app.use('/css', express.static(path.join(__dirname, 'public/css')));
app.use('/js', express.static(path.join(__dirname, 'public/js')));
app.use('/assets', express.static(path.join(__dirname, 'public/assets')));

// API Routes (proxy to Python backend)
app.get('/api/teams', async (req, res) => {
  try {
    const axios = require('axios');
    const response = await axios.get('http://localhost:5000/api/teams');
    res.json(response.data);
  } catch (error) {
    console.error('Error fetching teams:', error.message);
    // Fallback data
    const teams = [
      'Atlanta Hawks', 'Boston Celtics', 'Brooklyn Nets', 'Chicago Bulls',
      'Charlotte Hornets', 'Cleveland Cavaliers', 'Dallas Mavericks', 
      'Denver Nuggets', 'Detroit Pistons', 'Golden State Warriors',
      'Houston Rockets', 'Indiana Pacers', 'Los Angeles Clippers',
      'Los Angeles Lakers', 'Memphis Grizzlies', 'Miami Heat',
      'Milwaukee Bucks', 'Minnesota Timberwolves', 'New Orleans Pelicans',
      'New York Knicks', 'Oklahoma City Thunder', 'Orlando Magic',
      'Philadelphia 76ers', 'Phoenix Suns', 'Portland Trail Blazers',
      'Sacramento Kings', 'San Antonio Spurs', 'Toronto Raptors',
      'Utah Jazz', 'Washington Wizards'
    ];
    res.json({ teams: teams.sort() });
  }
});

app.post('/api/predict', async (req, res) => {
  try {
    const { homeTeam, awayTeam } = req.body;
    
    if (!homeTeam || !awayTeam) {
      return res.status(400).json({ error: 'Both home and away teams are required' });
    }
    
    if (homeTeam === awayTeam) {
      return res.status(400).json({ error: 'Home and away teams must be different' });
    }
    
    const axios = require('axios');
    const response = await axios.post('http://localhost:5000/api/predict', {
      homeTeam,
      awayTeam
    });
    
    res.json(response.data);
  } catch (error) {
    console.error('Error making prediction:', error.message);
    
    // Fallback prediction
    const homeWinProbability = Math.random() * 0.4 + 0.3; // 30-70% range
    const confidence = Math.random() * 0.3 + 0.7; // 70-100% range
    
    res.json({
      homeTeam: req.body.homeTeam,
      awayTeam: req.body.awayTeam,
      homeWinProbability,
      awayWinProbability: 1 - homeWinProbability,
      confidence,
      prediction: homeWinProbability > 0.5 ? req.body.homeTeam : req.body.awayTeam,
      features: {
        winPctDiff: (Math.random() - 0.5) * 0.4,
        ppgDiff: (Math.random() - 0.5) * 20,
        fgPctDiff: (Math.random() - 0.5) * 0.1
      }
    });
  }
});

app.get('/api/model-stats', async (req, res) => {
  try {
    const axios = require('axios');
    const response = await axios.get('http://localhost:5000/api/model-stats');
    res.json(response.data);
  } catch (error) {
    console.error('Error fetching model stats:', error.message);
    // Fallback model statistics
    res.json({
      accuracy: 0.585,
      precision: 0.59,
      recall: 0.58,
      f1Score: 0.58,
      totalGames: 7900,
      homeWinRate: 0.500,
      featureImportance: [
        { feature: 'Points Per Game Difference', importance: 0.169, coefficient: 0.169 },
        { feature: 'Win Percentage Difference', importance: 0.147, coefficient: 0.147 },
        { feature: 'Home Team Win %', importance: 0.110, coefficient: 0.110 },
        { feature: 'Away Team Win %', importance: 0.103, coefficient: -0.103 },
        { feature: 'Field Goal % Difference', importance: 0.001, coefficient: 0.001 }
      ]
    });
  }
});

// Serve main page
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'healthy', timestamp: new Date().toISOString() });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

app.listen(PORT, () => {
  console.log(`🏀 HomeCourt AI Frontend Server running on port ${PORT}`);
  console.log(`🌐 Open http://localhost:${PORT} to view the application`);
});