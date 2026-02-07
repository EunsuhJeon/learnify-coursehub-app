export default function getCourses() {
    return new Promise((res, rej) => {
        setTimeout(() => {
            const shouldFail = false;

            if (shouldFail) {
                rej({ message: "Failed to fetch courses" });
                return;
            }

            res([
                {
                    id: 1,
                    title: "React Fundamentals",
                    description: "Learn the basics of React, components and hooks.",
                    level: "Beginner",
                    duration: "6h",
                },
                {
                    id: 2,
                    title: "Advanced JavaScript",
                    description: "Deep dive into closures, async/await, and patterns.",
                    level: "Advanced",
                    duration: "8h",
                },
                {
                    id: 3,
                    title: "Web Design Basics",
                    description: "HTML, CSS, and responsive design fundamentals.",
                    level: "Beginner",
                    duration: "5h",
                },
            ]);
        }, 1000);
    });
}