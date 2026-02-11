import { useParams, useNavigate } from "react-router-dom";
import { useCourses } from "../contexts/CoursesContext";
import { useAuth } from "../contexts/AuthContext";
import { getThemeImage } from "../utils/courseImages";
import { useEffect, useState } from "react";

export default function CoursePlayer() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isAuthenticated, user } = useAuth();
  const { getCourseById, isLoading, error, fetchCourses } = useCourses();

  useEffect(() => {
    fetchCourses();
  }, [fetchCourses]);

  const course = getCourseById(id);

  const [reviews, setReviews] = useState([]);
  useEffect(() => {
    if (course?.reviews) {
      setReviews(course.reviews);
    }
  }, [course]);
  
  const [newReviewText, setNewReviewText] = useState("");
  const [newReviewRating, setNewReviewRating] = useState(5);
  const [submittingReview, setSubmittingReview] = useState(false);
  const [reviewError, setReviewError] = useState("");

  if (isLoading && !course) {
    return (
      <div className="course-player-page min-vh-100 bg-light">
        <div className="container py-4 py-md-5">
          <p>Loading...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="course-player-page min-vh-100 bg-light">
        <div className="container py-4 py-md-5">
          <p style={{ color: "red" }}>{error}</p>
          <button
            type="button"
            className="btn btn-outline-secondary btn-sm mt-2"
            onClick={() => navigate(-1)}
          >
            Go back
          </button>
        </div>
      </div>
    );
  }

  if (!course) {
    return (
      <div className="course-player-page min-vh-100 bg-light">
        <div className="container py-4 py-md-5">
          <h1>Course not found</h1>
          <p>This course does not exist or has been removed.</p>
          <button
            type="button"
            className="btn btn-outline-secondary btn-sm mt-2"
            onClick={() => navigate("/courses")}
          >
            Back to courses
          </button>
        </div>
      </div>
    );
  }

  const themeImage = getThemeImage(course.theme);
  const instructor = course.instructor || {};
  const priceDisplay =
    course.price === "Free" || course.price == null ? "Free" : `$${course.price}`;

  const handleAddReview = (e) => {
    e.preventDefault();
    setReviewError("");

    if (!isAuthenticated || !user) {
      navigate("/login");
      return;
    }

    const text = newReviewText.trim();
    if (!text) {
      setReviewError("Please write a short review.");
      return;
    }

    const ratingValue = Number(newReviewRating);
    if (!ratingValue || ratingValue < 1 || ratingValue > 5) {
      setReviewError("Please select a rating between 1 and 5.");
      return;
    }

    setSubmittingReview(true);

    const newItem = {
      authorName: user.email,
      date: new Date().toLocaleDateString(),
      rating: ratingValue,
      text,
    };

    setReviews((prev) => [newItem, ...prev]);
    setNewReviewText("");
    setSubmittingReview(false);
  };

  return (
    <div className="course-player-page min-vh-100 bg-light">
      <section className="bg-dark text-white">
        <div className="container py-3 py-md-4">
          <div className="ratio ratio-16x9 rounded-3 overflow-hidden position-relative">
            {course.previewVideoUrl ? (
              <video
                src={course.previewVideoUrl}
                controls
                className="w-100 h-100"
                poster={themeImage}
              />
            ) : (
              <img
                src={themeImage}
                alt={course.title}
                className="w-100 h-100 object-fit-cover"
              />
            )}
            <div
              className="position-absolute top-50 start-50 translate-middle rounded-circle d-flex align-items-center justify-content-center"
              style={{
                width: 64,
                height: 64,
                backgroundColor: "rgba(0,0,0,0.5)",
                pointerEvents: "none",
              }}
            >
              <div
                style={{
                  width: 0,
                  height: 0,
                  borderLeft: "16px solid #fff",
                  borderTop: "10px solid transparent",
                  borderBottom: "10px solid transparent",
                  marginLeft: 4,
                }}
              />
            </div>
          </div>
        </div>
      </section>

      <div className="container py-4 py-md-5">
        <section className="mb-4">
          <h1 className="h4 fw-semibold mb-2">{course.title}</h1>

          {course.instructorName || instructor.name ? (
            <p className="small text-secondary mb-1">
              Instructor{" "}
              <strong>{course.instructorName || instructor.name}</strong>
            </p>
          ) : null}

          <div className="d-flex flex-wrap gap-2 small text-secondary mb-2">
            {course.level && <span>Level: {course.level}</span>}
            {course.duration && <span>· {course.duration}</span>}
            {course.theme && <span>· {course.theme}</span>}
            <span>· Price: <strong>{priceDisplay}</strong></span>
          </div>

          {course.rating != null && (
            <p className="small text-secondary mb-0">
              ★ {course.rating}{" "}
              {course.reviewCount != null && (
                <span className="text-muted">
                  ({course.reviewCount.toLocaleString()} reviews)
                </span>
              )}
            </p>
          )}
        </section>

        <section className="mb-4">
          <h2 className="h6 fw-semibold mb-2">About this course</h2>
          <p className="text-secondary mb-0">
            {course.aboutCourse || course.description}
          </p>
        </section>

        <section className="mb-4">
          <div className="d-flex align-items-center justify-content-between mb-2">
            <h2 className="h6 fw-semibold mb-0">Reviews</h2>
          </div>

          {isAuthenticated && user ? (
            <form className="mb-3" onSubmit={handleAddReview}>
              <div className="d-flex align-items-center gap-2 mb-2">
                <span className="small text-secondary">Rating:</span>
                <div className="d-flex align-items-center gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setNewReviewRating(star)}
                      className="btn btn-link p-0 border-0"
                      style={{ textDecoration: "none" }}
                      aria-label={`${star} star${star > 1 ? "s" : ""}`}
                    >
                      <span
                        className={
                          star <= Number(newReviewRating)
                            ? "text-warning"
                            : "text-secondary"
                        }
                        style={{ fontSize: 18 }}
                      >
                        ★
                      </span>
                    </button>
                  ))}
                </div>
              </div>
              <textarea
                id="reviewText"
                className="form-control"
                value={newReviewText}
                onChange={(e) => setNewReviewText(e.target.value)}
                rows={3}
                placeholder="Write a review..."
              />
              {reviewError && (
                <div className="text-danger small mt-1">{reviewError}</div>
              )}

              <button
                type="submit"
                className="btn login-btn btn-sm mt-2"
                disabled={submittingReview}
              >
                {submittingReview ? "Submitting..." : "Post review"}
              </button>
            </form>
          ) : (
            <p className="small text-secondary mb-3">
              Please log in to write a review.
            </p>
          )}

          {reviews.length === 0 ? (
            <p className="text-secondary small mb-0">
              No reviews yet. Be the first to review this course.
            </p>
          ) : (
            <div className="d-flex flex-column gap-3">
              {reviews.map((r, idx) => (
                <div key={idx} className="border rounded-3 p-3 bg-white">
                  <div className="d-flex justify-content-between align-items-center mb-1">
                    <strong className="small">{r.authorName}</strong>
                    {r.date && (
                      <span className="small text-secondary">{r.date}</span>
                    )}
                  </div>
                  {r.rating != null && (
                    <div className="small text-warning mb-1">
                      {"★".repeat(r.rating)}
                    </div>
                  )}
                  {r.text && (
                    <p className="small text-secondary mb-0">{r.text}</p>
                  )}
                </div>
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}