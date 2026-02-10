import { useEffect, useMemo } from "react";
import { NavLink } from "react-router-dom";
import { useCourses } from "../contexts/CoursesContext";
import "./Home.css";
import bannerMain from "../assets/banner-main.png";
import bannerMainMobile from "../assets/banner-main-mobile.png";
import { getThemeImage } from "../utils/courseImages";


const ALLOWED_THEMES = ["Tech", "Marketing", "Data", "Business", "Design", "Product"];

function groupByTheme(courses = []) {
  const groups = new Map();
  courses.forEach((c) => {
    const theme = c?.theme || "General";
    if (!ALLOWED_THEMES.includes(theme)) return;
    if (!groups.has(theme)) groups.set(theme, []);
    groups.get(theme).push(c);
  });

  return ALLOWED_THEMES.map((t) => [t, groups.get(t) || []]).filter(
    ([, list]) => list.length > 0
  );
}

function chunk(arr, size) {
  const out = [];
  for (let i = 0; i < arr.length; i += size) out.push(arr.slice(i, i + size));
  return out;
}

export default function Home() {
  const { courses, isLoading, error, fetchCourses } = useCourses();

  useEffect(() => {
    fetchCourses();
  }, [fetchCourses]);

  const themeGroups = useMemo(() => groupByTheme(courses), [courses]);

  if (isLoading) {
    return (
      <div className="container py-4 py-md-5">
        <div className="d-flex align-items-center gap-2 text-secondary">
          <div className="spinner-border spinner-border-sm" role="status" />
          <span>Loading courses...</span>
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
      </div>
    );
  }

  return (
    <div className="home-page">
      {/* Hero */}
      <section className="home-hero">
        <div className="container-fluid px-0">
        {/* Desktop Banner */}
        <img
        src={bannerMain}
        alt="Courses Banner"
        className="w-100 d-none d-md-block"
        style={{ maxHeight: "420px", objectFit: "cover" }}
        />

        {/* Mobile Banner */}
        <img
        src={bannerMainMobile}
        alt="Courses Banner"
        className="w-100 d-block d-md-none"
        style={{ maxHeight: "420px", objectFit: "cover" }}
        />
        </div>
      </section>

      {/* Theme sections */}
      <section className="container py-4 py-md-5">
        {themeGroups.length === 0 ? (
          <div className="text-center py-5">
            <h2 className="h5 fw-semibold mb-2">No featured courses yet</h2>
            <p className="text-secondary mb-0">
              Add courses with theme Tech, Marketing, Data, or Business.
            </p>
          </div>
        ) : (
          <div className="d-grid gap-4">
            {themeGroups.map(([theme, list]) => (
              <ThemeSection key={theme} theme={theme} courses={list} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

function ThemeSection({ theme, courses }) {
  const carouselId = `carousel-${theme.toLowerCase().replace(/\s+/g, "-")}`;

  // Desktop: group cards into "slides"
  // 3 cards per slide works well with col-lg-4
  const slides = useMemo(() => chunk(courses, 3), [courses]);

  return (
    <div className="theme-section">
      <div className="d-flex align-items-end justify-content-between mb-2">
        <div>
          <h2 className="h5 fw-semibold mb-0">{theme}</h2>
          <div className="text-secondary small">{courses.length} courses</div>
        </div>

        <NavLink to={`/courses?theme=${encodeURIComponent(theme)}`} className="btn btn-light border btn-sm">
          View all
        </NavLink>
      </div>

      {/* MOBILE: touch scroll rail */}
      <div className="d-lg-none">
        <div className="home-rail" role="region" aria-label={`${theme} courses`}>
          {courses.map((c) => (
            <CourseMiniCard key={c.id} course={c} />
          ))}
        </div>
      </div>

      {/* DESKTOP: Bootstrap Carousel (dark variant) */}
      <div className="d-none d-lg-block">
        <div
          id={carouselId}
          className="carousel carousel-dark slide home-carousel"
          data-bs-ride="false"
          data-bs-touch="false"
          aria-label={`${theme} carousel`}
        >
          <div className="carousel-inner">
            {slides.map((group, idx) => (
              <div
                key={`${theme}-slide-${idx}`}
                className={`carousel-item ${idx === 0 ? "active" : ""}`}
              >
                <div className="row g-3">
                  {group.map((c) => (
                    <div key={c.id} className="col-lg-4">
                      <CourseMiniCard course={c} />
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Controls (Bootstrap default arrows, dark variant styles) */}
          {slides.length > 1 ? (
            <>
              <button
                className="carousel-control-prev"
                type="button"
                data-bs-target={`#${carouselId}`}
                data-bs-slide="prev"
                aria-label={`Previous ${theme} slide`}
              >
                <span className="carousel-control-prev-icon" aria-hidden="true" />
              </button>

              <button
                className="carousel-control-next"
                type="button"
                data-bs-target={`#${carouselId}`}
                data-bs-slide="next"
                aria-label={`Next ${theme} slide`}
              >
                <span className="carousel-control-next-icon" aria-hidden="true" />
              </button>
            </>
          ) : null}
        </div>
      </div>
    </div>
  );
}

function CourseMiniCard({ course }) {
  const title = course?.title ?? "Untitled course";
  const desc =
    course?.description ??
    "Learn new skills with practical lessons and hands-on examples.";
  const level = course?.level ?? "All levels";
  const duration = course?.duration ?? "Self-paced";

  return (
    <div className="card home-card shadow-sm border-0 rounded-4 h-100">
      <img
        src={getThemeImage(course?.theme)}
        alt={`${course?.theme || "Course"} thumbnail`}
        className="home-thumb-img rounded-top-4"
      />
      <div className="card-body p-3 d-flex flex-column">
        <div className="d-flex justify-content-between align-items-start gap-2 mb-2">
          <h3 className="h6 fw-semibold mb-0 home-title">{title}</h3>
          <span className="badge text-bg-light border">{level}</span>
        </div>

        <p className="text-secondary small mb-3 home-desc">{desc}</p>

        <div className="mt-auto d-flex justify-content-between align-items-center">
          <span className="text-secondary small">{duration}</span>
          <NavLink
            to={`/courses/${course.id}`}
            className="btn btn-outline-secondary btn-sm"
          >
            Details
          </NavLink>
        </div>
      </div>
    </div>
  );
}
