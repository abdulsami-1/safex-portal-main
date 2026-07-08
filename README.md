# SafeX Intern Candidate Management Portal — Week 1

A full-stack intern tracking system built with React + Vite (frontend) and
Node.js + Express + MongoDB (backend).

---

## Project Structure

```
safex-portal/
├── backend/
│   ├── models/
│   │   └── Candidate.js
│   ├── routes/
│   │   └── candidates.js
│   ├── .env.example
│   ├── package.json
│   ├── seed.js
│   └── server.js
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   └── RatingDots.jsx
│   │   ├── pages/
│   │   │   ├── CandidateDirectory.jsx
│   │   │   └── CandidateDirectory.css
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── .env.example
│   ├── index.html
│   ├── package.json
│   └── vite.config.js
├── .gitignore
└── README.md
```

---

## Prerequisites

- **Node.js** v18 or later — https://nodejs.org
- **npm** v9 or later (bundled with Node)
- **MongoDB** — choose one option below

### MongoDB Option A — Local installation (recommended for development)

1. Download and install MongoDB Community Edition:
   https://www.mongodb.com/try/download/community
2. Start the MongoDB service:
   - **macOS (Homebrew):** `brew services start mongodb-community`
   - **Windows:** MongoDB runs as a Windows Service automatically after install,
     or start it manually via Services → MongoDB Server.
   - **Linux (systemd):** `sudo systemctl start mongod`
3. Verify it is running: `mongosh` should open a shell without errors.
4. Copy `backend/.env.example` to `backend/.env` — the default URI already points
   to your local instance.

### MongoDB Option B — Free MongoDB Atlas cloud cluster

1. Create a free account at https://cloud.mongodb.com
2. Create a free **M0** cluster (any region).
3. Under **Database Access**, create a user with read/write permissions.
4. Under **Network Access**, add `0.0.0.0/0` for local dev.
5. Click **Connect → Drivers**, copy the connection string.
6. Open `backend/.env` and replace `MONGODB_URI` with your Atlas string:
   ```
   MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/safex_portal?retryWrites=true&w=majority
   ```

---

## Setup & Run

You need **two terminals** open simultaneously.

### Terminal 1 — Backend

```bash
cd backend
npm install

# Copy env file and fill in your values
cp .env.example .env

# ⚠️  Make sure MongoDB is running BEFORE seeding
npm run seed
# Expected: Connected to MongoDB → Inserted 8 candidates → Done.

npm run dev
# Expected: MongoDB connected → API running on http://localhost:5000
```

### Terminal 2 — Frontend

```bash
cd frontend
npm install

# Copy env file (default value works out of the box)
cp .env.example .env

npm run dev
# Expected: VITE ready → http://localhost:5173/
```

Open **http://localhost:5173** in your browser.

---

## Available Scripts

### Backend (`/backend`)

| Script | Command | Description |
|---|---|---|
| `npm run dev` | `nodemon server.js` | Start API with auto-restart |
| `npm start` | `node server.js` | Start API (no auto-restart) |
| `npm run seed` | `node seed.js` | Clear + re-seed the database |

### Frontend (`/frontend`)

| Script | Command | Description |
|---|---|---|
| `npm run dev` | `vite` | Start Vite dev server on :5173 |
| `npm run build` | `vite build` | Production build to `dist/` |
| `npm run preview` | `vite preview` | Preview the production build locally |

---

## API Endpoints

Base URL: `http://localhost:5000`

| Method | Path | Description |
|---|---|---|
| `GET` | `/api/candidates` | List all candidates |
| `GET` | `/api/candidates?group=Group+1` | Filter by group |
| `GET` | `/api/candidates?field=Design` | Filter by field |
| `POST` | `/api/candidates` | Create a candidate (JSON body) |
| `GET` | `/health` | API health check |

---

## Environment Variables

### `backend/.env`

| Variable | Default | Description |
|---|---|---|
| `MONGODB_URI` | `mongodb://127.0.0.1:27017/safex_portal` | MongoDB connection string |
| `PORT` | `5000` | Port the Express server listens on |
| `CLIENT_ORIGIN` | `http://localhost:5173` | Frontend origin allowed by CORS |

### `frontend/.env`

| Variable | Default | Description |
|---|---|---|
| `VITE_API_URL` | `http://localhost:5000` | Base URL for API calls |

> **Never commit `.env` files.** They are listed in `.gitignore`.

---

## Troubleshooting

**`MongooseServerSelectionError` when running seed or server**
→ MongoDB is not running. Start it (see Prerequisites above) then retry.

**`CORS` errors in the browser console**
→ Confirm `CLIENT_ORIGIN` in `backend/.env` exactly matches the URL shown in
your Vite terminal. Restart the backend after any `.env` change.

**Port already in use**
→ Change `PORT` in `backend/.env` and `VITE_API_URL` in `frontend/.env` to a
free port, then restart both servers.

**Blank page / no candidates showing**
→ Check the browser console for fetch errors. Confirm the backend is running
and that you ran `npm run seed` successfully.

---

## Week 2+ Extension Notes

- **Adding a new field to the schema:** edit `backend/models/Candidate.js`
  (comments inside guide you), then update `FIELD_OPTIONS` in
  `frontend/src/pages/CandidateDirectory.jsx`.
- **Adding new task statuses:** update the `taskStatus` enum in
  `backend/models/Candidate.js` and `STATUS_COLORS` in `CandidateDirectory.jsx`.
- **Add/Edit/Delete UI** is scoped to Week 2.

---

*SafeX Portal v1.0 · Week 1 · Authorised Personnel Only*
