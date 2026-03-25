# Final Year Project - Django + React

This project consists of a Django backend and a React (Vite) frontend.

## Prerequisites

- [Python 3.x](https://www.python.org/)
- [Node.js](https://nodejs.org/)

## Setup Instructions

### 1. Backend Setup

Navigate to the project root:

```bash

#create virtual environment

python -m venv venv

# Activate virtual environment (Windows)
.venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Run migrations
python backend/manage.py migrate

# Start the server
python backend/manage.py runserver
```

The API will be available at `http://localhost:8000/api/`.

### 2. Frontend Setup

Navigate to the frontend directory:

```bash
cd frontend

# Install dependencies (if not already done)
npm install

# Start the dev server
npm run dev
```

The frontend will be available at `http://localhost:5173/` (or similar).

## Project Structure

- `backend/`: Django project files.
- `frontend/`: React application.
- `.venv/`: Python virtual environment.
