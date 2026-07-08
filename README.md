# SafeX Portal

A full-stack candidate directory built with React + Vite on the frontend and Node.js + Express + MongoDB on the backend.

## Quick start

1. Install dependencies in both folders:
   - `cd backend && npm install`
   - `cd frontend && npm install`
2. Create local environment files from the provided templates if needed:
   - `backend/.env`
   - `frontend/.env`
3. Start MongoDB locally.
4. Seed and run the backend:
   - `cd backend && npm run seed`
   - `cd backend && npm run dev`
5. Start the frontend:
   - `cd frontend && npm run dev`

Open http://localhost:5173 to view the app.

## Important

- Do not commit real environment files such as `.env`, `backend/.env`, `frontend/.env`, or any `.env.example` files.
- Keep local config values in your own machine-only environment files.

## Scripts

### Backend
- `npm run dev` — start the API with nodemon
- `npm start` — start the API normally
- `npm run seed` — clear and reseed the database

### Frontend
- `npm run dev` — start the Vite dev server
- `npm run build` — create a production build
- `npm run preview` — preview the production build
