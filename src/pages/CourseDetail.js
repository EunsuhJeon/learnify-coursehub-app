import { useParams, useNavigate, Link } from "react-router-dom";
import { useCourses } from "../contexts/CoursesContext";
import { getThemeImage } from "../utils/courseImages";

import { useAuth } from "../contexts/AuthContext";
import { useState } from "react";
import { useEffect } from "react";
import { isUserEnrolled } from "../api/enrollmentsApi";
import { useCart } from "../contexts/CartContext";
//import previewThumb from "../assets/previews/course-thumb.jpg";
import previewThumb from "../assets/previews/course-thumb.jpg"
//import previewGif from "../assets/previews/course-preview.gif";
import previewGif from "../assets/previews/course-preview.gif"


export default function CourseDetail() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { user, isAuthenticated } = useAuth();
    // const [enrollError, setEnrollError] = useState("");
    const [enrolling, setEnrolling] = useState(false);
    const { getCourseById, isLoading, error, fetchCourses } = useCourses();
    useEffect(() => {
        fetchCourses();
    }, [fetchCourses]);

    const course = getCourseById(id);
    const alreadyEnrolled = isAuthenticated && user ? isUserEnrolled(course?.id, user.id) : false;

    const [isHoverPreview, setIsHoverPreview] = useState(false);


    const { cart, addToCart } = useCart();
    const isInCart = cart.some((c) => c.id === course.id);

    

    if (isLoading) {
        return (
            <div className="course-detail-page">
                <p>Loading...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="course-detail-page">
                <p style={{ color: "red" }}>{error}</p>
                <button type="button" onClick={() => navigate(-1)}>
                    Go back
                </button>
            </div>
        );
    }

    if (!course) {
        return (
            <div className="course-detail-page">
                <h1>Course not found</h1>
                <p>This course does not exist or has been removed.</p>
                <Link to="/courses">Back to list</Link>
            </div>
        );
    }

    const REVIEWS_STORAGE_KEY = "learnify_course_reviews";

    function getStoredReviews(courseId) {
        try {
          const raw = localStorage.getItem(REVIEWS_STORAGE_KEY);
          if (!raw) return [];
          const data = JSON.parse(raw);
          const list = data[String(courseId)];
          return Array.isArray(list) ? list : [];
        } catch {
          return [];
        }
    }
      
    const priceDisplay = course.price === "Free" || course.price == null ? "Free" : `$${course.price}`;
    const instructor = course.instructor || {};
    const fromCourse = Array.isArray(course?.reviews) ? course.reviews : [];
    const fromStorage = getStoredReviews(id);
    const reviews = [...fromCourse, ...fromStorage]  || [];
    const learningOutcomes = course.learningOutcomes || [];

    const handleEnroll = async () => {
        // setEnrollError("");

        if (!isAuthenticated) {
            navigate("/login");
            return;
        }
        setEnrolling(true);
        addToCart(course);
        navigate("/cart");
        setEnrolling(false);
        /*
        try {
            setEnrolling(true);
            await enrollInCourse(course.id, user.id);
            navigate("/my-courses");
        } catch (err) {
            setEnrollError(err.message || "Enrollment failed");
        } finally {
            setEnrolling(false);
        }
        */
    };


    return (
        <div className="course-detail-page min-vh-100 bg-light">
            <header className="course-detail-header bg-white border-bottom py-3">
                <div className="container">
                    <button
                        type="button"
                        className="btn btn-outline-secondary btn-sm"
                        onClick={() => navigate(-1)}
                        aria-label="Go back"
                    >
                        ← Back to courses
                    </button>
                </div>
            </header>

            <div className="container pb-5">
                {/* Hero */}
                <section
                    className="course-detail-hero text-white rounded-3 mt-3 p-4 p-md-5 mb-4"
                    style={{
                        backgroundImage: `linear-gradient(rgba(0,0,0,.55), rgba(0,0,0,.30)), url(${getThemeImage(course?.theme)})`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                    }}
                >
                    <h1 className="display-6 mb-3">{course.title}</h1>
                    {course.instructorName && (
                        <p className="mb-3 opacity-90">Taught by <strong>{course.instructorName}</strong></p>
                    )}
                    <div className="d-flex flex-wrap align-items-center gap-3 gap-md-4 mb-3">
                        {course.rating != null && (
                            <span className="d-flex align-items-center gap-1">
                                <span className="text-warning">★</span>
                                <strong>{course.rating}</strong>
                                {course.reviewCount != null && (
                                    <span className="opacity-75">({course.reviewCount?.toLocaleString?.() ?? course.reviewCount} reviews)</span>
                                )}
                            </span>
                        )}
                        {course.level && (
                            <span className="badge bg-white bg-opacity-25 text-white">{course.level}</span>
                        )}
                        {course.duration && (
                            <span>🕐 {course.duration}</span>
                        )}
                    </div>
                    {course.enrolledCount != null && (
                        <p className="small opacity-75 mb-4">{course.enrolledCount?.toLocaleString?.() ?? course.enrolledCount} students enrolled</p>
                    )}
                    <div className="d-flex flex-wrap gap-2">
                        {alreadyEnrolled ? (
                            <button
                                type="button"
                                className="btn btn-learnify-primary"
                                onClick={() => navigate(`/courses/${course.id}/learn`)}
                            >
                                Go to My Course
                            </button>
                        ) : (
                            <button
                                type="button"
                                className="btn btn-light"
                                onClick={handleEnroll}
                                disabled={enrolling}
                            >
                                {enrolling ? "Enrolling..." : "Enroll Now"}
                            </button>
                        )}
                        <button
                            type="button"
                            className="btn btn-outline-light"
                            disabled={isInCart || alreadyEnrolled}
                            onClick={() => addToCart(course)}
                        >
                            {alreadyEnrolled ? "Purchased" : isInCart ? "In Cart" : "Add to Cart"}
                        </button>


                    </div>
                </section>

                <main>
                    <div className="row g-4">
                        {/* Main column */}
                        <div className="col-lg-8">
                            {/* Course Overview */}
                            <section className="card shadow-sm border-0 rounded-3 mb-4">
                                <div className="card-body p-4">
                                    <h2 className="h5 fw-semibold mb-3">Course Overview</h2>
                                    <h3 className="h6 fw-semibold mb-2">About This Course</h3>
                                    <p className="text-secondary mb-4">{course.aboutCourse ?? course.description}</p>
                                    {learningOutcomes.length > 0 && (
                                        <>
                                            <h3 className="h6 fw-semibold mb-3">What You&apos;ll Learn</h3>
                                            <ul className="list-unstyled mb-0">
                                                {learningOutcomes.map((item, idx) => (
                                                    <li key={idx} className="d-flex align-items-start gap-2 mb-2">
                                                        <span className="text-learnify">✓</span>
                                                        <span className="text-secondary">{item}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </>
                                    )}
                                </div>
                            </section>

                            {/* Instructor */}
                            {(instructor.name || course.instructorName) && (
                                <section className="card shadow-sm border-0 rounded-3 mb-4">
                                    <div className="card-body p-4">
                                        <h2 className="h5 fw-semibold mb-3">Your Instructor</h2>
                                        <div className="d-flex flex-column flex-md-row gap-3">
                                            <div className="rounded-circle bg-light d-flex align-items-center justify-content-center flex-shrink-0" style={{ width: 80, height: 80 }} aria-hidden>
                                                <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="currentColor" className="text-secondary">
                                                    <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                                                </svg>
                                            </div>
                                            <div className="flex-grow-1">
                                                <h3 className="h6 fw-semibold mb-1">{instructor.name ?? course.instructorName}</h3>
                                                {instructor.title && <p className="text-secondary small mb-2">{instructor.title}</p>}
                                                <div className="d-flex flex-wrap gap-3 small text-secondary mb-2">
                                                    {instructor.studentsCount != null && <span>👥 {instructor.studentsCount?.toLocaleString?.()} students</span>}
                                                    {instructor.coursesCount != null && <span>📚 {instructor.coursesCount} courses</span>}
                                                    {instructor.instructorRating != null && <span>★ {instructor.instructorRating} rating</span>}
                                                </div>
                                                {instructor.bio && <p className="text-secondary small mb-0">{instructor.bio}</p>}
                                            </div>
                                        </div>
                                    </div>
                                </section>
                            )}

                            {/* Student Reviews */}
                            <section className="card shadow-sm border-0 rounded-3 mb-4">
                                <div className="card-body p-4">
                                    <h2 className="h5 fw-semibold mb-3">Student Reviews</h2>
                                    {course.rating != null && (
                                        <div className="row mb-4 pb-3 border-bottom">
                                            <div className="col-auto text-center">
                                                <div className="display-6 fw-bold">{course.rating}</div>
                                                <div className="text-warning">★</div>
                                                {course.reviewCount != null && (
                                                    <span className="small text-secondary">{course.reviewCount?.toLocaleString?.() ?? course.reviewCount} reviews</span>
                                                )}
                                            </div>
                                        </div>
                                    )}
                                    <div className="d-flex flex-column gap-4">
                                        {reviews.length > 0 ? (
                                            reviews.map((r, idx) => (
                                                <div key={idx} className="d-flex gap-3">
                                                    <div className="rounded-circle bg-light d-flex align-items-center justify-content-center flex-shrink-0" style={{ width: 48, height: 48 }} aria-hidden>
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className="text-secondary">
                                                            <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                                                        </svg>
                                                    </div>
                                                    <div className="flex-grow-1">
                                                        <div className="d-flex justify-content-between align-items-center mb-1">
                                                            <strong>{r.authorName}</strong>
                                                            {r.date && <span className="small text-secondary">{r.date}</span>}
                                                        </div>
                                                        {r.rating != null && <span className="text-warning small">{"★".repeat(r.rating)}</span>}
                                                        {r.text && <p className="text-secondary small mb-0 mt-1">{r.text}</p>}
                                                    </div>
                                                </div>
                                            ))
                                        ) : (
                                            <p className="text-secondary small mb-0">No reviews yet.</p>
                                        )}
                                    </div>
                                </div>
                            </section>
                        </div>

                        {/* Sidebar */}
                        <div className="col-lg-4">
                            <div className="card shadow-sm border-0 rounded-3 sticky-lg-top">
                                <div className="card-body p-4">
                                    <div
                                    className="ratio ratio-16x9 rounded-3 overflow-hidden position-relative mb-3"
                                    onMouseEnter={() => setIsHoverPreview(true)}
                                    onMouseLeave={() => setIsHoverPreview(false)}
                                    style={{ cursor: "pointer" }}
                                    >
                                    <img
                                        src={isHoverPreview ? previewGif : previewThumb}
                                        alt={`${course.title} preview`}
                                        className="w-100 h-100 object-fit-cover"
                                    />
                                    </div>

                                    <div className="mb-3">
                                        <span className="fs-4 fw-bold">{priceDisplay}</span>
                                        {course.priceNote && <p className="small text-secondary mb-0">{course.priceNote}</p>}
                                    </div>
                                    {alreadyEnrolled ? (
                                        <button
                                            type="button"
                                            className="btn btn-learnify-primary w-100 mb-2"
                                            onClick={() => navigate(`/courses/${course.id}/learn`)}
                                        >
                                            Go to My Course
                                        </button>
                                    ) : (
                                        <button
                                            type="button"
                                            className="btn btn-learnify-primary w-100 mb-2"
                                            onClick={handleEnroll}
                                            disabled={enrolling}
                                        >
                                            {enrolling ? "Enrolling..." : "Enroll Now"}
                                        </button>
                                    )}
                                    <button
                                        type="button"
                                        className="btn btn-outline-secondary w-100"
                                        disabled={isInCart || alreadyEnrolled}
                                        onClick={() => addToCart(course)}
                                    >
                                        {alreadyEnrolled ? "Purchased" : isInCart ? "In Cart" : "Add to Cart"}
                                    </button>
                                    <hr />
                                    <dl className="small mb-0">
                                        {course.level && (
                                            <>
                                                <dt className="text-secondary">Skill level</dt>
                                                <dd className="mb-2">{course.level}</dd>
                                            </>
                                        )}
                                        {course.duration && (
                                            <>
                                                <dt className="text-secondary">Duration</dt>
                                                <dd className="mb-2">{course.duration}</dd>
                                            </>
                                        )}
                                        {course.enrolledCount != null && (
                                            <>
                                                <dt className="text-secondary">Enrolled</dt>
                                                <dd className="mb-2">{course.enrolledCount?.toLocaleString?.() ?? course.enrolledCount}</dd>
                                            </>
                                        )}
                                        {course.language && (
                                            <>
                                                <dt className="text-secondary">Language</dt>
                                                <dd className="mb-2">{course.language}</dd>
                                            </>
                                        )}
                                        {course.certification != null && (
                                            <>
                                                <dt className="text-secondary">Certification</dt>
                                                <dd className="mb-0">{course.certification ? "Yes" : "No"}</dd>
                                            </>
                                        )}
                                    </dl>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}