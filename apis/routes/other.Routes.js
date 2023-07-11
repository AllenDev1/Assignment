const express = require("express");
const router = express.Router();
const connection = require("../database/database");

// Student login
router.post("/login", (req, res) => {
	const { username, password } = req.body;
	connection.query(
		"SELECT * FROM Students WHERE username = ? AND password = ?",
		[username, password],
		(error, results) => {
			if (error) {
				console.error("Error logging in student:", error);
				res.status(500).json({
					message: "Error logging in student",
					error: error,
				});
				throw error;
			}
			if (results.length === 0) {
				res.status(401).json({
					message: "Invalid username or password",
				});
			} else {
				res.status(200).json(results[0]);
			}
		}
	);
});

//add assignment
router.post("/assignments", (req, res) => {
	const { title, detail, due_date } = req.body;
	connection.query(
		"INSERT INTO Assignments (title, detail, due_date) VALUES (?, ?, ?)",
		[title, detail, due_date],
		(error, results) => {
			if (error) {
				console.error("Error creating assignment:", error);
				res.status(500).json({
					message: "Error creating assignment",
					error: error,
				});
				throw error;
			}
			return res.status(200).json(results);
		}
	);
});

// List assignments
router.get("/assignments", (req, res) => {
	connection.query("SELECT * FROM Assignments", (error, results) => {
		if (error) {
			console.error("Error getting assignments:", error);
			res.status(500).json({
				message: "Error getting assignments",
				error: error,
			});
			throw error;
		}
		results = {
			message: "Assignments retrieved successfully",
			results: results,
		};

		return res.status(200).json(results);
	});
});

// Submit assignment
router.post("/assignments/submissions", (req, res) => {
	const { assignment_id, user_id, file } = req.body;
	connection.query(
		"INSERT INTO Submissions (assignment_id, user_id, file) VALUES (?, ?, ?)",
		[assignment_id, user_id, file],
		(error, results) => {
			if (error) {
				console.error("Error submitting assignment:", error);
				res.status(500).json({
					message: "Error submitting assignment",
					error: error,
				});
				throw error;
			}
			results = {
				message: "Assignment submitted successfully",
				results: results,
			};
			return res.status(200).json(results);
		}
	);
});

// Remove submission
router.delete("/submissions/:assignment_id/:user_id", (req, res) => {
	const { assignment_id, user_id } = req.params;
	connection.query(
		"DELETE FROM Submissions WHERE assignment_id = ? AND user_id = ?",
		[assignment_id, user_id],
		(error, results) => {
			if (error) {
				console.error("Error removing submission:", error);
				res.status(500).json({
					message: "Error removing submission",
					error: error,
				});
				throw error;
			}
			results = {
				message: "Submission removed successfully",
				results: results,
			};
			return res.status(200).json(results);
		}
	);
});

router.get("/assignments/submissions/check/", (req, res) => {
	const { assignment_id, user_id } = req.query;
	connection.query(
		"SELECT * FROM Submissions WHERE assignment_id = ? AND user_id = ?",
		[assignment_id, user_id],
		(error, results) => {
			if (error) {
				console.error("Error checking submission:", error);
				res.status(500).json({
					message: "Error checking submission",
					error: error,
				});
				throw error;
			}
			if (results.length === 0) {
				res.status(200).json(false);
			} else {
				res.status(200).json(true);
			}
		}
	);
});

// list of assignments submitted by a particular student
router.get("/assignments/submited/", (req, res) => {
	const { user_id } = req.query;
	connection.query(
		"SELECT * FROM Submissions WHERE user_id = ?",
		[user_id],
		(error, results) => {
			if (error) {
				console.error("Error getting submissions:", error);
				res.status(500).json({
					message: "Error getting submissions",
					error: error,
				});
				throw error;
			}
			results = {
				message: "Submissions retrieved successfully",
				results: results,
			};

			return res.status(200).json(results);
		}
	);
});

module.exports = router;
