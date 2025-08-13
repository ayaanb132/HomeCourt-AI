# 🏀 HomeCourt AI - Quick Start Guide

## Overview
This guide will help you set up and run the complete HomeCourt AI platform with the new Node.js frontend and Python ML backend.

## Prerequisites
- **Node.js** 16+ and npm
- **Python** 3.8+ 
- **Git** for version control

## 🚀 Quick Setup (5 minutes)

### 1. Clone and Install Dependencies
```bash
# Clone the repository
git clone https://github.com/ayaanb132/HomeCourt-AI.git
cd HomeCourt-AI

# Install Python dependencies
pip install -r requirements.txt
pip install flask flask-cors

# Install Node.js dependencies
cd frontend
npm install
```

### 2. Build Frontend Assets
```bash
# From the frontend directory
npm run build-css-prod
```

### 3. Start the Servers

**Terminal 1 - Python API Server:**
```bash
# From the root directory
python api/app.py
```
*API will start on http://localhost:5000*

**Terminal 2 - Node.js Frontend Server:**
```bash
# From the frontend directory
npm start
```
*Frontend will start on http://localhost:3000*

### 4. Access the Application
Open your browser and navigate to: **http://localhost:3000**

## 🎯 Using the Application

### Making Predictions
1. **Navigate** to the prediction section
2. **Select** a home team from the dropdown
3. **Select** an away team from the dropdown  
4. **Click** "Predict Outcome" button
5. **View** results with probabilities and key factors

### Example Prediction
- **Teams**: Lakers (Home) vs Celtics (Away)
- **Result**: Celtics Win (53.6% probability)
- **Factors**: Win % difference, PPG difference, FG% difference

## 📊 Features Available

### ✅ Core Features
- **Real-time predictions** using 58.5% accurate ML model
- **Interactive team selection** (30+ NBA teams)
- **Model performance metrics** and feature importance
- **Responsive design** for mobile and desktop
- **Dark/light mode toggle**

### ✅ Technical Features  
- **RESTful API** integration
- **Error handling** with user feedback
- **Form validation** and accessibility
- **Professional NBA-themed design**

## 🔧 Development Mode

### Frontend Development
```bash
cd frontend
npm run dev          # Start with auto-reload
npm run build-css    # CSS with watch mode
```

### API Development
```bash
python api/app.py    # Flask development server
```

## 🧪 Testing the Integration

### Health Checks
```bash
# Test Python API
curl http://localhost:5000/health

# Test Node.js Frontend  
curl http://localhost:3000/health
```

### API Endpoints
```bash
# Get teams list
curl http://localhost:3000/api/teams

# Make a prediction
curl -X POST http://localhost:3000/api/predict \
  -H "Content-Type: application/json" \
  -d '{"homeTeam":"Los Angeles Lakers","awayTeam":"Boston Celtics"}'

# Get model statistics
curl http://localhost:3000/api/model-stats
```

## 📱 Mobile Experience
The application is fully responsive and optimized for:
- **Mobile phones** (320px and up)
- **Tablets** (768px and up)  
- **Desktop** (1024px and up)

## 🎨 Design System

### Colors
- **NBA Blue**: #17408B
- **NBA Red**: #C9082A
- **Court Orange**: #FF6B35
- **Basketball Brown**: #C4905C

### Typography
- **Headers**: Poppins font family
- **Body**: Inter font family
- **Responsive sizing** based on screen size

## 🔍 Troubleshooting

### Common Issues

**Port conflicts:**
```bash
# Change frontend port
PORT=3001 npm start

# Change API port  
PORT=5001 python api/app.py
```

**CSS not loading:**
```bash
cd frontend
npm run build-css-prod
```

**Teams not loading:**
```bash
# Check if Python API is running
curl http://localhost:5000/health
```

**Prediction errors:**
- Verify both servers are running
- Check browser console for errors
- Ensure different teams are selected

## 📈 Performance

- **Load time**: < 2 seconds
- **Prediction response**: ~100ms
- **Bundle size**: ~35KB total
- **Mobile performance**: Optimized

## 🔮 Next Steps

### Enhanced Features
- User authentication and profiles
- Historical prediction tracking  
- Advanced data visualizations
- Real-time game updates
- Progressive Web App (PWA)

### Customization
- Modify `tailwind.config.js` for styling
- Update `frontend/src/styles/main.css` for custom components
- Extend API endpoints in `api/app.py`

## 🆘 Support

For issues or questions:
1. Check the browser console for errors
2. Verify both servers are running
3. Review the logs in terminal windows
4. Refer to the detailed documentation in `FRONTEND_IMPLEMENTATION.md`

---

**🏀 Enjoy predicting NBA games with HomeCourt AI!**