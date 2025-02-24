# Crypi - Real-Time Cryptocurrency Dashboard

[![Next.js](https://img.shields.io/badge/Next.js-15.0.3-black?logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-18.2.0-blue?logo=react)](https://reactjs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-6.11.0-green?logo=mongodb)](https://www.mongodb.com/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4.17-38B2AC?logo=tailwind-css)](https://tailwindcss.com/)
[![Binance API](https://img.shields.io/badge/Binance_API-WebSocket-F0B90B?logo=binance)](https://binance-docs.github.io/apidocs/)

![Crypi Dashboard](https://cryptoproject-jub8.vercel.app/)

## 🚀 Live Demo

Visit the deployed application: [https://cryptoproject-jub8.vercel.app/](https://cryptoproject-jub8.vercel.app/)

## 📋 Overview

Crypi is a full-stack web application that provides real-time cryptocurrency data and visualizations. Built with Next.js and React, it leverages WebSocket connections to the Binance API to deliver live price updates and interactive charts for popular cryptocurrencies.

## ✨ Key Features

- **Real-time Price Tracking**: Live cryptocurrency prices via WebSocket connections to Binance API
- **Historical Data Visualization**: Interactive charts with multiple timeframes (1 day, 1 month, 1 year, 5 years)
- **Live Candlestick Charts**: Real-time updating candlestick charts for technical analysis
- **Dark/Light Mode**: Toggle between themes with persistent user preferences via localStorage
- **Responsive Design**: Fully responsive interface optimized for desktop, tablet, and mobile devices
- **MongoDB Integration**: Coin metadata (names, descriptions) stored in MongoDB database
- **Intuitive Navigation**: Easy-to-use interface with dedicated dashboard and individual coin pages

## 🔧 Technology Stack

### Frontend
- **Next.js**: React framework for server-side rendering and API routes
- **React**: UI library for building component-based interfaces
- **Tailwind CSS**: Utility-first CSS framework for styling
- **Recharts**: Composable charting library for building interactive charts
- **React Icons**: Icon library for modern web applications

### Backend
- **Next.js API Routes**: Serverless functions for backend operations
- **MongoDB**: NoSQL database for storing cryptocurrency metadata
- **Mongoose**: MongoDB object modeling tool

### Real-time Data
- **Binance WebSocket API**: Real-time cryptocurrency market data
- **WebSocket**: Real-time, two-way communication protocol

### State Management
- **React Context API**: For global state management (theme, etc.)
- **React Hooks**: For component-level state management

### Deployment
- **Vercel**: Platform for frontend deployment and serverless functions

## 🏗️ Architecture

Crypi follows a modular architecture with clear separation of concerns:

1. **Component Structure**: Reusable UI components like `CoinCard`, `LiveGraph`, `HistoricalData`
2. **Data Flow**: 
   - WebSocket connections fetch real-time price data from Binance API
   - MongoDB provides metadata about cryptocurrencies
   - Context API manages global state (theme settings)
3. **Page Structure**:
   - Home page with intro and navigation
   - Dashboard displaying all tracked cryptocurrencies
   - Individual coin pages with detailed price information and charts
   - About page with team information

## 🔌 Installation and Setup

To run Crypi locally, follow these steps:

```bash
# Clone the repository
git clone https://github.com/goodpvp90/Crypi.git
cd Crypi

# Install dependencies
npm install

# Set up environment variables
# Create a .env.local file with the following variables:
# MONGO_URI=mongodb+srv://cryptoproject:cryptoproject123@cluster0.herdsm7.mongodb.net/Crypto?retryWrites=true&w=majority
# USE_MONGOOSE=true

# Run the development server
npm run dev

# Open in browser
# Visit http://localhost:3000
```

## 📱 Usage

### Viewing the Dashboard
Navigate to the Dashboard to see all available cryptocurrencies with their current prices. Click on any coin card to view detailed information.

### Exploring Coin Details
On a coin's detail page, you can:
- View real-time price updates
- See a live candlestick chart updating in real-time
- Explore historical price data with different timeframes
- Switch between 1 day, 1 month, 1 year, and 5 year views

### Theme Toggle
Switch between dark and light modes using the toggle button in the header. Your preference is saved in localStorage and persists between sessions.

## 📁 Project Structure

```
/
├── components/         # Reusable UI components
│   ├── CoinCard.js     # Individual cryptocurrency card
│   ├── CoinInfo.js     # Cryptocurrency information display
│   ├── header.js       # Application header
│   ├── HistoricalData.js # Historical price charts
│   ├── LiveGraph.js    # Real-time price graph
│   ├── LivePrice.js    # Real-time price display
│   ├── StudentCard.js  # Team member card
│   └── ThemeToggle.js  # Dark/light mode toggle
│
├── context/           # Context providers
│   └── ThemeContext.js # Theme state management
│
├── lib/               # Utility functions
│   └── mongodb.js     # MongoDB connection utility
│
├── pages/             # Application routes
│   ├── about.js       # About team page
│   ├── api/           # API routes
│   │   └── coin-details/[coinSymbol].js  # Coin detail API
│   ├── coin/          # Coin-specific pages
│   │   └── [symbol].js # Dynamic coin page
│   ├── dashboard.js   # Dashboard page
│   ├── index.js       # Home page
│   └── _app.js        # App component wrapper
│
├── public/            # Static assets and images
│   └── images/        # Cryptocurrency icons
│
├── styles/            # CSS styles
│   └── globals.css    # Global styles
│
├── tailwind.config.js # Tailwind CSS configuration
├── package.json       # Project dependencies
├── jsconfig.json      # JavaScript configuration
└── README.md          # Project documentation
```

## 🚀 Future Improvements

- **Portfolio Tracking**: Allow users to create and track cryptocurrency portfolios
- **Price Alerts**: Implement notifications for price movements
- **Technical Indicators**: Add more advanced technical analysis tools
- **Expanded Coin Support**: Add support for more cryptocurrencies
- **Transaction History**: Enable tracking of buy/sell transactions
- **Mobile App**: Develop a native mobile application using React Native

## 👨‍💻 Team

This project was developed by a team of Software Engineering students from Braude College of Engineering:

- Ben Zacai
- Nadir Yaakov
- Roee Bar
- Eldar Gafarov