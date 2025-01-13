# Financial Filtering App

A web-based application that helps users filter financial data using a user-friendly interface.

## Table of Contents
- [Features](#features)
- [Project Structure](#project-structure)
- [Setup Instructions](#setup-instructions)
  - [Prerequisites](#prerequisites)
  - [Local Installation](#local-installation)
- [Environment Variables](#environment-variables)
- [Running the Project Locally](#running-the-project-locally)
- [Deployed Application](#deployed-application)

## Features
- Fetch and display financial data for companies.
- Filter and sort income statements by different criteria.
- Uses a React frontend and Flask backend for a full-stack implementation.

## Project Structure
```
├── backend/
│   ├── app.py
│   ├── requirements.txt
│   └── .env
├── public/
│   └── index.html
├── src/
│   └── App.js
├── .gitignore
├── .env.local
├── package.json
└── tailwind.config.js
```
## Setup Instructions

### Prerequisites
- **Node.js** and **npm** installed. You can download them [here](https://nodejs.org/).
- **Python 3** installed. Download it from [here](https://www.python.org/downloads/).

### Local Installation
1. Clone this repository:
   ```bash
   git clone https://github.com/baller7215/financial-data-filtering-app.git
   cd financial-filtering-app
   ```
2. Install dependencies for the frontend:
   ```
   npm install
   ```
3. Navigate to the backend directory and install backend dependencies:
   ```
   cd backend
   pip install -r requirements.tzt
   ```

### Environment Variables
1. **Frontend:** Create a `.env.local` file in the root directory. Add the following content:
   ```
   REACT_APP_DEVELOPMENT_BACKEND_SERVER=http://localhost:5000
   ```
2. **Backend:** Create a `.env` file in the backend directory. You can obtain a free API key from [Financial Modeling Prep](https://site.financialmodelingprep.com/developer/docs#income-statements-financial-statements). Add the following:
   ```
   API_URL=https://financialmodelingprep.com/api/v3/income-statement/AAPL?period=annual&apikey=<your_api_key>
   API_KEY=<your_api_key>
    ```
    Replace `<your_api_key>` with your API key.

### Running the Project Locally
1. **Start the Backend:**
   ```
   cd backend
   flask run
   ```
2. **Start the Frontend:**
   ```
   npm start
   ```
3. Visit `http://localhost:3000` to use the application.

### Deployed Application
[Visit the deployed app](https://financial-data-filtering-app-pi.vercel.app/)
