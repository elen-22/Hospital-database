import express from "express"
import db from "../db.js"

const router = express.Router()

//get all patients

router.get('/', async (req, res) => {
    const query = 'SELECT * FROM patients';
    try {
        const [results] = await db.execute(query);
        res.status(200).json(results);
    } catch (err) {
        console.error(err);
        res.status(500).send('Error fetching patients');
    }
});


//get patient by id

router.get('/:id', async (req, res) => {
    const query = 'SELECT * FROM patients WHERE patient_id = ?';
    try {
        const [results] = await db.execute(query, [req.params.id]);
        if (results.length === 0) {
            return res.status(404).send('Patient not found');
        }
        res.status(200).json(results[0]);
    } catch (err) {
        console.error(err);
        res.status(500).send('Error fetching patient');
    }
});

//create patient

router.post("/", async (req, res) => {
    const { first_name, last_name, date_of_birth, phone } = req.body;
    const query = 'INSERT INTO patients (first_name, last_name, date_of_birth, phone) VALUES (?, ?, ?, ?)';
    try {
        const [result] = await db.execute(query, [first_name, last_name, date_of_birth, phone]);
        res.status(201).json({ message: "Patient created successfully", id: result.insertId });
    } catch (err) {
        console.error(err);
        res.status(500).send('Error creating patient');
    }
});

//update patient by id

router.put('/:id', async (req, res) => {
    const { first_name, last_name, date_of_birth, phone } = req.body;
    const query = `UPDATE patients SET first_name = ?, last_name = ?, date_of_birth = ?, phone = ? WHERE patient_id = ?`;

    try {
        const [result] = await db.execute(query, [first_name, last_name, date_of_birth, phone, req.params.id]);
        if (result.affectedRows === 0) {
            return res.status(404).send('Patient not found');
        }
        res.status(200).send('Patient updated successfully');
    } catch (err) {
        console.error(err);
        res.status(500).send('Error updating patient');
    }
});

//delete patient by id

router.delete('/:id', async (req, res) => {
    const query = 'DELETE FROM patients WHERE patient_id = ?';
    try {
        const [result] = await db.execute(query, [req.params.id]);
        if (result.affectedRows === 0) {
            return res.status(404).send('Patient not found');
        }
        res.status(200).send('Patient deleted successfully');
    } catch (err) {
        console.error(err);
        res.status(500).send('Error deleting patient');
    }
});



export default router;