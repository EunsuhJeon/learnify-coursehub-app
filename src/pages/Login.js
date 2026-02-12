import { useMemo, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "./Login.css";
import { useAuth } from "../contexts/AuthContext";
import { loginRequest } from "../api/auth";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();

  // form state
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // ui state
  const [touched, setTouched] = useState({ email: false, password: false });
  const [formError, setFormError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const fieldErrors = useMemo(() => {
    const errors = {};
    const emailTrim = email.trim();

    if (!emailTrim) errors.email = "Email is required.";
    else if (!emailRegex.test(emailTrim)) errors.email = "Please enter a valid email.";

    if (!password) errors.password = "Password is required.";
    else if (password.length < 6) errors.password = "Password must be at least 6 characters.";

    return errors;
  }, [email, password]);

  const isValid = Object.keys(fieldErrors).length === 0;
  const showEmailError = touched.email && fieldErrors.email;
  const showPasswordError = touched.password && fieldErrors.password;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError("");
    setTouched({ email: true, password: true });

    if (!isValid) return;

    try {
      setIsSubmitting(true);

      const data = await loginRequest(email.trim(), password);

      await login(data.token, data.user);

      navigate("/my-courses");
    } catch (err) {
      if (err?.status === 401 || err?.message?.toLowerCase?.().includes("invalid")) {
        setFormError("Invalid email or password. Please try again.");
      } else {
        setFormError("Something went wrong. Please try again.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="login-page">
      <div className="container py-4 py-md-5">
        <div className="row justify-content-center">
          <div className="col-12 col-sm-10 col-md-7 col-lg-5">
            <div className="card login-card shadow-sm">
              <div className="card-body p-4 p-md-4">
                <div className="d-flex align-items-center justify-content-between mb-3">
                  <h1 className="h4 mb-0 fw-bold text-dark">Sign in</h1>
                </div>

                <p className="text-secondary mb-4">
                  Welcome back! Enter your details to continue.
                </p>

                {formError ? (
                  <div className="alert alert-danger py-2" role="alert">
                    {formError}
                  </div>
                ) : null}

                <form className="d-grid gap-3" onSubmit={handleSubmit} noValidate>
                  <div>
                    <label htmlFor="email" className="form-label mb-1">
                      Email
                    </label>
                    <input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      onBlur={() => setTouched((t) => ({ ...t, email: true }))}
                      className={`form-control login-input ${showEmailError ? "is-invalid" : ""}`}
                      placeholder="name@email.com"
                      autoComplete="email"
                    />
                    {showEmailError ? (
                      <div className="invalid-feedback">{fieldErrors.email}</div>
                    ) : null}
                  </div>

                  <div>
                    <div className="d-flex align-items-center justify-content-between">
                      <label htmlFor="password" className="form-label mb-1">
                        Password
                      </label>

                    </div>

                    <input
                      id="password"
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      onBlur={() => setTouched((t) => ({ ...t, password: true }))}
                      className={`form-control login-input ${showPasswordError ? "is-invalid" : ""}`}
                      placeholder="Your password"
                      autoComplete="current-password"
                    />
                    {showPasswordError ? (
                      <div className="invalid-feedback">{fieldErrors.password}</div>
                    ) : null}
                  </div>

                  <button
                    type="submit"
                    className="btn login-btn"
                    disabled={!isValid || isSubmitting}
                  >
                    {isSubmitting ? "Signing in..." : "Sign in"}
                  </button>

                  <div className="d-flex justify-content-between align-items-center mt-1">
                    <span className="text-secondary small">
                      New here?{" "}
                      <NavLink to="/register" className="login-link">
                        Create an account!
                      </NavLink>
                    </span>
                  </div>
                </form>
              </div>
            </div>

            <p className="text-center text-secondary small mt-3 mb-0">
              © {new Date().getFullYear()} Learnify
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
