document.addEventListener("DOMContentLoaded", () => {
    // --- BYPASS AUTH CHECK ---
    // We assume the user is logged in for the demo
    console.log("Demo Mode: Loaded Static Dashboard");

    setupNavigation();
    loadAppointments();
    loadPatients();
    loadOnlinePatients();
});

// --- 1. DUMMY DATA (Hardcoded for Demo) ---

let appointmentsData = {
    today: [
        { id: 1, name: "Rahul Verma", issue: "Fever & Cold", time: "10:00 AM" },
        { id: 2, name: "Anita Roy", issue: "Dental Checkup", time: "11:30 AM" }
    ],
    upcoming: [
        { id: 3, name: "Suresh Singh", issue: "Back Pain", time: "Tomorrow, 9:00 AM" }
    ],
    requested: [
        { id: 101, name: "Vikram Das", issue: "General Consultation", time: "Pending" },
        { id: 105, name: "Riya Kapoor", issue: "Skin Rash", time: "Pending" } 
    ]
};

const patientDatabase = [
    { id: 1, name: "Rahul Verma", age: 34, gender: "Male", history: ["Hypertension"], prescriptions: ["prescription-1.jpg"] },
    { id: 2, name: "Anita Roy", age: 28, gender: "Female", history: ["Dental Cavity"], prescriptions: [] },
    { id: 3, name: "Suresh Singh", age: 45, gender: "Male", history: ["Chronic Back Pain", "Diabetes"], prescriptions: ["xray-back.jpg"] },
    { id: 4, name: "Vikram Das", age: 50, gender: "Male", history: [], prescriptions: [] }
];

const onlinePatientsData = [
    { name: "Sonia Mehra", issue: "Follow-up: Skin Rash", time: "Waiting for 5 mins", status: "Online" },
    { name: "Rohan Das", issue: "Report Review", time: "Just Joined", status: "Online" }
];


// --- 2. RENDERING LOGIC (Visuals Only) ---

function loadAppointments() {
    renderList("today-list", appointmentsData.today, "today");
    renderList("upcoming-list", appointmentsData.upcoming, "upcoming");
    renderRequestedList("requested-list", appointmentsData.requested);
}

function renderList(elementId, data, type) {
    const list = document.getElementById(elementId);
    if (!list) return;
    list.innerHTML = "";
    if (data.length === 0) {
        list.innerHTML = "<p style='color:#888; font-style:italic;'>No appointments.</p>";
        return;
    }
    data.forEach(appt => {
        const card = document.createElement("div");
        card.className = `appt-card ${type}`;
        card.innerHTML = `
            <div class="appt-left"><div>${appt.name}</div><span>${appt.issue}</span></div>
            <div class="appt-right"><div>${appt.time}</div></div>
        `;
        list.appendChild(card);
    });
}

function renderRequestedList(elementId, data) {
    const list = document.getElementById(elementId);
    if (!list) return;
    list.innerHTML = "";
    if (data.length === 0) {
        list.innerHTML = "<p style='color:#888; font-style:italic;'>No requests.</p>";
        return;
    }
    data.forEach(appt => {
        const card = document.createElement("div");
        card.className = `appt-card requested`;
        card.innerHTML = `
            <div class="appt-left">
                <div style="cursor:pointer; color:#2563eb; font-weight:600;" onclick="openModalByName('${appt.name}')">${appt.name}</div>
                <span>${appt.issue}</span>
            </div>
            <div class="appt-right">
                <div>${appt.time}</div>
                <div class="appt-actions">
                    <button class="btn-action btn-accept" onclick="acceptAppt(${appt.id})">Accept</button>
                    <button class="btn-action btn-reject" onclick="rejectAppt(${appt.id})">Reject</button>
                </div>
            </div>
        `;
        list.appendChild(card);
    });
}

// --- 3. INTERACTION LOGIC (Visual Updates Only) ---

function acceptAppt(id) {
    const index = appointmentsData.requested.findIndex(a => a.id === id);
    if (index !== -1) {
        const item = appointmentsData.requested.splice(index, 1)[0];
        item.time = "Confirmed";
        appointmentsData.upcoming.push(item);
        loadAppointments(); // Refresh Screen
        alert("Appointment Accepted (Demo Mode)");
    }
}

function rejectAppt(id) {
    const index = appointmentsData.requested.findIndex(a => a.id === id);
    if (index !== -1) {
        appointmentsData.requested.splice(index, 1);
        loadAppointments(); // Refresh Screen
    }
}

