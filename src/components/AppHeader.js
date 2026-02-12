// src/components/AppHeader.jsx
import { NavLink } from "react-router-dom";
import { Search, ShoppingCart } from "lucide-react";
import { useAuth } from "../contexts/AuthContext";
import logoImage from "../assets/learnify_logo.png";
import "../index.css";

export function AppHeader() {
  const { isAuthenticated } = useAuth();
  const onSubmitSearch = (e) => e.preventDefault();

  return (
    <header
      className="sticky-top border-bottom full-header bg-white"
      style={{ zIndex: 1030 }}
    >
      <nav className="navbar navbar-expand-lg">
        <div className="container py-2">
          <div className="d-flex d-lg-none align-items-center w-100">
            {/* Left: Hamburger */}
            <button
              className="navbar-toggler border-0 p-0"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#learnifyHeader"
              aria-controls="learnifyHeader"
              aria-expanded="false"
              aria-label="Toggle navigation"
              style={{ width: 44, height: 44 }}
            >
              <span className="navbar-toggler-icon" />
            </button>

            <div className="flex-grow-1 text-center">
              <NavLink to="/" className="navbar-brand m-0 d-inline-flex">
                <img
                  src={logoImage}
                  alt="Learnify"
                  height="44"
                  className="learnify-logo"
                />
              </NavLink>
            </div>

            <NavLink
              to="/cart"
              className="btn btn-light rounded-circle d-inline-flex align-items-center justify-content-center"
              aria-label="Cart"
              style={{ width: 44, height: 44 }}
            >
              <ShoppingCart size={20} />
            </NavLink>
          </div>

          <NavLink
            to="/"
            className="navbar-brand d-none d-lg-flex align-items-center m-0"
          >
            <img
              src={logoImage}
              alt="Learnify"
              height="44"
              className="learnify-logo"
            />
          </NavLink>


          <div className="collapse navbar-collapse w-100" id="learnifyHeader">
            <form
              className="d-none d-lg-flex mx-lg-auto my-3 my-lg-0"
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

            <div className="d-lg-none pt-3 pb-2 w-100">
              <div className="d-flex flex-column gap-2">
                {!isAuthenticated ? (
                  <>
                    <NavLink
                      to="/login"
                      className="btn btn-learnify-login rounded-pill w-100"
                    >
                      Login
                    </NavLink>

                    <NavLink
                      to="/courses"
                      className="btn btn-learnify-enroll rounded-pill w-100"
                    >
                      Enroll now!
                    </NavLink>
                  </>
                ) : (
                  <>
                    <NavLink
                      to="/my-courses"
                      className="btn btn-learnify-login rounded-pill w-100"
                    >
                      My Account
                    </NavLink>

                    <NavLink
                      to="/courses"
                      className="btn btn-learnify-enroll rounded-pill w-100"
                    >
                      Browse Courses
                    </NavLink>
                  </>
                )}
              </div>
            </div>

            <div className="d-none d-lg-flex align-items-center gap-3 ms-lg-auto pb-2 pb-lg-0">
              {!isAuthenticated ? (
                <NavLink
                  to="/login"
                  className="btn btn-learnify-login rounded-pill px-4"
                >
                  Login
                </NavLink>
              ) : (
                <NavLink
                  to="/my-courses"
                  className="btn btn-learnify-login rounded-pill px-4"
                >
                  My Account
                </NavLink>
              )}

              <NavLink
                to="/courses"
                className="btn btn-learnify-enroll rounded-pill px-4"
              >
                {!isAuthenticated ? "Enroll now!" : "Browse Courses"}
              </NavLink>

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
