const STORAGE_KEY = "learnify_enrollments";

function getStoredEnrollments() {
    try {
        return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
    } catch {
        return [];
    }
}

function saveEnrollments(list) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
}

// POST /enrollments
export function enrollInCourse(courseId, userId) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (!courseId || !userId) {
                reject({ message: "Missing course or user" });
                return;
            }

            const enrollments = getStoredEnrollments();

            const alreadyEnrolled = enrollments.find(
                (e) => e.courseId === courseId && e.userId === userId
            );

            if (alreadyEnrolled) {
                reject({ message: "Already enrolled in this course" });
                return;
            }

            const newEnrollment = {
                id: Date.now(),
                courseId,
                userId,
                enrolledAt: new Date().toISOString(),
            };

            enrollments.push(newEnrollment);
            saveEnrollments(enrollments);

            resolve(newEnrollment);
        }, 800);
    });
}

// GET /my-courses
export function getMyEnrollments(userId) {
    return new Promise((resolve) => {
        setTimeout(() => {
            const enrollments = getStoredEnrollments();
            resolve(enrollments.filter((e) => e.userId === userId));
        }, 500);
    });
}
