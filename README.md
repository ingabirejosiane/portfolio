# Full Stack Portfolio

A complete, responsive developer portfolio with a public site and an admin dashboard.

**Stack:** React + Vite · Tailwind CSS · Node.js + Express · MySQL

## Features

- Modern dark, animated landing page (Hero, About, Skills, Projects, Contact)
- Data-driven content loaded from a MySQL database
- Working contact form that stores messages in the database
- Admin dashboard with JWT auth to manage **profile, projects, skills and messages**
- Production build served by Express from a single server
- Seed data included so the site looks complete on first run

## Project structure

```
potifoil/
├── client/                 # React + Vite + Tailwind frontend
│   ├── public/
│   └── src/
│       ├── components/     # public + admin components
│       ├── pages/          # Home, admin Login, Dashboard
│       └── lib/api.js      # tiny fetch wrapper
├── server/                 # Express + MySQL API
│   ├── src/
│   │   ├── config/db.js
│   │   ├── middleware/auth.js
│   │   ├── routes/         # auth, profile, skills, projects, messages
│   │   └── scripts/setupDb.js
│   ├── schema.sql          # tables + seed data
│   └── .env.example
└── package.json            # root scripts (concurrently)
```

## Getting started

### 1. Prerequisites

- Node.js 20.19+ (tested on Node 24)
- A running MySQL server (MySQL 8 / MariaDB)

### 2. Install dependencies

```bash
npm install
npm run install:all
```

### 3. Configure environment

Copy `server/.env.example` to `server/.env` and set your MySQL credentials:

```env
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=portfolio

ADMIN_USERNAME=admin
ADMIN_PASSWORD=admin123
JWT_SECRET=change-this-to-a-long-random-secret
```

### 4. Create the database & tables

```bash
npm run db:setup
```

This creates the `portfolio` database, all tables, and inserts sample data
(only if the tables are empty).

### 5. Run in development

```bash
npm run dev
```

- Frontend: http://localhost:5173
- API: http://localhost:5000

Vite proxies `/api` requests to the Express server.

### 6. Production build

```bash
npm run build   # builds client/dist
npm start       # Express serves the API + built client on :5000
```

Open http://localhost:5000.

## Admin dashboard

- URL: `/admin` (login at `/admin/login`)
- Default credentials: **admin / admin123** (override with `ADMIN_*` env vars)

From the dashboard you can:

- Edit your profile and social links
- Create / edit / delete projects (with featured flag and sort order)
- Manage skills by category with proficiency levels
- Read, mark read/unread, and delete contact messages

## API reference

| Method | Endpoint              | Auth | Description                |
| ------ | --------------------- | ---- | -------------------------- |
| POST   | `/api/auth/login`     | –    | Get a JWT token            |
| GET    | `/api/profile`        | –    | Get profile                |
| PUT    | `/api/profile`        | ✔    | Update profile             |
| GET    | `/api/skills`         | –    | List skills                |
| POST   | `/api/skills`         | ✔    | Create skill               |
| PUT    | `/api/skills/:id`     | ✔    | Update skill               |
| DELETE | `/api/skills/:id`     | ✔    | Delete skill               |
| GET    | `/api/projects`       | –    | List projects              |
| GET    | `/api/projects/:id`   | –    | Get project                |
| POST   | `/api/projects`       | ✔    | Create project             |
| PUT    | `/api/projects/:id`   | ✔    | Update project             |
| DELETE | `/api/projects/:id`   | ✔    | Delete project             |
| POST   | `/api/messages`       | –    | Submit contact message     |
| GET    | `/api/messages`       | ✔    | List messages              |
| PATCH  | `/api/messages/:id`   | ✔    | Toggle read status         |
| DELETE | `/api/messages/:id`   | ✔    | Delete message             |
| GET    | `/api/health`         | –    | Health check               |

Auth uses the `Authorization: Bearer <token>` header.

## Customization

- **Content** — edit it live from the admin dashboard, or change the seed data in `server/schema.sql`.
- **Colours / fonts** — `client/tailwind.config.js` and `client/src/index.css`.
- **API URL (deploy separately)** — set `VITE_API_URL` in a `client/.env` file, e.g. `VITE_API_URL=https://api.example.com/api`.
