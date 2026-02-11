import { useEffect, useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useCourses } from "../contexts/CoursesContext";
import { getMyEnrollments } from "../api/enrollmentsApi";
import { NavLink } from "react-router-dom";

export default function MyCourses() {
    const { user } = useAuth();
    const { courses, fetchCourses, isLoading: coursesLoading } = useCourses();

    const [enrollments, setEnrollments] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState("");

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

    if (isLoading || coursesLoading) {
        return <p>Loading your courses...</p>;
    }

    if (error) {
        return <p style={{ color: "red" }}>{error}</p>;
    }

    if (enrollments.length === 0) {
        return (
            <div>
                <h1>My Courses</h1>
                <p>You are not enrolled in any courses yet.</p>
                <NavLink to="/courses">Browse courses</NavLink>
            </div>
        );
    }

    const enrolledCourses = enrollments
        .map((e) => courses.find((c) => c.id === e.courseId))
        .filter(Boolean);

    return (
        <div>
            <h1>My Courses</h1>

            <ul>
                {enrolledCourses.map((course) => (
                    <li key={course.id}>
                        <strong>{course.title}</strong>{" "}
                        <span style={{ color: "#666" }}>({course.level})</span>
                        <div>
                            <NavLink to={`/courses/${course.id}/learn`}>Go to course</NavLink>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}
