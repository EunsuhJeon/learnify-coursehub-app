import { createContext, useState, useCallback, useMemo, useContext } from "react";
import getCourses from "../api/coursesApi";

const CoursesContext = createContext(null);

export function CoursesProvider({ children }) {
    const [courses, setCourses] = useState([]);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const [hasFetched, setHasFetched] = useState(false);

    const [searchQuery, setSearchQuery] = useState(null);
    const [levelFilter, setLevelFilter] = useState(null);
    const [themeFilter, setThemeFilter] = useState(null);

    const fetchCourses = useCallback(async (force = false) => {
        if (!force && hasFetched) {
            return;
        }
        setIsLoading(true);
        setError(null);

        try {
            const data = await getCourses();
            setCourses(data || []);
            setHasFetched(true);
        } catch (err) {
            setError(err?.message || "Error loading courses");
        } finally {
            setIsLoading(false);
        }
    }, [hasFetched]);

    const filteredCourses = useMemo(() => {
        let list = [...courses];

        if (searchQuery) {
            const q = searchQuery.trim().toLowerCase();
            list = list.filter((c) => {
                const title = c.title?.toLowerCase() || "";
                const desc = c.description?.toLowerCase() || "";
                const theme = c.theme?.toLowerCase() || "";
                return title.includes(q) || desc.includes(q) || theme.includes(q);
            });
        }

        if (levelFilter) {
            list = list.filter((c) => c.level === levelFilter);
        }

        if (themeFilter) {
            list = list.filter((c) => c.theme === themeFilter);
        }

        return list;
    }, [courses, searchQuery, levelFilter, themeFilter]);


    const getCourseById = useCallback((id) => {
        const numId = typeof id === "string" ? parseInt(id, 10) : id;
        if (Number.isNaN(numId)) return null;
        return courses.find((c) => c.id === numId) ?? null;
    }, [courses]);

    const value = {
        courses,
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
        getCourseById
    }

    return (
        <CoursesContext.Provider value={value}>
            {children}
        </CoursesContext.Provider>
    );
}

export function useCourses() {
    return useContext(CoursesContext);
}