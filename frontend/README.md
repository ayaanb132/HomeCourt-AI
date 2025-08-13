# HomeCourt AI Frontend

A modern, responsive Node.js frontend for the HomeCourt AI NBA game prediction platform.

## 🏀 Features

- **Modern Stack**: Node.js + Express.js + Tailwind CSS
- **Responsive Design**: Mobile-first approach with dark/light mode
- **Real-time Predictions**: Integration with Python ML backend
- **Interactive UI**: Smooth animations and transitions
- **Accessibility**: WCAG 2.1 compliant design
- **Performance**: Optimized loading and API caching

## 🚀 Quick Start

### Prerequisites

- Node.js 16+ and npm
- Python 3.8+ with required packages (see main project requirements)

### Installation

1. **Navigate to frontend directory:**
   ```bash
   cd frontend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Build CSS:**
   ```bash
   npm run build-css-prod
   ```

4. **Start the development server:**
   ```bash
   npm run dev
   ```

5. **Start the Python API server (in a separate terminal):**
   ```bash
   cd ..
   python api/app.py
   ```

6. **Open your browser:**
   Navigate to `http://localhost:3000`

## 📁 Project Structure

```
frontend/
├── public/
│   ├── index.html          # Main HTML file
│   ├── css/
│   │   └── style.css       # Compiled Tailwind CSS
│   ├── js/
│   │   └── app.js          # Main JavaScript application
│   └── assets/             # Static assets
├── src/
│   ├── components/         # Reusable components
│   ├── styles/
│   │   └── main.css        # Tailwind source styles
│   └── utils/              # Utility functions
├── server.js               # Express.js server
├── package.json            # Node.js dependencies
├── tailwind.config.js      # Tailwind configuration
└── postcss.config.js       # PostCSS configuration
```

## 🛠 Available Scripts

- `npm start` - Start production server
- `npm run dev` - Start development server with auto-reload
- `npm run build-css` - Build CSS with watch mode
- `npm run build-css-prod` - Build CSS for production (minified)

## 🎨 Technology Stack

### Frontend
- **Framework**: Vanilla JavaScript with modern ES6+ features
- **Styling**: Tailwind CSS 3.4.0 with custom NBA-themed colors
- **Server**: Express.js with security middleware
- **HTTP Client**: Axios for API communication

### Backend Integration
- **API**: RESTful endpoints connecting to Python Flask server
- **Machine Learning**: Integration with scikit-learn model
- **Data**: Real-time NBA statistics and predictions

## 🔧 Configuration

### Environment Variables
Create a `.env` file in the frontend directory:
```
PORT=3000
API_BASE_URL=http://localhost:5000
NODE_ENV=development
```

### Tailwind Configuration
The `tailwind.config.js` includes custom NBA-themed colors:
- `nba-blue`: #17408B
- `nba-red`: #C9082A  
- `court-orange`: #FF6B35
- `basketball-brown`: #C4905C

## 📊 API Endpoints

The frontend proxies these endpoints to the Python backend:

- `GET /api/teams` - Get list of NBA teams
- `POST /api/predict` - Make game prediction
- `GET /api/model-stats` - Get model performance metrics
- `GET /health` - Frontend health check

## 🎯 Key Features

### Landing Page
- Professional hero section with project overview
- Key statistics display
- Responsive navigation with dark/light mode toggle

### Prediction Interface
- Interactive team selection dropdowns
- Real-time prediction results with confidence indicators
- Visual probability displays with animated progress bars

### Performance Dashboard
- Model accuracy metrics (58.5% accuracy)
- Feature importance visualization
- Real-time statistics from ML model

### User Experience
- Loading states and smooth transitions
- Error handling with user-friendly messages
- Mobile-responsive design
- Accessibility features (ARIA labels, keyboard navigation)

## 🚀 Deployment

### Production Build
```bash
npm run build-css-prod
npm start
```

### Docker Support
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npm run build-css-prod
EXPOSE 3000
CMD ["npm", "start"]
```

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is part of the HomeCourt AI platform and is licensed under the MIT License.

## 🔗 Related Projects

- [HomeCourt AI Main Repository](../../) - Python ML backend and data processing
- [API Documentation](../api/) - Python Flask API server

---

**Built with ❤️ for the basketball community**