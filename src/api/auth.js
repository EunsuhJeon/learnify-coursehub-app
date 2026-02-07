export function loginRequest(email, password) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            // Fake credentials. Just to test the login
            if (email === "test@test.com" && password === "123456") {
                resolve({
                    token: "fake-jwt-token-123",
                    user: {
                        id: 1,
                        name: "Test User",
                        email: email,
                    },
                });
            } else {
                reject({
                    message: "Invalid email or password",
                });
            }
        }, 1000);
    });
}
