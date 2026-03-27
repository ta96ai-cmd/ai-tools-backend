# AI Tools Universe — Backend API

Full Node.js + Express REST API powering the AI Tools directory.

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Start the server
npm start

# Server runs at: http://localhost:3001
# Admin panel at: http://localhost:3001/admin
```

## 🔑 Default Credentials
```
Email:    admin@aitools.com
Password: admin123
```

---

## 📡 API Endpoints

### Auth
| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | `/api/auth/register` | No | Register new user |
| POST | `/api/auth/login` | No | Login, returns JWT |
| GET  | `/api/auth/me` | User | Get current user profile |
| GET  | `/api/auth/users` | Admin | List all users |

### Tools (Public)
| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET  | `/api/tools` | No | List all tools (supports `?q=`, `?category=`, `?free=true`, `?sort=name`) |
| GET  | `/api/tools/categories` | No | List all categories with tool counts |
| GET  | `/api/tools/stats` | No | Summary stats |
| GET  | `/api/tools/:id` | No | Get single tool |
| POST | `/api/tools/submit` | User | Submit a new tool for review |

### Favourites (User)
| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET    | `/api/favourites` | User | List my favourited tools |
| POST   | `/api/favourites/:toolId` | User | Add to favourites |
| DELETE | `/api/favourites/:toolId` | User | Remove from favourites |
| GET    | `/api/favourites/check/:toolId` | User | Check if tool is favourited |

### Admin
| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET    | `/api/admin/dashboard` | Admin | Stats + top tools + recent users |
| GET    | `/api/admin/tools` | Admin | All tools (incl hidden) |
| POST   | `/api/admin/tools` | Admin | Create tool directly |
| PUT    | `/api/admin/tools/:id` | Admin | Update tool |
| DELETE | `/api/admin/tools/:id` | Admin | Delete tool |
| GET    | `/api/admin/submissions` | Admin | List submissions (`?status=pending`) |
| PUT    | `/api/admin/submissions/:id/approve` | Admin | Approve & publish tool |
| PUT    | `/api/admin/submissions/:id/reject` | Admin | Reject submission |
| GET    | `/api/admin/users` | Admin | List all users |

---

## 🗄️ Data Storage
Uses JSON files (no database setup needed):
- `data/users.json` — User accounts
- `data/tools.json` — All tools (seeded with 20 tools)
- `data/favourites.json` — User favourites
- `data/submissions.json` — Tool submissions

---

## 🔐 Authentication
Uses JWT Bearer tokens. Include in headers:
```
Authorization: Bearer <your_token>
```
Tokens expire in **7 days**.

---

## 🔌 Connect to Frontend
In your `ai-tools-directory.html`, set the API base:
```js
const API_BASE = 'http://localhost:3001/api';
```

Example — user login from frontend:
```js
const res = await fetch(`${API_BASE}/auth/login`, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ email, password })
});
const { token, user } = await res.json();
```

---

## 🌐 Deploy to Production
Set environment variables:
```env
PORT=3001
JWT_SECRET=your-very-secure-secret-here
```

Compatible with: Railway, Render, Fly.io, VPS
