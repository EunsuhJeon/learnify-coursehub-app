import { NavLink } from "react-router-dom";

export default function AppHeader() {
  const linkClass = ({ isActive }) =>
    "nav-link" + (isActive ? " active fw-semibold" : "");

  return (
    <nav className="navbar navbar-expand-md navbar-light bg-light border-bottom">
      <div className="container">
        {/* Brand */}
        <NavLink className="navbar-brand fw-bold" to="/courses">
          CourseHub
        </NavLink>

        {/* Mobile toggle */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#mainNav"
          aria-controls="mainNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Links */}
        <div className="collapse navbar-collapse" id="mainNav">
          <div className="navbar-nav ms-auto">
            <NavLink to="/login" className={linkClass}>
              Login
            </NavLink>

            <NavLink to="/courses" className={linkClass}>
              Courses
            </NavLink>

            <NavLink to="/my-courses" className={linkClass}>
              My Courses
            </NavLink>
          </div>
        </div>
      </div>
    </nav>
  );
}
