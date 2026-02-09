// src/components/AppHeader.jsx
import { NavLink } from "react-router-dom";
import { Search, Bell, ShoppingCart } from "lucide-react";
import logoImage from "../assets/learnify_logo.png";

export function AppHeader() {
  const onSubmitSearch = (e) => e.preventDefault();

  return (
    <header className="sticky-top border-bottom full-header bg-white" style={{ zIndex: 1030 }}>
      <nav className="navbar navbar-expand-lg">
        <div className="container py-2">
          {/* Left: Logo */}
          <NavLink to="/" className="navbar-brand d-flex align-items-center m-0">
            <img
              src={logoImage}
              alt="Learnify"
              height="44"
              className="learnify-logo"
            />
          </NavLink>

          {/* Mobile toggler */}
          <button
            className="navbar-toggler ms-auto"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#learnifyHeader"
            aria-controls="learnifyHeader"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>

          {/* Collapsible content */}
          <div className="collapse navbar-collapse" id="learnifyHeader">
            {/* Center: Search */}
            <form
              className="d-flex mx-lg-auto my-3 my-lg-0"
              role="search"
              onSubmit={onSubmitSearch}
              style={{ maxWidth: 560, width: "100%" }}
            >
              <div className="input-group rounded-pill border overflow-hidden w-100">
                <span className="input-group-text bg-white border-0">
                  <Search size={18} className="text-secondary" />
                </span>
                <input
                  type="search"
                  className="form-control border-0 learnify-search"
                  placeholder="What do you want to learn today?"
                  aria-label="Search"
                />
              </div>
            </form>

            {/* Right: Buttons + Icons */}
            <div className="d-flex align-items-center gap-3 ms-lg-auto pb-2 pb-lg-0">
              <NavLink
                to="/login"
                className="btn btn-learnify-login rounded-pill px-4 "
              >
                Login
              </NavLink>

              <NavLink
                to="/courses"
                className="btn btn-learnify-enroll rounded-pill px-4"
              >
                Enroll now!
              </NavLink>

              <button
                type="button"
                className="btn btn-light rounded-circle d-inline-flex align-items-center justify-content-center"
                aria-label="Notifications"
                style={{ width: 44, height: 44 }}
              >
                <Bell size={20} />
              </button>

              <NavLink
                to="/cart"
                className="btn btn-light rounded-circle d-inline-flex align-items-center justify-content-center"
                aria-label="Cart"
                style={{ width: 44, height: 44 }}
              >
                <ShoppingCart size={20} />
              </NavLink>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}
