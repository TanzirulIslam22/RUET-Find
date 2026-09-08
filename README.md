# RUET Find

A community-powered **Lost & Found** platform built for **Rajshahi University of Engineering & Technology (RUET)** campus.

Students can report lost or found items, browse listings with filters, view locations on an interactive campus map, and get smart match suggestions — all in one place.

## Live Links

| Platform | URL |
| -------- | --- |
| **Frontend (Vercel)** | https://ruet-find.vercel.app |
| **Backend API (Railway)** | https://ruet-find-production.up.railway.app |
| **GitHub Repository** | https://github.com/TanzirulIslam22/RUET-Find |

## Features

- **Browse & Search** — Filter lost/found items by category, date, and location
- **Report Items** — 4-step guided form with photo upload for lost or found items
- **Smart Matching** — Automatic pairing of lost and found reports by category, location & keywords
- **Campus Map** — Interactive map showing where items were lost or found
- **How It Works** — Step-by-step guide for new users
- **Admin Dashboard** — Metrics, item management, and user oversight
- **Responsive Design** — Works seamlessly on desktop and mobile with a bottom nav bar

## Tech Stack

| Layer    | Technology                                    |
| -------- | --------------------------------------------- |
| Frontend | React 18, Vite, Redux Toolkit, Tailwind CSS   |
| Backend  | Node.js, Express.js                           |
| Database | MongoDB Atlas (Mongoose ODM)                  |
| Auth     | JWT (JSON Web Tokens)                         |
| Hosting  | Vercel (Frontend), Railway (Backend)          |

## Project Structure

```
RUET-Find/
├── ruet-find-client/         # React frontend (Vite)
│   ├── src/
│   │   ├── components/       # Navbar, MobileNav, Footer
│   │   ├── features/         # Pages & admin module
│   │   ├── layouts/          # MainLayout, AdminLayout
│   │   ├── services/         # Axios API service
│   │   └── store/            # Redux Toolkit slices
│   ├── tailwind.config.js
│   └── vite.config.js
├── ruet-find-server/         # Express backend
│   ├── src/
│   │   ├── config/           # DB & env config
│   │   ├── middlewares/      # Auth, error, upload
│   │   ├── modules/          # auth, items, admin
│   │   ├── utils/            # ApiError, ApiResponse
│   │   └── seed.js           # Demo data seeder
│   └── .env.example
├── package.json              # Root scripts (concurrently)
└── vercel.json               # Vercel monorepo frontend config
```

## Getting Started

### Prerequisites

- Node.js >= 18
- MongoDB Atlas account (or local MongoDB)

### Setup

```bash
git clone https://github.com/TanzirulIslam22/RUET-Find.git
cd RUET-Find

# Install server & client deps
npm run install:all

# Configure environment
cd ruet-find-server
cp .env.example .env
# Edit .env with your MongoDB URI and JWT secret
```

### Seed Demo Data

```bash
cd ruet-find-server
node src/seed.js
```

### Run Development

```bash
# From root — starts both server (5000) and client (5173)
npm run dev
```

## Deployment

### Frontend (Vercel)

The repo root already includes a `vercel.json` configured to build `ruet-find-client`. Import the GitHub repo in Vercel and set:

- **Root Directory:** `/`
- **Build Command:** `cd ruet-find-client && npm install && npm run build`
- **Output Directory:** `ruet-find-client/dist`

Set the environment variable `VITE_API_URL` to your backend URL.

### Backend (Railway / Render / Fly.io)

Deploy the `ruet-find-server/` directory as a Node.js service. Set these env vars:

- `PORT`
- `MONGODB_URI`
- `JWT_SECRET`
- `JWT_EXPIRES_IN` (optional, default `7d`)
- `CLIENT_URL` (your frontend URL)

**Start command:** `node src/server.js`

## Demo Credentials

| Role    | Email                   | Password |
| ------- | ----------------------- | -------- |
| Admin   | admin@ruet.ac.bd        | admin123 |
| Student | sakib@ruet.ac.bd        | demo123  |
| Student | tanvir@ruet.ac.bd       | demo123  |
| Student | fatima@ruet.ac.bd       | demo123  |
| Student | rafid@ruet.ac.bd        | demo123  |
| Student | nusrat@ruet.ac.bd       | demo123  |

## API Endpoints

| Method | Endpoint                    | Description              | Auth    |
| ------ | --------------------------- | ------------------------ | ------- |
| POST   | /api/auth/register          | Register new user        | No      |
| POST   | /api/auth/login             | Login                    | No      |
| GET    | /api/auth/me                | Get current user profile | Yes     |
| GET    | /api/items                  | List items (filterable)  | No      |
| GET    | /api/items/recent           | Recently reported items  | No      |
| GET    | /api/items/categories       | Item counts by category  | No      |
| GET    | /api/items/:id              | Get single item          | No      |
| GET    | /api/items/:id/matches      | Smart match for item     | No      |
| POST   | /api/items                  | Report new item          | Yes     |
| PUT    | /api/items/:id              | Update item              | Yes     |
| DELETE | /api/items/:id              | Delete item              | Yes     |
| POST   | /api/items/:id/claim        | Claim an item            | Yes     |
| GET    | /api/admin/dashboard        | Admin dashboard stats    | Admin   |
| GET    | /api/admin/items            | Admin list all items     | Admin   |
| PUT    | /api/admin/items/:id/status | Admin update item status | Admin   |
| DELETE | /api/admin/items/:id        | Admin delete item        | Admin   |
| GET    | /api/admin/users            | Admin list all users     | Admin   |

## Developer

**Tanzirul Islam**
Dept. of CSE, Rajshahi University of Engineering & Technology (RUET)
RUET ID: 2203054
Email: tanzirul.islam56@gmail.com

## License

This project is licensed under the MIT License.
