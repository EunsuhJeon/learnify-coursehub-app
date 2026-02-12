import baseCourses from "../data/courses.json";
import REVIEW_TEMPLATES from "../data/reviews.json";
import LEARNING_OUTCOMES_BY_THEME from "../data/learningOutcomes.json";
import INSTRUCTORS from "../data/instructors.json"; 


export default function getCourses() {
    return new Promise((res, rej) => {
        setTimeout(() => {
            const shouldFail = false;

            if (shouldFail) {
                rej({ message: "Failed to fetch courses" });
                return;
            }

            

            const getInstructorById = (instructorId) =>
                INSTRUCTORS.find((instr) => instr.id === instructorId) ?? INSTRUCTORS[0];

            const courses = baseCourses.map((c, i) => {
                const instructor = getInstructorById(c.instructorId);
                const themeOutcomes = LEARNING_OUTCOMES_BY_THEME[c.theme] || LEARNING_OUTCOMES_BY_THEME.Tech;
                const reviewCount = 5000 + (i * 423) % 15000;
                const enrolledCount = 10000 + (i * 1200) % 200000;
                const rating = 4.2 + (i % 7) * 0.1;

                return {
                    ...c,
                    instructorName: instructor.name,
                    rating: Math.round(rating * 10) / 10,
                    reviewCount,
                    enrolledCount,
                    aboutCourse: c.description + " In this course you will get hands-on practice, follow along with projects, and build a solid foundation that you can use in your own work.",
                    learningOutcomes: themeOutcomes.slice(0, 6),
                    instructor: { ...instructor },
                    reviews: REVIEW_TEMPLATES.map((r) => ({ ...r })),
                    price: i % 5 === 0 ? "Free" : 49.99,
                    priceNote: i % 5 === 0 ? "Limited time offer" : null,
                    language: "English",
                    certification: true,
                    previewVideoUrl: null,
                };
            });

            res(courses);
        }, 1000);
    });
}