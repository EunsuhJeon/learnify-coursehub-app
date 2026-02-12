import { useEffect, useMemo, useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useCourses } from "../contexts/CoursesContext";
import { getMyEnrollments } from "../api/enrollmentsApi";
import { NavLink, useNavigate } from "react-router-dom";
import "./MyCourses.css";
import ProfilePanel from "../components/ProfilePanel";
import { getThemeImage } from "../utils/courseImages";




function clamp(n, min, max) {
  return Math.max(min, Math.min(max, n));
}

// Progress mock (waiting for dev 3)
function progressForCourse(courseId) {
  const base = (Number(courseId) * 17) % 100;
  return clamp(base < 12 ? base + 18 : base, 5, 98);
}

export default function MyCourses() {
  const { user, logout } = useAuth();
  const { courses, fetchCourses, isLoading: coursesLoading } = useCourses();


  const [enrollments, setEnrollments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  const [activeTab, setActiveTab] = useState("courses");
  const navigate = useNavigate();

  function handleLogout() {
    logout();
    navigate("/login");
  }


  useEffect(() => {
    async function loadMyCourses() {
      try {
        // Make sure that courses are loaded
        await fetchCourses();

        const data = await getMyEnrollments(user.id);
        setEnrollments(data);
      } catch (err) {
        setError(err.message || "Failed to load enrolled courses");
      } finally {
        setIsLoading(false);
      }
    }

    loadMyCourses();
  }, [fetchCourses, user.id]);

  const enrolledCourses = useMemo(() => {
    const result = [];

    enrollments.forEach((e) => {
      const match = courses.find((c) => c.id === e.courseId);
      if (match) {
        result.push(match);
      }
    });

    return result;
  }, [enrollments, courses]);



  const displayName =
    user?.name ||
    (user?.email ? user.email.split("@")[0] : null) ||
    "there";



  // Loading state (Bootstrap)
  if (isLoading || coursesLoading) {
    return (
      <div className="container py-4 py-md-5">
        <div className="d-flex align-items-center gap-2 text-secondary">
          <div className="spinner-border spinner-border-sm" role="status" aria-label="Loading" />
          <span>Loading your courses...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container py-4 py-md-5">
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
        <NavLink to="/courses" className="btn btn-outline-secondary btn-sm">
          Back to courses
        </NavLink>
      </div>
    );
  }

  return (
    <div className="myc-page bg-light min-vh-100">
      <div className="container py-4 py-md-5">
        <div className="row g-4">
          {/* Sidebar */}
          <aside className="col-12 col-lg-3">
            <div className="card border-0 shadow-sm rounded-4 myc-sidebar">
              <div className="card-body p-3 p-md-4">
                <div className="d-flex align-items-center gap-3 mb-3">
                  <div className="myc-avatar" aria-hidden="true">
                    {String(displayName).slice(0, 1).toUpperCase()}
                  </div>
                  <div className="min-w-0">
                    <div className="fw-semibold text-truncate">{displayName}</div>
                    <div className="text-secondary small text-truncate">
                      {user?.email || "Signed in"}
                    </div>
                  </div>
                </div>

                {/* Tabs per cronograma: Profile / Courses */}
                <nav className="nav nav-pills flex-column gap-2" aria-label="My Courses navigation">
                  <button
                    type="button"
                    className={`nav-link text-start ${activeTab === "courses" ? "active" : "text-secondary"
                      }`}
                    onClick={() => setActiveTab("courses")}
                  >
                    My Courses
                  </button>

                  <button
                    type="button"
                    className={`nav-link text-start ${activeTab === "profile" ? "active" : "text-secondary"
                      }`}
                    onClick={() => setActiveTab("profile")}
                  >
                    Profile
                  </button>
                </nav>

                <hr className="my-4" />

                <div className="d-grid gap-2">
                  <button
                    type="button"
                    className="btn btn-outline-secondary"
                    onClick={handleLogout}>
                    Logout
                  </button>

                </div>
              </div>
            </div>
          </aside>

          {/* Main */}
          <section className="col-12 col-lg-9">
            {/* Greeting */}
            <div className="d-flex flex-wrap align-items-end justify-content-between gap-2 mb-3">
              <div>
                <h1 className="h3 fw-semibold mb-1">Hi, {displayName}</h1>
              </div>
            </div>

            <div className="card border-0 shadow-sm rounded-4">
              <div className="card-body p-3 p-md-4">
                {activeTab === "profile" ? (
                  <ProfilePanel />
                ) : (

                  <>
                    <div className="d-flex align-items-center justify-content-between mb-2">
                      <h2 className="h5 fw-semibold mb-0">My Courses</h2>
                    </div>


                    {enrollments.length === 0 ? (
                      <div className="d-flex flex-column align-items-center justify-content-center py-5" style={{ minHeight: "350px" }}>

                        <h2 className="h5 fw-semibold mb-3">
                          You haven't enrolled in any courses yet
                        </h2>

                        <NavLink
                          to="/courses"
                          className="btn btn-learnify-enroll rounded-pill px-4"
                        >
                          Enroll now!
                        </NavLink>

                      </div>
                    ) : (

                      <>
                        <div className="myc-rail" role="region" aria-label="Enrolled courses">
                          {enrolledCourses.map((course) => {
                            const progress = progressForCourse(course.id);

                            return (
                              <div
                                key={course.id}
                                className="card myc-course-card border-0 shadow-sm rounded-4"
                              >
                                {/* Thumb img */}
                                <img
                                  src={getThemeImage(course?.theme ?? "General")}
                                  alt={`${course?.theme ?? "General"} course`}
                                  className="myc-thumb-img rounded-top-4"
                                  loading="lazy"
                                />

                                <div className="card-body p-3 d-flex flex-column">
                                  <div className="d-flex justify-content-between align-items-start gap-2 mb-2">
                                    <div className="min-w-0">
                                      <div className="fw-semibold text-truncate">
                                        {course.title}
                                      </div>
                                      <div className="text-secondary small">
                                        {(course.theme || "General") + " • " + (course.level || "All levels")}
                                      </div>
                                    </div>

                                    <span className="badge text-bg-light border">
                                      {course.duration || "Self-paced"}
                                    </span>
                                  </div>

                                  {/* Progress */}
                                  <div className="mb-2">
                                    <div className="d-flex justify-content-between small text-secondary mb-1">
                                      <span>Progress</span>
                                      <span>{progress}%</span>
                                    </div>
                                    <div className="progress" style={{ height: 8 }}>
                                      <div
                                        className="progress-bar"
                                        role="progressbar"
                                        style={{ width: `${progress}%` }}
                                        aria-valuenow={progress}
                                        aria-valuemin="0"
                                        aria-valuemax="100"
                                      />
                                    </div>
                                  </div>

                                  <div className="mt-auto d-flex gap-2">
                                    <NavLink
                                      to={`/courses/${course.id}`}
                                      className="btn btn-outline-secondary btn-sm flex-grow-1"
                                    >
                                      Course Details
                                    </NavLink>

                                    <NavLink
                                      to={`/courses/${course.id}/learn`}
                                      className="btn btn-dark btn-sm flex-grow-1"
                                    >
                                      Continue
                                    </NavLink>
                                  </div>
                                </div>
                              </div>
                            );
                          })}
                        </div>

                        {/* Link extra pro catálogo */}
                        <div className="d-flex justify-content-end mt-3">
                          <NavLink to="/courses" className="btn btn-light border">
                            Find more courses
                          </NavLink>
                        </div>
                      </>
                    )}
                  </>
                )}
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
