# Build Log — RUET Find

This document is a step-by-step record of how RUET Find was built from scratch. It is written for a new developer who wants to understand the project, rebuild it, or continue working on it.

Follow the steps in order. Each step explains what to install, which file to create next, and why the file exists.

---

## Phase 0 — Prerequisites

Install these tools first:

| Tool | Purpose | Check |
| ---- | ------- | ----- |
| Node.js >= 18 | Runtime for both apps | `node -v` |
| npm | Package manager (ships with Node) | `npm -v` |
| Git | Version control | `git --version` |
| MongoDB | Database (Atlas cloud or local) | `mongosh --version` |

Optional but recommended:

- **Vercel CLI** — `npm i -g vercel` (frontend deploys)
- **Railway CLI** — `npm i -g @railway/cli` (backend deploys)

---

## Phase 1 — Project skeleton (root)

Start with the repository root. Only three files are needed here.

1. **`package.json`** (root)
   A workspace-style package that only holds scripts so you can run everything from the root:
   - `dev` runs server + client together
   - `install:all` installs dependencies in both folders
   - `server` / `client` run each app individually
   - `build` compiles the client

2. **`.gitignore`**
   Do this early so build artifacts never get committed:
   ```
   node_modules/
   dist/
   .env
   .env.*
   !.env.example
   uploads/*
   !uploads/.gitkeep
   *.log
   .DS_Store
   .vercel/
   ```

3. **`vercel.json`**
   Tells Vercel the frontend lives inside `ruet-find-client` (monorepo build), so a root Vercel project builds the right folder.

Now create the two apps.

---

## Phase 2 — Backend (`ruet-find-server`)

The backend is an Express + Mongoose REST API. Build it in this exact order so each layer only depends on files already created.

### 2.1 Package setup

1. `cd ruet-find-server`
2. `npm init -y`, then edit `package.json`:
   - `"type": "module"` → ES module imports everywhere
   - scripts: `start`: `node src/server.js`, `dev`: `node --watch src/server.js`, `seed`: `node src/seed.js`
3. Install dependencies:
   ```bash
   npm i express mongoose dotenv cors jsonwebtoken bcryptjs multer morgan
   ```

### 2.2 Configuration layer

4. **`src/config/env.js`**
   Load and validate environment variables. It imports `dotenv`, reads `MONGODB_URI`, `JWT_SECRET`, `PORT`, `CLIENT_URL`, and throws a clear error if required values are missing. Everything else in the app imports `env` from here.

5. **`src/config/db.js`**
   A single async function that calls `mongoose.connect(env.MONGODB_URI)`. Imported by `server.js` at startup.

### 2.3 Utils layer

6. **`src/utils/ApiError.js`**
   A custom error class with `statusCode` and static helpers:
   `notFound()`, `unauthorized()`, `forbidden()`, `conflict()`, `badRequest()`.

7. **`src/utils/ApiResponse.js`**
   A small helper that wraps every successful response as:
   `{ success, statusCode, data, message }`. The frontend relies on this shape.

8. **`src/utils/asyncHandler.js`**
   Wraps async route handlers so thrown errors are passed to the error middleware instead of crashing Express.

9. **`src/utils/validate.js`**
   Hand-rolled request validation helpers (validates body/params/query before controllers run).

### 2.4 Middleware layer

10. **`src/middlewares/auth.middleware.js`**
    Two functions:
    - `protect` — reads the `Authorization: Bearer <token>` header, verifies the JWT, loads the user, attaches it to `req.user`
    - `adminOnly` — rejects the request unless `req.user.role === "admin"`

11. **`src/middlewares/upload.middleware.js`**
    Multer configuration for photo uploads. Restricts file types and file size, stores uploads in `uploads/`.

12. **`src/middlewares/error.middleware.js`**
    - `notFound` — 404 for unknown routes
    - `errorHandler` — maps `ApiError` instances to JSON, formats Mongoose validation errors, hides stack traces in production

### 2.5 Auth module (`src/modules/auth`) — build the users first

Start with the auth module because **everything else references users**.

13. **`auth.model.js`**
    Mongoose schema for `User`: `name`, `email` (unique), `password` (hashed), `studentId`, `department`, `phone`, `role` (`"student"` default, `"admin"`), `avatar`. Includes a `comparePassword` method using `bcryptjs`.

14. **`auth.validation.js`**
    Validates the register/login request bodies (email format, password length, required fields).

15. **`auth.service.js`**
    Business logic:
    - `registerUser` — checks for duplicate email/studentId, creates the user, signs a JWT
    - `loginUser` — finds user, compares password, signs a JWT
    - `getMe` — returns the current user
    - `toPublicUser` — strips sensitive fields before sending the user to the client

16. **`auth.controller.js`**
    Thin handlers that call the service and respond with `ApiResponse.ok(...)`.

17. **`auth.routes.js`**
    Routes:
    - `POST /auth/register`
    - `POST /auth/login`
    - `GET /auth/me` (protected with `protect`)

### 2.6 Items module (`src/modules/items`) — the core feature