function loadPatients() {
    const grid = document.getElementById("patients-grid");
    if (!grid) return;
    grid.innerHTML = "";
    patientDatabase.forEach(patient => {
        const card = document.createElement("div");
        card.className = "patient-card-simple";
        card.onclick = () => openModal(patient);
        
        const initials = patient.name.split(" ").map(n => n[0]).join("");
        const condition = patient.history.length > 0 ? patient.history[0] : "Healthy";

        card.innerHTML = `
            <div class="patient-avatar">${initials}</div>
            <div class="p-name">${patient.name}</div>
            <div class="p-info">${patient.gender}, ${patient.age} yrs</div>
            <div class="p-info" style="color:#666; margin-top:5px;">${condition}</div>
        `;
        grid.appendChild(card);
    });
}

function filterPatients() {
    const query = document.getElementById("patient-search").value.toLowerCase();
    const cards = document.querySelectorAll(".patient-card-simple");
    cards.forEach(card => {
        const name = card.querySelector(".p-name").innerText.toLowerCase();
        card.style.display = name.includes(query) ? "block" : "none";
    });
}

function loadOnlinePatients() {
    const list = document.getElementById("online-list");
    if (!list) return;
    list.innerHTML = "";
    onlinePatientsData.forEach(p => {
        const card = document.createElement("div");
        card.className = "appt-card online-card"; 
        card.innerHTML = `
            <div class="appt-left">
                <div>${p.name}</div>
                <span>${p.issue}</span>
                <div class="status-live"><span class="dot"></span> ${p.status}</div>
            </div>
            <div class="appt-right">
                <div style="margin-bottom:10px; color:#666; font-size:13px;">${p.time}</div>
                <button class="btn-video" onclick="alert('Starting Video Call...')">📹 Join Call</button>
            </div>
        `;
        list.appendChild(card);
    });
}

// --- 4. MODAL & NAVIGATION ---

function setupNavigation() {
    const links = {
        appointments: document.getElementById("nav-appointments"),
        patients: document.getElementById("nav-patients"),
        online: document.getElementById("nav-online"),
        messages: document.getElementById("nav-messages"),
        reports: document.getElementById("nav-reports"),
        settings: document.getElementById("nav-settings"),
        logout: document.getElementById("nav-logout")
    };

    const views = {
        appointments: document.getElementById("view-appointments"),
        patients: document.getElementById("view-patients"),
        online: document.getElementById("view-online"),
        messages: document.getElementById("view-messages"),
        reports: document.getElementById("view-reports"),
        settings: document.getElementById("view-settings")
    };

    function switchView(viewName) {
        Object.values(views).forEach(el => { if(el) el.style.display = "none"; });
        Object.values(links).forEach(el => { if(el) el.classList.remove("active"); });
        if (views[viewName]) views[viewName].style.display = "block";
        if (links[viewName]) links[viewName].classList.add("active");
    }

    links.appointments.onclick = () => switchView('appointments');
    links.patients.onclick = () => switchView('patients');
    links.online.onclick = () => switchView('online');
    links.messages.onclick = () => switchView('messages');
    links.reports.onclick = () => switchView('reports');
    links.settings.onclick = () => switchView('settings');

    links.logout.onclick = () => {
        if(confirm("Logout?")) window.location.href = "doctor-login.html";
    };
}

function openModalByName(name) {
    const patient = patientDatabase.find(p => p.name === name);
    if(patient) openModal(patient);
}

function openModal(patient) {
    const modal = document.getElementById("patientModal");
    document.getElementById("modal-name").innerText = patient.name;
    document.getElementById("modal-age").innerText = patient.age;
    document.getElementById("modal-gender").innerText = patient.gender;

    const historyList = document.getElementById("modal-history");
    historyList.innerHTML = patient.history.length ? patient.history.map(h => `<li>${h}</li>`).join("") : "<li>No history recorded</li>";

    const rxList = document.getElementById("modal-prescriptions");
    rxList.innerHTML = patient.prescriptions.length ? patient.prescriptions.map(p => `<li>📄 ${p}</li>`).join("") : "<li>No prescriptions</li>";

    modal.style.display = "block";
}

function closeModal() {
    document.getElementById("patientModal").style.display = "none";
}

window.onclick = function(e) {
    if (e.target == document.getElementById("patientModal")) closeModal();
}

function sendDoctorMessage() {
    const input = document.getElementById("msg-input");
    if(input.value.trim() !== "") {
        const chatBox = document.getElementById("chat-box");
        chatBox.innerHTML += `<div class="message msg-sent"><strong>Me:</strong> ${input.value}</div>`;
        input.value = "";
    }
}