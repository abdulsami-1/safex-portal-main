# SafeX Portal

SafeX Portal is a full-stack candidate directory for tracking intern applicants. The application uses React + Vite on the frontend and Node.js + Express + MongoDB on the backend.

## Features

- View a directory of candidate records
- Filter candidates by group and field
- Display candidate ratings and task status
- Seed initial candidate data from the backend

## Project structure

- backend/ — Express API, MongoDB models, seed script, and routes
- frontend/ — React/Vite app and UI components
- README.md — project overview and setup guide

## Prerequisites

- Node.js 18+
- npm 9+
- MongoDB running locally or a reachable MongoDB Atlas instance

## Local setup

1. Install dependencies:
   - `cd backend && npm install`
   - `cd frontend && npm install`
2. Create local environment files for your machine only:
   - `backend/.env`
   - `frontend/.env`
3. Ensure MongoDB is running.
4. Seed the database:
   - `cd backend && npm run seed`
5. Start the backend:
   - `cd backend && npm run dev`
6. Start the frontend:
   - `cd frontend && npm run dev`

Open http://localhost:5173 to view the app.

## API endpoints

- `GET /api/candidates` — list candidates
- `GET /api/candidates?group=Group+1` — filter by group
- `GET /api/candidates?field=Design` — filter by field
- `GET /health` — health check

## Security notes

- Never commit real environment files such as `.env`, `backend/.env`, or `frontend/.env`.
- Keep MongoDB connection strings, API keys, and secrets in local-only files.
- The repository ignores environment files and example env files by default.
- Review any future deployment settings carefully before pushing to GitHub.

## Scripts

### Backend
- `npm run dev` — start the API with nodemon
- `npm start` — start the API normally
- `npm run seed` — clear and reseed the database

### Frontend
- `npm run dev` — start the Vite dev server
- `npm run build` — create a production build
- `npm run preview` — preview the production build