18. **`item.model.js`**
    Schema: `title`, `description`, `category` (enum: electronics, documents, keys, clothing, bags, books, other), `status` (`lost`/`found`), `itemStatus` (`pending`/`active`/`claimed`/`returned`/`expired`), `location`, `dateLostFound`, `images`, `color`, `brand`, `additionalDetails`, `contactInfo`, `reportedBy` (ref User), `claimedBy`, `locationCoordinates`. Adds indexes on the fields used for filtering/search.

19. **`item.validation.js`**
    Validates item payloads and the claim action.

20. **`item.service.js`**
    The biggest file. Handles:
    - paginated + filtered listing (`status`, `category`, `location`, `dateRange`, `search`, `sort`)
    - recent item lists and category counts
    - create, update, delete
    - **smart matching** — given an item id, scores other items by category, location, and keyword overlap, returns matches sorted by score
    - claim flow (student claims a found item; status → `claimed`)

21. **`item.controller.js`**
    Maps HTTP requests to the service functions.

22. **`item.routes.js`**
    Public routes (list, recent, categories, single, matches) + protected routes (create, update, delete, claim).

### 2.7 Admin module (`src/modules/admin`) — management endpoints

23. **`admin.service.js`**
    - `getDashboardStats` — aggregates users, lost/found/recovered counts, recent items, and weekly trends
    - `getAllItemsAdmin` — all items with filters (status, itemStatus, search) + pagination
    - `updateItemStatus` — change an item's status
    - `deleteItemAdmin` — remove an item
    - `getAllUsers` — paginated list with optional `search` by name/email/studentId

24. **`admin.controller.js`**
    Thin handlers for the above.

25. **`admin.routes.js`**
    All routes guarded by `protect` + `adminOnly`:
    - `GET /admin/dashboard`
    - `GET /admin/items`
    - `PUT /admin/items/:id/status`
    - `DELETE /admin/items/:id`
    - `GET /admin/users`

### 2.8 Wiring it together

26. **`src/app.js`**
    Creates the Express app:
    - `cors` with the origins from `env` (plus any Vercel preview domain via a helper)
    - `express.json()`, `express.urlencoded()`, `morgan` request logging
    - serves `/uploads` statically
    - mounts the three module routers under `/api/...`
    - a `/api/health` check endpoint
    - finally the `notFound` + `errorHandler` middleware

27. **`src/server.js`**
    The entry point. Connects to the database (`config/db.js`), then calls `app.listen(PORT)`.

28. **`src/seed.js`**
    Seeds demo data: an admin account, sample students, and a set of realistic lost/found items. Run with `npm run seed`.

29. **`.env.example`**
    Documents all required variables:
    ```
    PORT=5000
    MONGODB_URI=
    JWT_SECRET=
    JWT_EXPIRES_IN=7d
    CLIENT_URL=http://localhost:5173
    ```

**Backend complete.** Test it:
```bash
cd ruet-find-server
node src/seed.js
npm run dev
curl http://localhost:5000/api/health
```

---

## Phase 3 — Frontend (`ruet-find-client`)

The frontend is a React SPA built with Vite, Redux Toolkit, React Router, and Tailwind CSS.

### 3.1 Scaffold the project

1. `cd ruet-find-client`
2. Scaffold with Vite:
   ```bash
   npm create vite@latest . -- --template react
   ```
3. Install dependencies:
   ```bash
   npm i react-redux @reduxjs/toolkit react-router-dom axios
   npm i -D tailwindcss@3 postcss autoprefixer
   ```
4. Set up Tailwind: `npx tailwindcss init -p`, then configure `content` paths in `tailwind.config.js`.

### 3.2 Config files

5. **`vite.config.js`**
   - registers the Tailwind PostCSS plugin
   - dev server proxy: `/api` → `http://localhost:5000`, so the client can talk to the backend locally without CORS

6. **`index.html`**
   Root HTML with the app mount point and Material Symbols font link.

### 3.3 API layer — the only place that knows the backend URL

7. **`src/services/api.js`**
   The single Axios instance:
   - `baseURL` resolves to the API root:
     - uses `VITE_API_URL` if provided (ensuring it ends in `/api`)
     - otherwise `/api` in dev (proxied), or the production Railway URL fallback
   - request interceptor attaches the JWT from `localStorage`
   - response interceptor unwraps `{ success, data }` envelopes and forces logout on `401`
   - **All other services import from this file.**

8. **`src/services/authService.js`** — `login`, `register`, `getMe`, `logout`
9. **`src/services/itemService.js`** — `getAll`, `getRecent`, `getCategories`, `getById`, `getMatches`, `create`, `update`, `remove`, `claim`
10. **`src/services/adminService.js`** — `getDashboard`, `getAllItems`, `updateStatus`, `deleteItem`, `getUsers`

### 3.4 Redux store

11. **`src/store/index.js`** — `configureStore` combining the three slices below.
12. **`src/store/authSlice.js`** — holds `user` + `token`; async thunks `login`, `register`, `loadUser`, `logoutUser`.
13. **`src/store/itemsSlice.js`** — holds `items`, `pagination`, `loading`, `error`; thunks `fetchItems`, `getCategories`, etc.
14. **`src/store/adminSlice.js`** — holds `dashboard`, `items`, `users`, `pagination`; thunks `fetchDashboard`, `fetchAdminItems`, `updateItemStatus`, `deleteItem`, `fetchUsers`.

