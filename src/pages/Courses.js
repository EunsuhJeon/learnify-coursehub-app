import { useEffect, useMemo } from "react";
import { NavLink } from "react-router-dom";
import { useCourses } from "../contexts/CoursesContext";
import "./Login.css";

export default function Courses() {
  const {
    filteredCourses,
    isLoading,
    error,
    fetchCourses,
    searchQuery,
    setSearchQuery,
    levelFilter,
    setLevelFilter,
    themeFilter,
    setThemeFilter,
    courses,
  } = useCourses();

  useEffect(() => {
    fetchCourses();
  }, [fetchCourses]);

  const themeOptions = useMemo(() => {
    const set = new Set();
    (courses || []).forEach((c) => {
      if (c?.theme) set.add(c.theme);
    });
    return Array.from(set).sort();
  }, [courses]);

  const clearFilters = () => {
    setSearchQuery("");
    setLevelFilter("");
    setThemeFilter("");
  };

  return (
    <div className="courses-page">
      <section className="courses-hero">
        <div className="container py-4 py-md-5">
          <div className="row align-items-center g-4">
            <div className="col-lg-7">
              <h1 className="display-6 fw-semibold text-white mb-2">
                Unlock your next skill.
              </h1>
              <p className="text-white-50 mb-0">
                Find courses that match your goals and experience.
              </p>
            </div>

            <div className="col-lg-5">
              <div className="card shadow-sm border-0 rounded-4 courses-filter-card">
                <div className="card-body p-3 p-md-4">
                  <div className="d-flex align-items-center justify-content-between mb-2">
                    <h2 className="h6 fw-semibold mb-0">Search & filters</h2>
                  </div>

                  <div className="row g-2">
                    <div className="col-12">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Search courses..."
                        value={searchQuery || ""}
                        onChange={(e) => setSearchQuery(e.target.value)}
                      />
                    </div>

                    <div className="col-12 col-md-4">
                      <select
                        className="form-select"
                        value={levelFilter || ""}
                        onChange={(e) => setLevelFilter(e.target.value)}
                      >
                        <option value="">All levels</option>
                        <option value="Beginner">Beginner</option>
                        <option value="Intermediate">Intermediate</option>
                        <option value="Advanced">Advanced</option>
                      </select>
                    </div>

                    <div className="col-12 col-md-4">
                      <select
                        className="form-select"
                        value={themeFilter || ""}
                        onChange={(e) => setThemeFilter(e.target.value)}
                      >
                        <option value="">All themes</option>
                        {themeOptions.map((t) => (
                          <option key={t} value={t}>
                            {t}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="col-12 col-md-4">
                      <button
                        type="button"
                        className="btn btn-light border w-100"
                        onClick={clearFilters}
                      >
                        Clear
                      </button>
                    </div>
                  </div>

                  <div className="d-flex justify-content-between mt-3 text-secondary small">
                    <span>
                      Showing <strong>{filteredCourses?.length ?? 0}</strong> courses
                    </span>
                    <span>Updated today</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="container py-4 py-md-5">
        {isLoading ? (
          <div className="d-flex align-items-center gap-2 text-secondary">
            <div className="spinner-border spinner-border-sm" role="status" />
            <span>Loading courses...</span>
          </div>
        ) : null}

        {!isLoading && error ? (
          <div className="alert alert-danger" role="alert">
            {error}
          </div>
        ) : null}

        {!isLoading && !error && filteredCourses?.length === 0 ? (
          <div className="text-center py-5">
            <h2 className="h5 fw-semibold mb-2">No courses found</h2>
            <p className="text-secondary mb-3">
              Try a different keyword or adjust your filters.
            </p>
            <button type="button" className="btn btn-dark" onClick={clearFilters}>
              Reset filters
            </button>
          </div>
        ) : null}

        {!isLoading && !error && filteredCourses?.length > 0 ? (
          <div className="row g-3">
            {filteredCourses.map((course) => {
              const title = course?.title ?? "Untitled course";
              const desc =
                course?.description ??
                course?.summary ??
                "Learn new skills with practical lessons and hands-on examples.";
              const level = course?.level ?? "All levels";
              const theme = course?.theme ?? "General";

              return (
                <div key={course.id} className="col-12 col-md-6 col-lg-4">
                  <div className="card h-100 shadow-sm border-0 rounded-4 course-card">
                    <div className="course-thumb rounded-top-4" />

                    <div className="card-body p-3 p-md-4 d-flex flex-column">
                      <div className="d-flex align-items-start justify-content-between gap-2 mb-2">
                        <h3 className="h6 fw-semibold mb-0 course-title">{title}</h3>

                        <div className="d-flex gap-2 flex-wrap justify-content-end">
                          <span className="badge text-bg-light border">{theme}</span>
                          <span className="badge course-badge">{level}</span>
                        </div>
                      </div>

                      <p className="text-secondary small mb-3 course-desc">{desc}</p>

                      <div className="mt-auto d-flex align-items-center justify-content-between">
                        <span className="text-secondary small">
                          {course?.duration ? `${course.duration}` : "Self-paced"}
                        </span>

                        <NavLink
                          to={`/courses/${course.id}`}
                          className="btn btn-outline-secondary btn-sm"
                        >
                          View details
                        </NavLink>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : null}
      </section>
    </div>
  );
}
