const BASE_URL = "http://localhost:5001";

const passwordToggle = document.getElementById("togglePass");
if (passwordToggle) {
    passwordToggle.addEventListener("click", () => {
        const passwordField = document.getElementById("password");
        if (passwordField.type === "password") {
            passwordField.type = "text";
            passwordToggle.textContent = "Hide";
        } else {
            passwordField.type = "password";
            passwordToggle.textContent = "Show";
        }
    });
}

document.getElementById("doctorForm").addEventListener("submit", async (e) => {
    e.preventDefault();

    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value;

    if (!username || !password) {
        alert("Please enter both username and password.");
        return;
    }

    try {
        const res = await fetch(`${BASE_URL}/api/auth/doctor-login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username, password })
        });

        const data = await res.json();
        if (data.success) {
            localStorage.setItem("doctorId", data.doctorId);
            localStorage.setItem("doctorName", data.doctorName);
            localStorage.setItem("doctorSpecialty", data.doctorSpecialty || "General Physician");
            window.location.href = "doctor-dashboard.html";
        } else {
            alert(data.message || "Invalid credentials");
        }
    } catch (err) {
        console.error(err);
        alert("Server error. Backend not reachable.");
    }
});
