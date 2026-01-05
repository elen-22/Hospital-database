# 🏥 Hospital Management System

## 📌 Overview
A mini project demonstrating the full workflow from **idea → database design → API → automated tests** using a hospital domain.

---

## 🛠 Tech Stack
- **Database:** MySQL  
- **Backend:** Node.js, Express.js (ES Modules)  
- **Testing:** Postman  

---

## 🗂 Database Entities
- **Patient** – Stores personal and contact information.
- **Doctor** – Stores doctor details and specialty.
- **MedicalRecord** – Contains patient medical history.
- **Appointment** – Links patients and doctors.
- **Treatment** – Records procedures or diagnoses.
- **Medicine** – Stores medicine information.
- **Treatment_Medicine** – Manages treatment–medicine relationships.

---

## 🔗 API Endpoints
CRUD operations implemented for:
- **Patients** (`/patients`)
- **Doctors** (`/doctors`)

---

## 🧪 Automated Tests
Postman tests cover:
- Status codes
- Required field validation
- Happy path scenarios
- Negative cases (not found, invalid data)
- Read-after-delete checks

---

## ▶️ Run the Project
```bash
npm install
node app.js
```

## Server runs at:

http://localhost:3000
