# Learnify Course Hub

A React-based web app where you can browse online courses, enroll, and learn from your enrolled courses.

---

## Tech Stack

- **React** 19, **React Router** 7
- **Bootstrap** 5 (UI)
- **Lucide React** (icons)
- **Create React App** (build & dev server)
- No HTTP client — data is handled via **local JSON**, **localStorage**, and **Promise-based mocking**

---

## Features

- **Home / Course list**: Filter by theme, level, and search; course cards
- **Course detail**: Overview, instructor, reviews, price, Enroll button
- **Register / Login**: Email + password; session persisted with **localStorage** and a **mock JWT** token
- **Enrollment**: Enroll or add to cart; stored in **localStorage** (`learnify_enrollments`)
- **My Courses**: List of enrolled courses for the logged-in user (protected route)
- **Course player**: Learning page and **reviews** (reviews stored per course in **localStorage**)
- **Protected routes**: `/my-courses`, `/cart`, `/courses/:id/learn` require login

---

## Data & API

- **Courses**: JSON in `src/data/` (courses, instructors, reviews, learningOutcomes, users) is imported and shaped in `coursesApi.js`, then returned as a Promise (no real HTTP calls).
- **Auth**: `auth.js` — user list from `users.json` seed + **localStorage** (`learnify_users`); login/register return a mock JWT string; **AuthContext** stores and restores `token` and `user` in **localStorage**.
- **Enrollments**: `enrollmentsApi.js` — **localStorage** (`learnify_enrollments`).
- **Reviews**: **localStorage** (`learnify_course_reviews`) per course ID; shown on course detail and player.

---

## Project Structure (summary)

```
src/
├── api/          # auth, courses, enrollments (local/mock)
├── components/   # AppHeader, Footer
├── contexts/     # AuthContext, CartContext, CoursesContext
├── data/         # JSON seed data
├── layouts/      # MainLayout, ProtectedRoute
├── pages/        # Home, Login, Register, Courses, CourseDetail, MyCourses, CoursePlayer, Cart
└── utils/        # courseImages, etc.
```

---

## 👥 Team Roles & Responsibilities

| Developer | Main Focus | Responsibilities | Key Contributions |
|-----------|------------|------------------|-------------------|
| **Eunsuh** | Routing & Auth | - Main routes & layout<br>- Login/Register flow<br>- Global Footer | Core app structure<br>Secure auth system<br>Consistent layout |
| **Isabella** | UI/UX Design | - My Courses sidebar<br>- Profile/Courses UI<br>- Reviews section | User-friendly layouts<br>Progress tracking UI<br>Review experience |
| **Santiago** | Business Logic | - Add to Cart system<br>- Purchase state logic<br>- Mock API integration | Cart/purchase flow<br>Smart button states<br>Error handling |

---

## Run locally

```bash
npm install
npm start
```

Open `http://localhost:3000` in your browser.

- **Build**: `npm run build`
- **Test**: `npm test`

---

## Netlify deployment

The app is deployed on **Netlify**.

- **Build command**: `npm run build`
- **Publish directory**: `build` (Create React App default)
- Connect your repo in the Netlify dashboard and use the settings above to deploy.
- **Live**: https://your-app-name.netlify.app

---

## Requirements

- Node.js (LTS recommended)
- No backend server; all data is local / localStorage.
