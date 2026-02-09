const INSTRUCTORS = [
    { id: 0, name: "Dr. Sarah Johnson", title: "Full-Stack Developer & Tech Educator", studentsCount: 524891, coursesCount: 12, instructorRating: 4.9, bio: "Dr. Sarah Johnson is a passionate educator with over 15 years of experience in web development and computer science. She has worked with major tech companies and has taught over 500,000 students worldwide." },
    { id: 1, name: "Alex Chen", title: "Senior Software Engineer & Instructor", studentsCount: 312000, coursesCount: 8, instructorRating: 4.8, bio: "Alex has built production systems at scale and loves teaching practical skills. Focus on clean code and real-world projects." },
    { id: 2, name: "Maria Garcia", title: "Data Scientist & ML Educator", studentsCount: 198000, coursesCount: 6, instructorRating: 4.9, bio: "Maria specializes in data analysis and machine learning. Former research lead with a passion for making complex topics accessible." },
    { id: 3, name: "James Wilson", title: "Design Lead & UX Instructor", studentsCount: 156000, coursesCount: 5, instructorRating: 4.7, bio: "James has led design teams at startups and enterprises. Expert in UI/UX, design systems, and user research." },
];

const REVIEW_TEMPLATES = [
    { authorName: "Emily Chen", date: "2 weeks ago", rating: 5, text: "This course completely changed my approach. The content is well-structured and the instructor explains complex concepts clearly. Highly recommend!" },
    { authorName: "Michael Rodriguez", date: "1 month ago", rating: 5, text: "Best investment in my education. Practical projects and relevant to real-world scenarios. The community is incredibly supportive." },
    { authorName: "Jessica Thompson", date: "3 weeks ago", rating: 4, text: "Great course overall! Very comprehensive. My only suggestion would be to include more advanced topics, but that's minor." },
];

const LEARNING_OUTCOMES_BY_THEME = {
    Tech: [
        "Build and deploy modern applications with industry-standard tools",
        "Apply best practices for code quality and maintainability",
        "Understand core concepts and architecture patterns",
        "Work with version control and collaboration workflows",
        "Debug and optimize performance effectively",
    ],
    Design: [
        "Create user-centered interfaces and prototypes",
        "Apply design systems and consistency across products",
        "Conduct basic user research and iterate on feedback",
        "Use design tools for collaboration and handoff",
        "Implement accessible and inclusive design principles",
    ],
    Data: [
        "Analyze and visualize data with confidence",
        "Apply statistical and ML concepts to real datasets",
        "Work with databases and query languages",
        "Interpret results and communicate insights",
        "Automate data pipelines and workflows",
    ],
    Business: [
        "Make data-driven decisions and measure outcomes",
        "Communicate effectively with stakeholders",
        "Apply frameworks for strategy and operations",
        "Manage projects and priorities in agile environments",
        "Scale processes and teams sustainably",
    ],
    Marketing: [
        "Run and measure campaigns across channels",
        "Create content and funnels that convert",
        "Use analytics and attribution effectively",
        "Optimize for SEO and growth loops",
        "Build and nurture audiences",
    ],
    Product: [
        "Validate ideas with users and data",
        "Run workshops and design sprints",
        "Define roadmaps and prioritize features",
        "Collaborate across design, engineering, and business",
        "Ship and iterate based on feedback",
    ],
};

