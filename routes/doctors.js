import express from 'express';
import db from '../db.js';

const router = express.Router();

//get all doctors

router.get("/",async (req,res)=>{
    const query="SELECT * FROM doctors";
    try{
        const [results]=await db.execute(query)
        res.status(200).json(results)
    }
    catch(err){
        console.error(err)
        res.status(500).send("Error fetching doctors");
    }
});

// //get doctor by id


router.get("/:id", async (req, res) => {
    const query = "SELECT * FROM doctors WHERE doctor_id = ?";
    try {
        const [results] = await db.execute(query, [req.params.id]);
        if (results.length === 0) return res.status(404).send("Doctor not found");
        res.status(200).json(results[0]);
    } catch (err) {
        console.error(err);
        res.status(500).send("Error fetching doctor");
    }
});




// //create doctor

router.post("/", async (req,res)=>{
    const { first_name, last_name, specialty }=req.body;
    const query =`INSERT INTO doctors (first_name, last_name, specialty)
                  VALUES (?, ?, ?)`;
    try {
        const [result] = await db.execute(query, [first_name, last_name, specialty]);
        res.status(201).json({ message: "Doctor created successfully", id: result.insertId });
    } catch (err) {
        console.error(err);
        res.status(500).send("Error creating doctor");
    }
});

// update doctor by id
router.put("/:id", async (req, res) => {
    const { first_name, last_name, specialty } = req.body;
    const query = "UPDATE doctors SET first_name = ?, last_name = ?, specialty = ? WHERE doctor_id = ?";
    try {
        const [result] = await db.execute(query, [first_name, last_name, specialty, req.params.id]);
        if (result.affectedRows === 0) return res.status(404).send("Doctor not found");
        res.status(200).send("Doctor updated successfully");
    } catch (err) {
        console.error(err);
        res.status(500).send("Error updating doctor");
    }
});

//delete doctor by id

router.delete("/:id", async (req, res) => {
    const query = "DELETE FROM doctors WHERE doctor_id = ?";
    try{
        const [result]=await db.execute(query,[req.params.id])
        if (result.affectedRows === 0) return res.status(404).send("Doctor not found");
        res.status(200).send("Doctor deleted successfully");
    }
    catch (err) {
        console.error(err);
        res.status(500).send("Error deleting doctor");
    }
})

export default router;