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
|----------|------------|------------------|-------------------|
| Eunsuh | Routing, Auth, Global Layout | - Set up main routes (`/login`, `/courses`, `/courses/:id`, `/my-courses`)<br>- Implement main layout (header/nav/content shell)<br>- Implement authentication flow (login, protected routes, localStorage)<br>- Implement **Create Account** (register + auto-login)<br>- Implement global **Footer** component | - Defined core app structure and navigation<br>- Built secure login/register experience<br>- Ensured consistent layout and footer across all pages |
| Isabella | UI/UX, My Courses, Reviews | - Implement Header/Nav UI and active states<br>- Build **My Courses** page (sidebar: Profile / Courses)<br>- Profile view (email, name, password placeholders)<br>- Horizontal course cards with progress bars<br>- Course page layout (content structure, reviews section)<br>- Review list and **new review input** UI | - Designed and implemented user-facing layouts<br>- Created a clear My Courses experience with progress<br>- Made course and review sections easy to use and read |
| Santiago | Business Logic, Cart, Purchase State | - Replace **Wishlist** with **Add to Cart** feature<br>- Implement global cart state (context/store)<br>- Implement purchase state check (already bought vs not bought)<br>- On course detail: change button to “Go to My Courses” if purchased<br>- Integrate mock APIs for enroll/purchase/review flows<br>- Handle error states and console clean-up | - Implemented cart and purchase logic for courses<br>- Connected UI with mock API-based business rules<br>- Improved reliability by handling edge cases and errors |

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

---

## 🧩 Scrum & Project Management

We managed our development process using **Jira**.

| Artifact | Link |
|----------|------|
| Product Backlog | [Backlog](https://webdev-final-project.atlassian.net/jira/software/projects/FP/boards/1/backlog?atlOrigin=eyJpIjoiZDk0ZDQ1NzI5ZjMxNDFkMWIxYWE0NWQ5MzYzYzIwMWUiLCJwIjoiaiJ9) |
| Sprint Board | [Board](https://webdev-final-project.atlassian.net/jira/software/projects/FP/boards/1?atlOrigin=eyJpIjoiM2JiMDI2MGE2ODQzNDkxZWIwYWU4M2FmZGZkOWE4Y2EiLCJwIjoiaiJ9) |
| Summary | [Summary](https://webdev-final-project.atlassian.net/jira/software/projects/FP/summary?atlOrigin=eyJpIjoiNGRjNGJlNWIzOWRiNDM5OWE2OGE2NGFlNmE2M2I1NTQiLCJwIjoiaiJ9) |


