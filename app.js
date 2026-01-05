import express from "express"
import patientRoutes from './routes/patients.js';
import doctorRoutes from './routes/doctors.js';

const app=express()

app.use(express.json())

app.use("/patients", patientRoutes)
app.use("/doctors", doctorRoutes)

app.listen(3000, () => {
    console.log("Hospital API running on port 3000");
});