export default function getCourses() {
    return new Promise((res, rej) => {
        setTimeout(() => {
            const shouldFail = false;

            if (shouldFail) {
                rej({ message: "Failed to fetch courses" });
                return;
            }

            const baseCourses = [
                    { id: 1, title: "React Fundamentals", description: "Learn the basics of React, components and hooks.", level: "Beginner", duration: "6h", theme: "Tech", instructorId: 0 },
                    { id: 2, title: "Advanced JavaScript", description: "Deep dive into closures, async/await, and patterns.", level: "Advanced", duration: "8h", theme: "Tech", instructorId: 1 },
                    { id: 3, title: "Web Design Basics", description: "HTML, CSS, and responsive design fundamentals.", level: "Beginner", duration: "5h", theme: "Design", instructorId: 3 },
                    { id: 4, title: "Node.js Essentials", description: "Build backend services with Express and Node.js.", level: "Beginner", duration: "7h", theme: "Tech", instructorId: 0 },
                    { id: 5, title: "TypeScript in Practice", description: "Strong typing, interfaces, and real-world TS projects.", level: "Intermediate", duration: "6h", theme: "Tech", instructorId: 1 },
                    { id: 6, title: "Python for Data Analysis", description: "Analyze datasets using Pandas and NumPy.", level: "Beginner", duration: "9h", theme: "Data", instructorId: 2 },
                    { id: 7, title: "UI/UX Design Principles", description: "Design usable and beautiful digital experiences.", level: "Beginner", duration: "4h", theme: "Design", instructorId: 3 },
                    { id: 8, title: "Docker & Containers", description: "Package and deploy apps using Docker.", level: "Intermediate", duration: "5h", theme: "Tech", instructorId: 1 },
                    { id: 9, title: "REST APIs with Express", description: "Create scalable RESTful APIs from scratch.", level: "Intermediate", duration: "6h", theme: "Tech", instructorId: 1 },
                    { id: 10, title: "AWS Cloud Foundations", description: "Understand core AWS services and architecture.", level: "Beginner", duration: "7h", theme: "Tech", instructorId: 0 },
                    { id: 11, title: "Next.js for Production", description: "Build fast React apps with SSR and routing.", level: "Advanced", duration: "6h", theme: "Tech", instructorId: 1 },
                    { id: 12, title: "SQL for Developers", description: "Master queries, joins, and indexes.", level: "Beginner", duration: "5h", theme: "Data", instructorId: 2 },
                    { id: 13, title: "GraphQL Essentials", description: "Flexible APIs with Apollo and GraphQL.", level: "Intermediate", duration: "4h", theme: "Tech", instructorId: 1 },
                    { id: 14, title: "Cybersecurity Basics", description: "Protect systems and networks from attacks.", level: "Beginner", duration: "6h", theme: "Tech", instructorId: 0 },
                    { id: 15, title: "Machine Learning Intro", description: "Supervised models and evaluation techniques.", level: "Intermediate", duration: "8h", theme: "Data", instructorId: 2 },
                    { id: 16, title: "Kubernetes Fundamentals", description: "Container orchestration and scaling.", level: "Advanced", duration: "7h", theme: "Tech", instructorId: 1 },
                    { id: 17, title: "Mobile Apps with React Native", description: "Build cross-platform apps for iOS and Android.", level: "Intermediate", duration: "6h", theme: "Tech", instructorId: 1 },
                    { id: 18, title: "DevOps Foundations", description: "CI/CD pipelines and automation workflows.", level: "Beginner", duration: "5h", theme: "Tech", instructorId: 0 },
                    { id: 19, title: "Figma for Designers", description: "Prototyping and collaboration for UI teams.", level: "Beginner", duration: "3h", theme: "Design", instructorId: 3 },
                    { id: 20, title: "Clean Code Practices", description: "Write maintainable and readable software.", level: "Intermediate", duration: "4h", theme: "Tech", instructorId: 1 },
                    { id: 21, title: "Blockchain Fundamentals", description: "Distributed ledgers and smart contracts.", level: "Beginner", duration: "6h", theme: "Tech", instructorId: 1 },
                    { id: 22, title: "C# for Web Development", description: "Build web apps using ASP.NET Core.", level: "Intermediate", duration: "7h", theme: "Tech", instructorId: 1 },
                    { id: 23, title: "iOS Development with Swift", description: "Create native apps for Apple devices.", level: "Advanced", duration: "9h", theme: "Tech", instructorId: 1 },
                    { id: 24, title: "Android with Kotlin", description: "Modern Android app development techniques.", level: "Intermediate", duration: "8h", theme: "Tech", instructorId: 1 },
                    { id: 25, title: "Power BI Analytics", description: "Build dashboards and business insights.", level: "Beginner", duration: "5h", theme: "Business", instructorId: 0 },
                    { id: 26, title: "Excel for Professionals", description: "Advanced formulas, pivot tables and automation.", level: "Beginner", duration: "4h", theme: "Business", instructorId: 0 },
                    { id: 27, title: "NoSQL with MongoDB", description: "Document databases and schema design.", level: "Intermediate", duration: "6h", theme: "Data", instructorId: 2 },
                    { id: 28, title: "Linux Command Line", description: "Shell scripting and system navigation.", level: "Beginner", duration: "3h", theme: "Tech", instructorId: 0 },
                    { id: 29, title: "Ethical Hacking Intro", description: "Pen testing concepts and methodologies.", level: "Advanced", duration: "7h", theme: "Tech", instructorId: 1 },
                    { id: 30, title: "Data Visualization with D3", description: "Create interactive charts for the web.", level: "Advanced", duration: "6h", theme: "Data", instructorId: 2 },
                    { id: 31, title: "Project Management Agile", description: "Scrum, Kanban and delivery strategies.", level: "Beginner", duration: "4h", theme: "Business", instructorId: 0 },
                    { id: 32, title: "Product Design Sprint", description: "Validate ideas quickly using workshops.", level: "Intermediate", duration: "5h", theme: "Product", instructorId: 3 },
                    { id: 33, title: "SEO Fundamentals", description: "Optimize websites for search engines.", level: "Beginner", duration: "3h", theme: "Marketing", instructorId: 3 },
                    { id: 34, title: "Marketing Analytics", description: "Track campaigns and ROI with data.", level: "Intermediate", duration: "4h", theme: "Marketing", instructorId: 3 },
                    { id: 35, title: "Game Development Basics", description: "Core loops and engines for indie games.", level: "Beginner", duration: "6h", theme: "Tech", instructorId: 0 },
                    { id: 36, title: "Unity for Developers", description: "3D game creation with Unity engine.", level: "Advanced", duration: "9h", theme: "Tech", instructorId: 1 },
                    { id: 37, title: "AI Prompt Engineering", description: "Craft better prompts for large language models.", level: "Beginner", duration: "2h", theme: "Tech", instructorId: 0 },
                    { id: 38, title: "Natural Language Processing", description: "Text analysis and transformers basics.", level: "Advanced", duration: "8h", theme: "Data", instructorId: 2 },
                    { id: 39, title: "Big Data with Spark", description: "Distributed processing and analytics.", level: "Advanced", duration: "7h", theme: "Data", instructorId: 2 },
                    { id: 40, title: "Web Accessibility", description: "Build inclusive apps following WCAG.", level: "Beginner", duration: "3h", theme: "Design", instructorId: 3 },
                    { id: 41, title: "Go for Backend Services", description: "Fast APIs using Go and microservices.", level: "Intermediate", duration: "6h", theme: "Tech", instructorId: 1 },
                    { id: 42, title: "Rust Fundamentals", description: "Memory-safe systems programming.", level: "Advanced", duration: "7h", theme: "Tech", instructorId: 1 },
                    { id: 43, title: "Digital Marketing Foundations", description: "Learn core concepts of online advertising, funnels and growth.", level: "Beginner", duration: "4h", theme: "Marketing", instructorId: 3 },
                    { id: 44, title: "Content Strategy & Branding", description: "Create content plans and brand voice for social platforms.", level: "Intermediate", duration: "5h", theme: "Marketing", instructorId: 3 },
                    { id: 45, title: "Paid Ads Mastery", description: "Run high-converting campaigns on Google and Meta platforms.", level: "Advanced", duration: "6h", theme: "Marketing", instructorId: 3 },
                    { id: 46, title: "Email Marketing Automation", description: "Build sequences and funnels with automation tools.", level: "Intermediate", duration: "4h", theme: "Marketing", instructorId: 3 },
                    { id: 47, title: "Social Media Growth Playbook", description: "Grow audiences and engagement organically.", level: "Beginner", duration: "3h", theme: "Marketing", instructorId: 3 },
                    { id: 48, title: "Startup Fundamentals", description: "Validate ideas, build MVPs and launch products.", level: "Beginner", duration: "5h", theme: "Business", instructorId: 0 },
                    { id: 49, title: "Business Strategy Essentials", description: "Competitive analysis and market positioning.", level: "Intermediate", duration: "6h", theme: "Business", instructorId: 0 },
                    { id: 50, title: "Finance for Entrepreneurs", description: "Cash flow, pricing models and budgeting basics.", level: "Intermediate", duration: "5h", theme: "Business", instructorId: 0 },
                    { id: 51, title: "Leadership & Team Management", description: "Build strong teams and effective communication.", level: "Beginner", duration: "4h", theme: "Business", instructorId: 0 },
                    { id: 52, title: "Operations & Scaling", description: "Systems, processes and growth frameworks.", level: "Advanced", duration: "6h", theme: "Business", instructorId: 0 },
                ];

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