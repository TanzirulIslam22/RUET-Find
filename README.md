# RUET Find

**A community Lost & Found platform for Rajshahi University of Engineering & Technology (RUET).**

Students can report lost or found items, browse and filter listings, explore an interactive campus map, and receive automatic match suggestions — all in one place.

## Live Links

| Platform | URL |
| -------- | --- |
| Frontend | https://ruet-find.vercel.app |
| Backend API | https://ruet-find-production.up.railway.app |
| Repository | https://github.com/TanzirulIslam22/RUET-Find |

## Features

- **Browse & Search** — filter lost/found reports by category, location, date, and keyword
- **Report Items** — guided form for reporting lost or found items
- **Smart Matching** — pairs new reports with similar ones by category, location, and keywords
- **Campus Map** — visual map of where items were lost or found
- **Admin Panel** — dashboard metrics, report and user management
- **User Profiles** — view and manage your account information
- **Responsive UI** — mobile-first design with bottom navigation on small screens

## Tech Stack

| Layer | Technology |
| ----- | ---------- |
| Frontend | React, Vite, Redux Toolkit, Tailwind CSS |
| Backend | Node.js, Express |
| Database | MongoDB Atlas (Mongoose) |
| Auth | JWT |
| Hosting | Vercel (frontend), Railway (backend) |

## Project Structure

```
RUET-Find/
├── ruet-find-client/          # React frontend
│   ├── src/
│   │   ├── components/        # Reusable UI components
│   │   ├── features/          # Pages and admin module
│   │   ├── layouts/           # Main and admin layouts
│   │   ├── services/          # API service layer
│   │   └── store/             # Redux Toolkit state
│   └── vercel.json
├── ruet-find-server/          # Express backend
│   ├── src/
│   │   ├── config/            # Environment and database
│   │   ├── middlewares/       # Auth, error, upload
│   │   ├── modules/           # auth, items, admin
│   │   ├── utils/             # API helpers
│   │   └── seed.js            # Demo data seeder
│   └── .env.example
├── package.json               # Root development scripts
└── LICENSE
```

## Getting Started

### Prerequisites

- Node.js >= 18
- MongoDB (Atlas or local)

### Setup

```bash
git clone https://github.com/TanzirulIslam22/RUET-Find.git
cd RUET-Find
npm run install:all

cd ruet-find-server
cp .env.example .env
# Set MONGODB_URI and JWT_SECRET
```

### Seed demo data (optional)

```bash
cd ruet-find-server
node src/seed.js
```

The seeder creates an admin account, sample students, and demo items.

### Run the app

```bash
# From the repo root — runs both server (port 5000) and client (port 5173)
npm run dev
```

Open http://localhost:5173.

## Scripts

| Command | Description |
| ------- | ----------- |
| `npm run dev` | Run server and client in development |
| `npm run server` | Run the backend only |
| `npm run client` | Run the frontend only |
| `npm run build` | Build the frontend for production |
| `npm run seed` | Seed the database with demo data |

## Deployment

### Frontend (Vercel)

Import the repository into Vercel. The root `vercel.json` handles the monorepo build (`ruet-find-client`).

| Setting | Value |
| ------- | ----- |
| Root Directory | `/` |
| Build Command | `cd ruet-find-client && npm install && npm run build` |
| Output Directory | `ruet-find-client/dist` |

Set `VITE_API_URL` to your backend URL if you are not using the default.

### Backend (Railway / Render / Fly.io)

Deploy the `ruet-find-server/` directory as a Node.js service.

**Start command:** `node src/server.js`

| Environment Variable | Description |
| -------------------- | ----------- |
| `PORT` | Server port |
| `MONGODB_URI` | MongoDB connection string |
| `JWT_SECRET` | Secret used to sign tokens |
| `JWT_EXPIRES_IN` | Token lifetime (default `7d`) |
| `CLIENT_URL` | Allowed frontend origin for CORS |

## Demo Credentials

| Role | Email | Password |
| ---- | ----- | -------- |
| Admin | admin@ruet.ac.bd | admin123 |
| Student | sakib@ruet.ac.bd | demo123 |
| Student | tanvir@ruet.ac.bd | demo123 |
| Student | fatima@ruet.ac.bd | demo123 |
| Student | rafid@ruet.ac.bd | demo123 |
| Student | nusrat@ruet.ac.bd | demo123 |

## API Overview

| Method | Endpoint | Description | Auth |
| ------ | -------- | ----------- | ---- |
| POST | `/api/auth/register` | Register a new user | — |
| POST | `/api/auth/login` | Log in | — |
| GET | `/api/auth/me` | Current user profile | Yes |
| GET | `/api/items` | List items (filterable) | — |
| GET | `/api/items/recent` | Recently reported items | — |
| GET | `/api/items/:id` | Get a single item | — |
| GET | `/api/items/:id/matches` | Smart matches for an item | — |
| POST | `/api/items` | Report an item | Yes |
| PUT | `/api/items/:id` | Update an item | Yes |
| POST | `/api/items/:id/claim` | Claim an item | Yes |
| GET | `/api/admin/dashboard` | Admin dashboard stats | Admin |
| GET | `/api/admin/items` | Admin item management | Admin |
| PUT | `/api/admin/items/:id/status` | Update item status | Admin |
| DELETE | `/api/admin/items/:id` | Delete an item | Admin |
| GET | `/api/admin/users` | Admin user management | Admin |

## License

This project is released under the [MIT License](./LICENSE).