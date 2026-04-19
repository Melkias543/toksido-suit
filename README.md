# 🕴️ Toksido Suit

> *Crafted for Excellence in Modern Menswear*

A full-stack luxury e-commerce platform for a premium suit atelier.  
Built with **Next.js (App Router)** + **Node.js/Express API**, featuring multilingual support, admin control, and modern UI/UX.

---

## ✨ Preview

![Toksido Suit Banner](https://via.placeholder.com/1200x500.png?text=Toksido+Suit+Platform)

> Elegant, multilingual, and performance-focused menswear experience.

---

## 🚀 Tech Stack

### 🖥 Frontend (`client/`)

- ⚛️ Next.js 16 (App Router)
- 🟦 TypeScript
- 🎨 Tailwind CSS v4
- 🧩 shadcn/ui
- 🌍 next-intl (EN / AM / OM)
- 📡 Axios (API + interceptors)
- 🧠 React Hook Form + Zod
- 🌌 @react-three/fiber (3D UI)
- 📊 Recharts (Admin analytics)
- 🔔 Sonner + SweetAlert2 (UX feedback)
- 🎯 Lucide Icons

---

### ⚙️ Backend (`backend/`)

- 🟢 Node.js + Express 5
- 🍃 MongoDB + Mongoose
- 🔐 JWT Authentication (Access + Refresh)
- 🔑 Google OAuth 2.0 (Passport.js)
- 📦 Multer (File uploads)
- 🛡 Helmet + Rate Limiting
- ✅ Joi validation
- 🍪 Cookie-based auth
- 🌐 CORS enabled API

---

## 🧱 Project Architecture


## Project Structure

```
toksido_suit/
├── backend/                  # Express REST API
│   ├── controllers/          # Route handler logic
│   ├── middlewares/          # Auth, multer, validation
│   ├── models/               # Mongoose schemas
│   ├── routes/               # API route definitions
│   ├── services/             # Business logic layer
│   ├── utils/                # Token, cookie, multer config
│   ├── validator/            # Joi validation schemas
│   ├── seed/                 # DB seed scripts
│   ├── uploads/              # Uploaded product images
│   └── app.js                # Express app entry point
│
└── client/                   # Next.js frontend
    ├── app/                  # App Router pages
    │   ├── admin/            # Admin dashboard pages
    │   ├── auth/             # Login & register pages
    │   ├── product/[id]/     # Product detail page
    │   ├── products/         # Products listing page
    │   └── layout.tsx        # Root layout
    ├── src/
    │   ├── api/              # Axios API call functions
    │   ├── components/       # Reusable UI components
    │   ├── context/          # Auth context (React Context)
    │   ├── i18n/             # next-intl config & routing
    │   └── utils/libs/       # Axios client, Zod schemas
    ├── messages/             # Translation JSON files
    │   ├── en.json
    │   ├── am.json
    │   └── om.json
    └── components/ui/        # shadcn/ui components
```

---

## Getting Started

### Prerequisites

- Node.js >= 18
- MongoDB (local or Atlas)

### 1. Clone the repository

```bash
git clone <repo-url>
cd toksido_suit
```

### 2. Setup Backend

```bash
cd backend
npm install
```

Create a `.env` file:

```env
PORT=1719
MONGODB_URI=mongodb+srv://<user>:<password>@cluster.mongodb.net/?appName=Cluster0
JWT_SECRET=<your_jwt_secret>
JWT_REFRESH_SECRET=<your_refresh_secret>
GOOGLE_CLIENT_ID=<your_google_client_id>
GOOGLE_CLIENT_SECRET=<your_google_client_secret>
```

Seed the database (roles + admin user):

```bash
npm run seed
```

Start the server:

```bash
npm run dev
# Server runs at http://localhost:1719
```

### 3. Setup Frontend

```bash
cd client
npm install
```

Create a `.env` file:

```env
NEXT_PUBLIC_API_URL=http://localhost:1719/api
NEXT_PUBLIC_IMAGES_URL=http://localhost:1719
```

Start the dev server:

```bash
npm run dev
# App runs at http://localhost:3000
```

---

## API Reference

Base URL: `http://localhost:1719/api`

All protected routes require a valid JWT cookie (`token`). Admin routes additionally require the `admin` role.

---

### Auth — `/auth`

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| `POST` | `/auth/register` | Public | Register a new user |
| `POST` | `/auth/login` | Public | Login and receive JWT cookie |
| `POST` | `/auth/logout` | Public | Clear auth cookie |
| `POST` | `/auth/refresh` | Public | Refresh access token via cookie |
| `GET` | `/auth/verify-admin` | Admin | Verify admin token validity |
| `GET` | `/auth/google` | Public | Initiate Google OAuth login |
| `GET` | `/auth/google/callback` | Public | Google OAuth callback |

---

### Products — `/products`

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| `GET` | `/products/get-all` | Public | Get all products |
| `GET` | `/products/products/:id` | Public | Get single product by ID |
| `POST` | `/products/create` | Admin | Create a new product (multipart/form-data) |
| `PUT` | `/products/:id` | Admin | Update a product (multipart/form-data) |
| `DELETE` | `/products/:id` | Admin | Delete a product |

**Product fields (multipart/form-data):**

```
name[en], name[am], name[or]
description[en], description[am], description[or]
price
category_id
image  (file)
```

---

### Categories — `/categories`

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| `GET` | `/categories/get-all` | Public | Get all categories |
| `GET` | `/categories/get/:id` | Public | Get single category |
| `POST` | `/categories/create` | Public | Create a category |
| `PUT` | `/categories/edit/:id` | Public | Update a category |
| `DELETE` | `/categories/delete/:id` | Public | Delete a category |

---

### Services — `/service`

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| `GET` | `/service/get-all` | Public | Get all services |
| `GET` | `/service/:id` | Public | Get single service |
| `POST` | `/service/create` | Admin | Create a service |
| `PUT` | `/service/:id` | Admin | Update a service |
| `DELETE` | `/service/:id` | Admin | Delete a service |

---

### Ratings — `/rate-suit`

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| `PATCH` | `/rate-suit/:id` | User | Rate a suit (1–5 stars) |

**Body:**
```json
{ "rating": 4 }
```

---

### Admin Utilities — `/admin-utils`

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| `GET` | `/admin-utils/all-user` | Admin | Get all users |
| `GET` | `/admin-utils/user-count` | Admin | Get total user count |
| `GET` | `/admin-utils/suit-count` | Admin | Get total product count |
| `GET` | `/admin-utils/get-role` | Admin | Get all roles |
| `POST` | `/admin-utils/create-user` | Admin | Create a user as admin |
| `DELETE` | `/admin-utils/delete-user/:id` | Admin | Delete a user |

---

## Internationalization

The app supports 3 languages controlled by the `NEXT_LOCALE` cookie:

| Code | Language |
|---|---|
| `en` | English (default) |
| `am` | Amharic (አማርኛ) |
| `om` | Oromoo |

Translation files are located in `client/messages/`. The language switcher in the navbar sets the cookie and reloads the page to apply the new locale server-side.

---

## Authentication Flow

1. User logs in → server sets an `httpOnly` JWT cookie (`token`)
2. Axios client sends requests with `withCredentials: true`
3. On `401` response, the client automatically calls `/auth/refresh` to get a new token
4. If refresh fails, the user is redirected to `/auth/login`
5. Admin routes are protected by both `authMiddleware` (valid token) and `authorize('admin')` (role check)

---

## Admin Panel

Accessible at `/admin/dashboard`. Requires admin role.

| Page | Route | Description |
|---|---|---|
| Dashboard | `/admin/dashboard` | Stats: user count, suit count |
| Products | `/admin/products` | Add, edit, delete suits |
| Services | `/admin/services` | Manage atelier services |
| Users | `/admin/user` | View, add, delete users |
| Reports | `/admin/reports` | Analytics overview |
| Settings | `/admin/settings` | App settings |

---

## Environment Variables

### Backend `.env`

```env
PORT=8000
MONGODB_URI=
JWT_SECRET=
JWT_REFRESH_SECRET=
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
```

### Frontend `.env`

```env
NEXT_PUBLIC_API_URL=http://localhost:1719/api
NEXT_PUBLIC_IMAGES_URL=http://localhost:1719
```

---

## Author

**Melkias Teshoma** — EST. 2026
