import { useEffect, useState } from "react";
import getCourses from "../api/coursesApi";

export default function Courses() {
    const [courses, setCourses] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        async function loadCourses() {
            try {
                const data = await getCourses();
                setCourses(data);
            } catch (err) {
                setError(err.message || "Error loading courses");
            } finally {
                setIsLoading(false);
            }
        }

        loadCourses();
    }, []);

    if (isLoading) {
        return <p>Loading courses...</p>;
    }

    if (error) {
        return <p style={{ color: "red" }}>{error}</p>;
    }

    if (courses.length === 0) {
        return <p>No courses available.</p>;
    }

    return (
        // Isabella, i think you'll have tu change this:
        <div>
            <h1>Courses</h1>

            <ul>
                {courses.map((course) => (
                    <li key={course.id}>
                        <strong>{course.title}</strong> — {course.level}
                    </li>
                ))}
            </ul>
        </div>
    );
}
