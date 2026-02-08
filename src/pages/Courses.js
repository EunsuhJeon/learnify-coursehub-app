import { useEffect } from "react";
import { useCourses } from "../contexts/CoursesContext";

export default function Courses() {
    const {
        filteredCourses,
        isLoading,
        error,
        fetchCourses,
        searchQuery,
        setSearchQuery,
        levelFilter,
        setLevelFilter
    } = useCourses();

    useEffect(() => {
        fetchCourses();
    }, [fetchCourses]);

    if (isLoading) {
        return <p>Loading courses...</p>;
    }

    if (error) {
        return <p style={{ color: "red" }}>{error}</p>;
    }

    return (
        <div className="courses-page">
            <h1>Courses</h1>

            <div className="courses-filters" style={{ marginBottom: '1rem' }}>
                <input
                    type="text"
                    placeholder="Search by title or description..."
                    value={searchQuery || ""}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="form-control"
                    style={{ marginRight: '0.5rem' }}
                />

                <select
                    value={levelFilter || ""}
                    onChange={(e) => setLevelFilter(e.target.value)}
                    className="form-select"
                >
                    <option value="">All levels</option>
                    <option value="Beginner">Beginner</option>
                    <option value="Advanced">Advanced</option>
                </select>
            </div>

            {filteredCourses.length === 0 ? (
                <p>No courses match your filters.</p>
            ) : (
                <ul className="courses-list">
                    {filteredCourses.map((course) => (
                        <li key={course.id}>
                            <strong>{course.title}</strong> — {course.level}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}