# Edubridge-Digital-Public-Good
 A collaborative platform designed to provide accessible educational resources, foster innovation, and support sustainable development goals. This repository will serve as the foundation for building backend services, managing project workflows, and enabling group contributions toward creating inclusive digital solutions.
## Backend Structure
The backend API is built with Node.js + Express and uses PostgreSQL.

### Folder Structure
- `backend/server.js` — Main API server
- `backend/package.json` — Dependencies
- `backend/routes/auth.js` — Register and login
- `backend/routes/courses.js` — Course management
- `backend/routes/quiz.js` — Quiz engine
- `backend/routes/mentor.js` — Mentor matching
- `backend/routes/forum.js` — Community forum
- `backend/database/schema.sql` — Full database schema

### API Endpoints
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | /api/auth/register | Create new account |
| POST | /api/auth/login | Login and get token |
| GET | /api/courses | Get all courses |
| GET | /api/courses/:id | Get one course |
| POST | /api/courses/:id/enroll | Enroll in course |
| GET | /api/quiz/:id | Get quiz questions |
| POST | /api/quiz/submit | Submit quiz answers |
| GET | /api/mentor | Get all mentors |
| POST | /api/mentor/request | Request a mentor |
| GET | /api/forum/posts | Get forum posts |
| POST | /api/forum/post | Create a post |
