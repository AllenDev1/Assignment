const express = require("express");
const router = express.Router();

const connection = require("../database/database");

// Get all students
router.get("/", (req, res) => {
	connection.query("SELECT * FROM Students", (error, results) => {
		if (error) {
			console.error("Error getting students:", error);
			res.status;
			res.status(500).json({
				message: "Error getting students",
				error: error,
			});
			throw error;
		}
		res.status(200).json(results);
	});
});

// Get a single student
router.get("/:id", (req, res) => {
	connection.query(
		"SELECT * FROM Students WHERE id = ?",
		[req.params.id],
		(error, results) => {
			if (error) {
				console.error("Error getting student:", error);
				res.status(500).json({
					message: "Error getting student",
					error: error,
				});
				throw error;
			}
			res.status(200).json(results);
		}
	);
});

// Create a student
router.post("/", (req, res) => {
	connection.query(
		"INSERT INTO Students (username, password) VALUES (?, ?)",
		[req.body.username, req.body.password],
		(error, results) => {
			if (error) {
				console.error("Error creating student:", error);
				res.status(500).json({
					message: "Error creating student",
					error: error,
				});
				throw error;
			}
			return res.status(200).json(results);
		}
	);
});

// Update a student
router.put("/:id", (req, res) => {
	connection.query(
		"UPDATE Students SET username = ?, password = ? WHERE id = ?",
		[req.body.username, req.body.password, req.params.id],
		(error, results) => {
			if (error) {
				console.error("Error updating student:", error);
				res.status(500).json({
					message: "Error updating student",
					error: error,
				});
				throw error;
			}
			res.status(200).json(results);
		}
	);
});

// Delete a student
router.delete("/:id", (req, res) => {
	connection.query(
		"DELETE FROM Students WHERE id = ?",
		[req.params.id],
		(error, results) => {
			if (error) {
				console.error("Error deleting student:", error);
				res.status(500).json({
					message: "Error deleting student",
					error: error,
				});
				throw error;
			}
			res.status(200).json(results);
		}
	);
});

module.exports = router;
