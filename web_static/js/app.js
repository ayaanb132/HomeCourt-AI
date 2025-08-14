// HomeCourt AI Frontend JavaScript Application
class HomeCourtAI {
    constructor() {
        this.teams = [];
        this.currentPrediction = null;
        this.modelStats = null;
        
        this.init();
    }
    
    async init() {
        try {
            // Initialize theme
            this.initTheme();
            
            // Initialize navigation
            this.initNavigation();
            
            // Load teams and model stats
            await Promise.all([
                this.loadTeams(),
                this.loadModelStats()
            ]);
            
            // Initialize prediction form
            this.initPredictionForm();
            
            // Populate model performance
            this.populateModelPerformance();
            
            // Hide loading spinner
            this.hideLoading();
            
            console.log('🏀 HomeCourt AI initialized successfully');
        } catch (error) {
            console.error('Failed to initialize HomeCourt AI:', error);
            this.showError('Failed to initialize application. Please refresh the page.');
        }
    }
    
    // Theme Management
    initTheme() {
        const themeToggle = document.getElementById('theme-toggle');
        const html = document.documentElement;
        
        themeToggle.addEventListener('click', () => {
            if (html.classList.contains('dark')) {
                html.classList.remove('dark');
                localStorage.setItem('theme', 'light');
            } else {
                html.classList.add('dark');
                localStorage.setItem('theme', 'dark');
            }
        });
    }
    
