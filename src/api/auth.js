import usersSeed from "../data/users.json";

const USERS_STORAGE_KEY = "learnify_users";

function getStoredUsers() {
    try {
        const raw = localStorage.getItem(USERS_STORAGE_KEY);
        if (raw) {
            const parsed = JSON.parse(raw);
            if (Array.isArray(parsed)) return parsed;
        }
    } catch {
    }
    const seed = Array.isArray(usersSeed) ? usersSeed : [];
    localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(seed));
    return seed;
}

function saveUsers(users) {
    localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(users));
}

export function loginRequest(email, password) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const emailTrim = email.trim().toLowerCase();
            const users = getStoredUsers();

            const found = users.find(
                (u) =>
                    u.email?.toLowerCase() === emailTrim &&
                    u.password === password
            );

            if (!found) {
                reject({
                    message: "Invalid email or password",
                    status: 401,
                });
                return;
            }

            resolve({
                token: "fake-jwt-token-123",
                user: {
                    id: found.id,
                    name: `${found.firstName ?? ""} ${found.lastName ?? ""}`.trim() || "User",
                    email: found.email,
                },
            });
        }, 1000);
    });
}

export function registerRequest(firstName, lastName, email, password) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const emailTrim = email.trim().toLowerCase();
            const users = getStoredUsers();

            const exists = users.some(
                (u) => u.email?.toLowerCase() === emailTrim
            );

            if (exists) {
                reject({
                    status: 409,
                    message: "Email is already registered",
                });
                return;
            }

            const nextId =
                users.reduce((max, u) => (u.id > max ? u.id : max), 0) + 1;

            const newUser = {
                id: nextId,
                firstName: firstName.trim(),
                lastName: lastName.trim(),
                email: emailTrim,
                password,
            };

            const updated = [...users, newUser];
            saveUsers(updated);

            resolve({
                token: "fake-jwt-token-register-123",
                user: {
                    id: newUser.id,
                    name: `${newUser.firstName} ${newUser.lastName}`.trim(),
                    email: newUser.email,
                },
            });
        }, 1000);
    });
}
