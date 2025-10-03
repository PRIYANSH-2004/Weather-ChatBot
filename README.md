# WeatherApp ChatBot [ATMOS-AI]

## Project Structure

### Backend
The backend is built using Node.js and Express.js. It handles API requests, connects to MongoDB for data storage, and serves as the core of the application.

#### Directory Structure:
```
backend/
├── .env                # Environment variables
├── .env.txt            # Sample environment variables
├── index.js            # Entry point for the backend server
├── models/             # MongoDB models
├── node_modules/       # Node.js dependencies
├── package-lock.json   # Dependency lock file
├── package.json        # Backend dependencies and scripts
└── routes/             # API routes
```

#### Key Features:
- **Express.js**: Handles HTTP requests and middleware.
- **MongoDB**: Stores chat and weather data.
- **dotenv**: Manages environment variables.
- **CORS**: Enables cross-origin requests.

### Frontend
The frontend is a React application styled with TailwindCSS. It provides an interactive user interface for chatting and weather updates.

#### Directory Structure:
```
frontend/
├── .gitignore          # Ignored files for Git
├── nginx.conf          # NGINX configuration for deployment
├── node_modules/       # Node.js dependencies
├── package-lock.json   # Dependency lock file
├── package.json        # Frontend dependencies and scripts
├── postcss.config.js   # PostCSS configuration
├── public/             # Static assets (e.g., HTML, images)
├── README.md           # Frontend-specific README
├── src/                # React source code
└── tailwind.config.js  # TailwindCSS configuration
```

#### Key Features:
- **React**: Builds the user interface.
- **TailwindCSS**: Provides utility-first CSS for styling.
- **Vite**: Optimizes the development and build process.

---

## Setup Instructions

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local or cloud instance)

### Backend Setup
1. Navigate to the `backend` directory:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file by copying `.env.txt`:
   ```bash
   cp .env.txt .env
   ```
4. Update the `.env` file with your keys:
   ```env
   GEMINI_API_KEY=YOUR_KEY
   OPENWEATHER_KEY=YOUR_KEY
   PORT=5000
   MONGODB_URI=YOUR_MONGODB_URI
   ```
5. Start the backend server:
   ```bash
   node index.js
   ```

### Frontend Setup
1. Navigate to the `frontend` directory:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the frontend development server:
   ```bash
   npm start
   ```

---

## Sample `.env` File
```env
# Backend
GEMINI_API_KEY=YOUR_KEY
OPENWEATHER_KEY=YOUR_KEY
PORT=5000
MONGODB_URI=YOUR_MONGODB_URI

# Frontend (if deployed separately)
VITE_API_BASE_URL=http://localhost:5000
```

---

## Deployment
- **Frontend**: Deploy on vercel.
- **Backend**: Deploy the Node.js server on platforms like Heroku, Render, or AWS.

---

## Contributing
1. Fork the repository.
2. Create a new branch:
   ```bash
   git checkout -b feature-name
   ```
3. Commit your changes:
   ```bash
   git commit -m "Add feature"
   ```
4. Push to the branch:
   ```bash
   git push origin feature-name
   ```
5. Open a pull request.

---

## License
This project is licensed under the MIT License.