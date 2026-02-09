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

    const fetchCourses = useCallback(async (force = false) =>{
        if(!force && hasFetched && courses.length > 0) return;
        setIsLoading(true);
        setError(null);

        try{
            const data = await getCourses();
            setCourses(data);
            setHasFetched(true);
        } catch (err) {
            setError(err.message || 'Loading Courses Error');
        } finally {
            setIsLoading(false);
        }
    }, [hasFetched, courses.length]);

    const filteredCourses = useMemo(()=>{
        let list = [...courses];
        const q = searchQuery?.trim()?.toLowerCase();
        if(q){
            list = list.filter(
                (c) => c.title?.toLowerCase().includes(q) 
                || c.description?.toLowerCase().includes(q)
                || c.theme?.toLowerCase().includes(q)
            )
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

export function useCourses(){
    return useContext(CoursesContext);
}