const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "M@ni$hKum4r!2024#",
    database: "notesdb"
});

db.connect(err => {
    if (err) throw err;
    console.log("MySQL Connected...");
});

app.get("/notes", (req, res) => {
    db.query("SELECT * FROM notes", (err, results) => {
        if (err) throw err;
        res.json(results);
    });
});

app.post("/notes", (req, res) => {
    const { title, content } = req.body;
    const sql = "INSERT INTO notes (title, content) VALUES (?, ?)";
    db.query(sql, [title, content], (err, result) => {
        if (err) throw err;
        res.json({ message: "Note added successfully!" });
    });
});

app.delete("/notes/:id", (req, res) => {
    const { id } = req.params;
    const sql = "DELETE FROM notes WHERE id = ?";
    db.query(sql, [id], (err, result) => {
        if (err) throw err;
        res.json({ message: "Note deleted successfully!" });
    });
});

app.put("/notes/:id", (req, res) => {
    const { id } = req.params;
    const { title, content } = req.body;
    const sql = "UPDATE notes SET title = ?, content = ? WHERE id = ?";
    db.query(sql, [title, content, id], (err, result) => {
        if (err) throw err;
        res.json({ message: "Note updated successfully!" });
    });
});

app.listen(5000, () => {
    console.log("Server started on http://localhost:5000");
});