    // Navigation Management
    initNavigation() {
        // Mobile menu toggle
        const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
        const mobileMenu = document.getElementById('mobile-menu');
        
        mobileMenuToggle.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
        });
        
        // Smooth scrolling for navigation links
        document.querySelectorAll('a[href^="#"]').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('href');
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    const offsetTop = targetElement.offsetTop - 80; // Account for fixed nav
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
                
                // Close mobile menu if open
                mobileMenu.classList.add('hidden');
            });
        });
        
        // Add scroll effect to navigation
        window.addEventListener('scroll', () => {
            const nav = document.querySelector('nav');
            if (window.scrollY > 50) {
                nav.classList.add('shadow-lg');
            } else {
                nav.classList.remove('shadow-lg');
            }
        });
    }
    
    // API Methods
    async loadTeams() {
        try {
            const response = await fetch('/api/teams');
            if (!response.ok) throw new Error('Failed to fetch teams');
            
            const data = await response.json();
            this.teams = data.teams;
            
            // Populate team selection dropdowns
            this.populateTeamSelects();
        } catch (error) {
            console.error('Error loading teams:', error);
            throw error;
        }
    }
    
    async loadModelStats() {
        try {
            const response = await fetch('/api/model-stats');
            if (!response.ok) throw new Error('Failed to fetch model stats');
            
            this.modelStats = await response.json();
        } catch (error) {
            console.error('Error loading model stats:', error);
            throw error;
        }
    }
    
    async makePrediction(homeTeam, awayTeam) {
        try {
            const response = await fetch('/api/predict', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ homeTeam, awayTeam })
            });
            
            if (!response.ok) {
                const error = await response.json();
                throw new Error(error.error || 'Failed to make prediction');
            }
            
            return await response.json();
        } catch (error) {
            console.error('Error making prediction:', error);
            throw error;
        }
    }
    
    // UI Population Methods
    populateTeamSelects() {
        const homeTeamSelect = document.getElementById('home-team');
        const awayTeamSelect = document.getElementById('away-team');
        
        // Clear existing options (except the first default option)
        homeTeamSelect.innerHTML = '<option value="">Select home team...</option>';
        awayTeamSelect.innerHTML = '<option value="">Select away team...</option>';
        
        // Add team options
        this.teams.forEach(team => {
            const homeOption = new Option(team, team);
            const awayOption = new Option(team, team);
            
            homeTeamSelect.add(homeOption);
            awayTeamSelect.add(awayOption);
        });
    }
    
    populateModelPerformance() {
        if (!this.modelStats) return;
        
        // Update metrics
        document.getElementById('accuracy-metric').textContent = `${(this.modelStats.accuracy * 100).toFixed(1)}%`;
        document.getElementById('precision-metric').textContent = `${(this.modelStats.precision * 100).toFixed(1)}%`;
        document.getElementById('recall-metric').textContent = `${(this.modelStats.recall * 100).toFixed(1)}%`;
        document.getElementById('f1-metric').textContent = `${(this.modelStats.f1Score * 100).toFixed(1)}%`;
        
        // Update feature importance chart
        this.updateFeatureImportanceChart();
    }
    
    updateFeatureImportanceChart() {
        const chartContainer = document.getElementById('feature-importance-chart');
        chartContainer.innerHTML = '';
        
        this.modelStats.featureImportance.forEach(feature => {
            const barContainer = document.createElement('div');
            barContainer.className = 'flex items-center space-x-4 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg';
            
            const importance = Math.abs(feature.coefficient);
            const maxImportance = Math.max(...this.modelStats.featureImportance.map(f => Math.abs(f.coefficient)));
            const percentage = (importance / maxImportance) * 100;
            
            barContainer.innerHTML = `
                <div class="flex-1">
                    <div class="flex justify-between items-center mb-1">
                        <span class="text-sm font-medium text-gray-700 dark:text-gray-300">${feature.feature}</span>
                        <span class="text-xs text-gray-500 dark:text-gray-400">${feature.coefficient.toFixed(3)}</span>
                    </div>
                    <div class="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2">
                        <div class="bg-gradient-to-r from-nba-blue to-court-orange rounded-full h-2 transition-all duration-1000" 
                             style="width: ${percentage}%"></div>
                    </div>
                </div>
            `;
            
            chartContainer.appendChild(barContainer);
        });
    }
    
    // Prediction Form Management
    initPredictionForm() {
        const form = document.getElementById('prediction-form');
        const homeTeamSelect = document.getElementById('home-team');
        const awayTeamSelect = document.getElementById('away-team');
        
        // Handle team selection changes
        homeTeamSelect.addEventListener('change', () => this.validateTeamSelection());
        awayTeamSelect.addEventListener('change', () => this.validateTeamSelection());
        
        // Handle form submission
        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const homeTeam = homeTeamSelect.value;
            const awayTeam = awayTeamSelect.value;
            
            if (!homeTeam || !awayTeam) {
                this.showPredictionError('Please select both teams');
                return;
            }
            
            if (homeTeam === awayTeam) {
                this.showPredictionError('Please select different teams');
                return;
            }
            
            await this.handlePredictionSubmission(homeTeam, awayTeam);
        });
    }
    
    validateTeamSelection() {
        const homeTeam = document.getElementById('home-team').value;
        const awayTeam = document.getElementById('away-team').value;
        const submitButton = document.querySelector('#prediction-form button[type="submit"]');
        
        if (homeTeam && awayTeam && homeTeam !== awayTeam) {
            submitButton.disabled = false;
            this.hidePredictionError();
        } else {
            submitButton.disabled = true;
        }
    }
    
    async handlePredictionSubmission(homeTeam, awayTeam) {
        try {
            // Show loading state
            this.setPredictionLoading(true);
            this.hidePredictionError();
            this.hidePredictionResults();
            
            // Make prediction
            const prediction = await this.makePrediction(homeTeam, awayTeam);
            this.currentPrediction = prediction;
            
            // Display results
            this.displayPredictionResults(prediction);
            
            // Scroll to results
            document.getElementById('prediction-results').scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
            
        } catch (error) {
            this.showPredictionError(error.message);
        } finally {
            this.setPredictionLoading(false);
        }
    }
    
    displayPredictionResults(prediction) {
        // Update winner and subtitle
        document.getElementById('predicted-winner').textContent = `${prediction.prediction} Wins`;
        document.getElementById('prediction-subtitle').textContent = 
            `${prediction.homeWinProbability > 0.5 ? 'Home' : 'Away'} team advantage`;
        
        // Update team names and probabilities
        document.getElementById('home-team-name').textContent = prediction.homeTeam;
        document.getElementById('away-team-name').textContent = prediction.awayTeam;
        document.getElementById('home-win-percent').textContent = `${(prediction.homeWinProbability * 100).toFixed(1)}%`;
        document.getElementById('away-win-percent').textContent = `${(prediction.awayWinProbability * 100).toFixed(1)}%`;
        
        // Update probability bars
        document.getElementById('home-win-bar').style.width = `${prediction.homeWinProbability * 100}%`;
        document.getElementById('away-win-bar').style.width = `${prediction.awayWinProbability * 100}%`;
        
        // Update key factors
        this.updatePredictionFactors(prediction.features);
        
        // Update confidence
        document.getElementById('prediction-confidence').textContent = `${(prediction.confidence * 100).toFixed(1)}%`;
        
        // Show results
        this.showPredictionResults();
    }
    
    updatePredictionFactors(features) {
        const factorsContainer = document.getElementById('prediction-factors');
        factorsContainer.innerHTML = '';
        
        const factors = [
            { 
                name: 'Win % Difference', 
                value: features.winPctDiff,
                format: (val) => `${val >= 0 ? '+' : ''}${(val * 100).toFixed(1)}%`
            },
            { 
                name: 'PPG Difference', 
                value: features.ppgDiff,
                format: (val) => `${val >= 0 ? '+' : ''}${val.toFixed(1)} pts`
            },
            { 
                name: 'FG% Difference', 
                value: features.fgPctDiff,
                format: (val) => `${val >= 0 ? '+' : ''}${(val * 100).toFixed(1)}%`
            }
        ];
        
        factors.forEach(factor => {
            const factorElement = document.createElement('div');
            factorElement.className = 'flex justify-between items-center';
            
            const impact = factor.value > 0 ? 'positive' : factor.value < 0 ? 'negative' : 'neutral';
            const textColor = impact === 'positive' ? 'text-green-200' : 
                             impact === 'negative' ? 'text-red-200' : 'text-gray-200';
            
            factorElement.innerHTML = `
                <span>${factor.name}:</span>
                <span class="${textColor} font-medium">${factor.format(factor.value)}</span>
            `;
            
            factorsContainer.appendChild(factorElement);
        });
    }
    
    // UI State Management
    setPredictionLoading(loading) {
        const button = document.querySelector('#prediction-form button[type="submit"]');
        const buttonText = document.getElementById('predict-button-text');
        const buttonIcon = document.getElementById('predict-button-icon');
        const buttonSpinner = document.getElementById('predict-button-spinner');
        
        if (loading) {
            button.disabled = true;
            buttonText.textContent = 'Predicting...';
            buttonIcon.classList.add('hidden');
            buttonSpinner.classList.remove('hidden');
        } else {
            button.disabled = false;
            buttonText.textContent = 'Predict Outcome';
            buttonIcon.classList.remove('hidden');
            buttonSpinner.classList.add('hidden');
        }
    }
    
    showPredictionError(message) {
        const errorElement = document.getElementById('prediction-error');
        const errorText = document.getElementById('prediction-error-text');
        
        errorText.textContent = message;
        errorElement.classList.remove('hidden');
    }
    
    hidePredictionError() {
        document.getElementById('prediction-error').classList.add('hidden');
    }
    
    showPredictionResults() {
        document.getElementById('prediction-results').classList.remove('hidden');
    }
    
    hidePredictionResults() {
        document.getElementById('prediction-results').classList.add('hidden');
    }
    
    hideLoading() {
        document.getElementById('loading').style.display = 'none';
    }
    
    showError(message) {
        console.error(message);
        // You could implement a global error notification here
    }
}

// Initialize the application when the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.homeCourtAI = new HomeCourtAI();
});

// Add some visual enhancements
window.addEventListener('load', () => {
    // Add fade-in animation to elements
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe cards and sections for animation
    document.querySelectorAll('.card, section').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});