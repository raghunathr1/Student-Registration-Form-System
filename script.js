// Student Registration Form System 

// Form elements
const form = document.getElementById("studentForm");
const nameInput = document.getElementById("name");
const idInput = document.getElementById("studentId");
const emailInput = document.getElementById("email");
const contactInput = document.getElementById("contact");
const submitBtn = document.getElementById("submitBtn");

// Table body
const tableBody = document.getElementById("tableBody");
const tableContainer = document.querySelector(".table-container");

// Data & edit tracker
let students = [];
let editIndex = -1;

// Load data when page loads

window.addEventListener("DOMContentLoaded", () => {
    const storedData = localStorage.getItem("students");
    if (storedData) {
        students = JSON.parse(storedData);
        displayStudents();
    }
});

// Form Submit

form.addEventListener("submit", function (e) {
    e.preventDefault();

    const name = nameInput.value.trim();
    const studentId = idInput.value.trim();
    const email = emailInput.value.trim();
    const contact = contactInput.value.trim();

    if (!validateInputs(name, studentId, email, contact)) return;

    const student = { name, studentId, email, contact };

    if (editIndex === -1) {
        students.push(student);
    } else {
        students[editIndex] = student;
        editIndex = -1;
        submitBtn.innerText = "Add Student";
    }

    localStorage.setItem("students", JSON.stringify(students));
    displayStudents();
    form.reset();
});

// Validation

function validateInputs(name, studentId, email, contact) {
    const nameRegex = /^[A-Za-z\s]+$/;
    const numberRegex = /^[0-9]+$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!name || !studentId || !email || !contact) {
        alert("All fields are required!");
        return false;
    }

    if (!nameRegex.test(name)) {
        alert("Student name must contain only letters.");
        return false;
    }

    if (!numberRegex.test(studentId)) {
        alert("Student ID must contain only numbers.");
        return false;
    }

    if (!emailRegex.test(email)) {
        alert("Enter a valid email address.");
        return false;
    }

    if (!numberRegex.test(contact) || contact.length < 10) {
        alert("Contact number must be at least 10 digits.");
        return false;
    }

    return true;
}

// Display Students

function displayStudents() {
    tableBody.innerHTML = "";

    students.forEach((student, index) => {
        const row = document.createElement("tr");

        row.innerHTML = `
            <td>${student.name}</td>
            <td>${student.studentId}</td>
            <td>${student.email}</td>
            <td>${student.contact}</td>
            <td>
                <button class="action-btn edit-btn" onclick="editStudent(${index})">Edit</button>
                <button class="action-btn delete-btn" onclick="deleteStudent(${index})">Delete</button>
            </td>
        `;

        tableBody.appendChild(row);
    });

    // Dynamic vertical scrollbar
     if (students.length > 3) {
        tableContainer.style.maxHeight = "300px";
        tableContainer.style.overflowY = "auto";
    } else {
        tableContainer.style.maxHeight = "auto";
        tableContainer.style.overflowY = "hidden";
    }
}

// Edit Student

function editStudent(index) {
    const student = students[index];

    nameInput.value = student.name;
    idInput.value = student.studentId;
    emailInput.value = student.email;
    contactInput.value = student.contact;

    editIndex = index;
    submitBtn.innerText = "Update Student";
}

// Delete Student

function deleteStudent(index) {
    if (confirm("Are you sure you want to delete this record?")) {
        students.splice(index, 1);
        localStorage.setItem("students", JSON.stringify(students));
        displayStudents();
    }
}