### 3.5 Layouts

15. **`src/layouts/MainLayout.jsx`** — public site chrome: `Navbar`, mobile bottom nav, `Footer`, and the routed pages.
16. **`src/layouts/AdminLayout.jsx`** — admin sidebar (Dashboard / Reports / Users / Settings), top bar, profile footer, `Sign Out`.

### 3.6 Routing — `src/App.jsx`

17. Define every route:
    - Public: `/` (Home), `/browse`, `/item/:id`, `/map`, `/how-it-works`
    - Protected (must be logged in): `/report`, `/profile`, `/match/:id`
    - Auth: `/auth`
    - Admin (must be role `admin`): `/admin` and `/admin/users`, `/admin/reports`, `/admin/settings`
    - `ProtectedRoute` redirects to `/auth` if no token; `AdminRoute` redirects to `/` if not admin. On first load with a saved token, dispatch `loadUser()`.

### 3.7 Pages (one file per feature)

18. **`HomePage.jsx`** — hero, report CTAs, popular categories, recently reported items.
19. **`BrowsePage.jsx`** — filters sidebar (status, category, location, date), search, sort, paginated grid. Reads `category` from the URL query.
20. **`ItemDetailPage.jsx`** — full item view, image(s), metadata, claim button if it is a found item.
21. **`ReportItemPage.jsx`** — multi-step form to report a lost/found item. Field names match the backend exactly: `title`, `dateLostFound`, `category`, etc.
22. **`CampusMapPage.jsx`** — map view of item locations.
23. **`SmartMatchPage.jsx`** — renders `/items/:id/matches` results: `{ item, score, reasons }`.
24. **`AuthPage.jsx`** — login/register tabs, includes clickable demo-account cards.
25. **`ProfilePage.jsx`** — current user profile (name, email, studentId, department, phone, role) + an Admin Panel link for admins.
26. **`HowItWorksPage.jsx`** — step-by-step guide for new users.

### 3.8 Components

27. **`src/components/navbar/Navbar.jsx`** — desktop navigation with auth-aware links.
28. **`src/components/navbar/MobileNav.jsx`** — bottom tab bar on small screens.
29. **`src/components/common/Footer.jsx`** — site footer.

### 3.9 Admin pages — `src/features/admin/`

30. **`AdminDashboard.jsx`** — metric cards, activity chart, recent submissions table.
31. **`AdminUsersPage.jsx`** — user table (role badges, search, pagination).
32. **`AdminReportsPage.jsx`** — all reports with status filter, status dropdown, delete.
33. **`AdminSettingsPage.jsx`** — placeholder settings page.

34. **`src/main.jsx`** — entry point: `BrowserRouter` > `Provider` > `App`.

**Frontend complete.** Test it:
```bash
cd ruet-find-client
npm run dev
# open http://localhost:5173
```

---

## Phase 4 — Run the full project locally

```bash
cd RUET-Find
npm run install:all

cd ruet-find-server
cp .env.example .env
# fill in MONGODB_URI and JWT_SECRET
npm run seed

cd ..
npm run dev
```

- Backend → http://localhost:5000
- Frontend → http://localhost:5173 (proxies `/api` to 5000)

---

## Phase 5 — Deploy

### Backend → Railway

1. `railway link` the `ruet-find-server` directory
2. Add env vars: `MONGODB_URI`, `JWT_SECRET`, `PORT`, `CLIENT_URL`, `JWT_EXPIRES_IN`
3. `railway up`
4. Domain → e.g. `https://ruet-find-production.up.railway.app`

### Frontend → Vercel

1. `cd ruet-find-client`
2. `vercel link` the project
3. `vercel --prod --yes`
4. Domain → `https://ruet-find.vercel.app`

Optional `VITE_API_URL`: the client already falls back to the Railway URL, so you only need it if you move the backend.

---

## Phase 6 — Things that were confusing (gotchas)

- **The `/api` prefix.** Every proxy/CORS/deploy issue traced back to the API base URL. The client always calls `.../api/...` — the backend mounts routes under `/api`, and the Vite dev proxy forwards `/api`.
- **Field naming.** The backend uses `title`/`dateLostFound`/`reportedBy`/`itemStatus`. The frontend must use the same names — mismatches look like "blank pages" or failed loads.
- **Admin routes are not public.** Everything under `/api/admin` requires a bearer token *and* the `admin` role.
- **Stale bundles after redeploys.** Vercel serves `index.html` with `Cache-Control: no-store` (see `ruet-find-client/vercel.json`) so browsers always pull the newest JS bundle. If a feature "isn't fixed," hard-refresh with `Ctrl+Shift+R`.
- **Response envelope.** The API wraps responses in `{ success, data, message }`; the Axios interceptor unwraps `response.data.data` automatically, so store thunks receive the payload directly.