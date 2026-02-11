import { useMemo, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "./Login.css";
import { useAuth } from "../contexts/AuthContext";
import { registerRequest } from "../api/auth";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function Register() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [touched, setTouched] = useState({
    firstName: false,
    lastName: false,
    email: false,
    password: false,
  });
  const [formError, setFormError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const fieldErrors = useMemo(() => {
    const errors = {};
    const firstTrim = firstName.trim();
    const lastTrim = lastName.trim();
    const emailTrim = email.trim();

    if (!firstTrim) errors.firstName = "First name is required.";
    if (!lastTrim) errors.lastName = "Last name is required.";

    if (!emailTrim) errors.email = "Email is required.";
    else if (!emailRegex.test(emailTrim)) errors.email = "Please enter a valid email.";

    if (!password) errors.password = "Password is required.";
    else if (password.length < 6) errors.password = "Password must be at least 6 characters.";

    return errors;
  }, [firstName, lastName, email, password]);

  const isValid = Object.keys(fieldErrors).length === 0;

  const showFirstNameError = touched.firstName && fieldErrors.firstName;
  const showLastNameError = touched.lastName && fieldErrors.lastName;
  const showEmailError = touched.email && fieldErrors.email;
  const showPasswordError = touched.password && fieldErrors.password;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError("");
    setTouched({
      firstName: true,
      lastName: true,
      email: true,
      password: true,
    });

    if (!isValid) return;

    try {
      setIsSubmitting(true);

      const data = await registerRequest(
        firstName.trim(),
        lastName.trim(),
        email.trim(),
        password
      );

      await login(data.token, data.user);

      navigate("/my-courses");
    } catch (err) {
      if (err?.status === 409) {
        setFormError("This email is already registered.");
      } else {
        setFormError(err?.message || "Something went wrong. Please try again.");
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
                  <h1 className="h4 mb-0 fw-bold text-dark">Create account</h1>
                </div>

                <p className="text-secondary mb-4">
                  Join Learnify and start learning new skills today.
                </p>

                {formError ? (
                  <div className="alert alert-danger py-2" role="alert">
                    {formError}
                  </div>
                ) : null}

                <form className="d-grid gap-3" onSubmit={handleSubmit} noValidate>
                  <div className="row g-2">
                    <div className="col-12 col-md-6">
                      <label htmlFor="firstName" className="form-label mb-1">
                        First name
                      </label>
                      <input
                        id="firstName"
                        type="text"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        onBlur={() =>
                          setTouched((t) => ({ ...t, firstName: true }))
                        }
                        className={`form-control login-input ${
                          showFirstNameError ? "is-invalid" : ""
                        }`}
                        placeholder="John"
                        autoComplete="given-name"
                      />
                      {showFirstNameError ? (
                        <div className="invalid-feedback">
                          {fieldErrors.firstName}
                        </div>
                      ) : null}
                    </div>

                    <div className="col-12 col-md-6">
                      <label htmlFor="lastName" className="form-label mb-1">
                        Last name
                      </label>
                      <input
                        id="lastName"
                        type="text"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        onBlur={() =>
                          setTouched((t) => ({ ...t, lastName: true }))
                        }
                        className={`form-control login-input ${
                          showLastNameError ? "is-invalid" : ""
                        }`}
                        placeholder="Doe"
                        autoComplete="family-name"
                      />
                      {showLastNameError ? (
                        <div className="invalid-feedback">
                          {fieldErrors.lastName}
                        </div>
                      ) : null}
                    </div>
                  </div>

                  <div>
                    <label htmlFor="email" className="form-label mb-1">
                      Email
                    </label>
                    <input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      onBlur={() =>
                        setTouched((t) => ({ ...t, email: true }))
                      }
                      className={`form-control login-input ${
                        showEmailError ? "is-invalid" : ""
                      }`}
                      placeholder="name@email.com"
                      autoComplete="email"
                    />
                    {showEmailError ? (
                      <div className="invalid-feedback">
                        {fieldErrors.email}
                      </div>
                    ) : null}
                  </div>

                  <div>
                    <label htmlFor="password" className="form-label mb-1">
                      Password
                    </label>
                    <input
                      id="password"
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      onBlur={() =>
                        setTouched((t) => ({ ...t, password: true }))
                      }
                      className={`form-control login-input ${
                        showPasswordError ? "is-invalid" : ""
                      }`}
                      placeholder="At least 6 characters"
                      autoComplete="new-password"
                    />
                    {showPasswordError ? (
                      <div className="invalid-feedback">
                        {fieldErrors.password}
                      </div>
                    ) : null}
                  </div>

                  <button
                    type="submit"
                    className="btn login-btn"
                    disabled={!isValid || isSubmitting}
                  >
                    {isSubmitting ? "Creating account..." : "Create account"}
                  </button>

                  <div className="d-flex justify-content-between align-items-center mt-1">
                    <span className="text-secondary small">
                      Already have an account?{" "}
                      <NavLink to="/login" className="login-link">
                        Sign in
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