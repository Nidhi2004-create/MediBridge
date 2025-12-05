const BASE_URL = "http://localhost:5001";

document.getElementById("doctorForm").addEventListener("submit", async (e) => {
    e.preventDefault();

    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    try {
        const res = await fetch(`${BASE_URL}/api/auth/doctor-login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username, password })
        });

        const data = await res.json();

        if (data.success) {
            window.location.href = "doctor-dashboard.html";
        } else {
            alert("Invalid credentials");
        }

    } catch (err) {
        alert("Server error. Backend not reachable.");
    }
});