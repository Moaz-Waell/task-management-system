# Task Management System

A full-stack task management web app. Users can register, log in, and manage their own tasks — create, view, edit, delete, search, filter by status, and attach a file to a task. Built as a team project (backend in Node/Express/MongoDB, frontend in Angular).

## Tech Stack

**Backend**
- Node.js + Express
- MongoDB (Atlas) with Mongoose
- JWT for authentication
- bcrypt for password hashing
- Multer for file uploads

**Frontend**
- Angular (module-based, not standalone)
- Bootstrap 5 for styling
- Reactive + template-driven forms
- RxJS (Observables/HttpClient)

## Project Structure

```
task-management-system/
 ├── backend/
 │   ├── controllers/
 │   ├── middlewares/
 │   ├── models/
 │   ├── routes/
 │   ├── uploads/
 │   ├── config.env         (not committed — see setup below)
 │   ├── config.example.env
 │   └── index.js
 ├── frontend/
 │   └── src/app/
 │       ├── login/
 │       ├── register/
 │       ├── dashboard/
 │       ├── tasklist/
 │       ├── task-form/
 │       ├── profile/
 │       ├── navbar/
 │       ├── sidebar/
 │       ├── guards/
 │       ├── models/
 │       └── services/
 └── postman/
     └── Task Management System.postman_collection.json
```

## Features

- **Auth** — register, login, JWT-based sessions
- **Tasks** — full CRUD, scoped to the logged-in user
- **Search & filter** — by title (partial match) and status
- **File upload** — attach a file to a task
- **Route guards** — protected pages require login; login/register redirect away if already logged in
- **Profile** — update name/email

## Setup

### 1. Backend

```
cd backend
npm install
```

Create `backend/config.env` (copy `config.example.env`) and fill in:

```
mongo_url=<your MongoDB Atlas connection string>
port=8000
secret_key=<any long random string — must match for everyone on the team>
```

Run it:

```
node index.js
```

You should see `DB connected` and `server listen` in the terminal.

### 2. Frontend

```
cd frontend
npm install
ng serve
```

Open `http://localhost:4200`.

## API Overview

| Method | Route | Auth required | Notes |
|---|---|---|---|
| POST | `/auth/register` | No | Create an account |
| POST | `/auth/login` | No | Returns a JWT |
| GET | `/tasks` | Yes | Supports `?title=&status=` |
| GET | `/tasks/:id` | Yes | |
| POST | `/tasks` | Yes | |
| PUT | `/tasks/:id` | Yes | |
| DELETE | `/tasks/:id` | Yes | |
| POST | `/tasks/:id/upload` | Yes | Multipart form, field name `attachment` |
| PUT | `/users/:id` | Yes | Update profile |

Protected routes expect the token in the `authorization` header (no `Bearer` prefix).

## Postman Collection

Full collection covering every endpoint (Auth, Users, Tasks, Uploaded Files), with login set up to auto-save the token for testing the protected routes.

Import [`postman/Task Management System.postman_collection.json`](postman/Task%20Management%20System.postman_collection.json) into Postman (File → Import).

## Notes

- CORS on the backend is locked to `http://localhost:4200`.
- Route guards currently check only that a token exists, not whether it's expired.
- A shared Postman collection covers all endpoints for manual testing.
