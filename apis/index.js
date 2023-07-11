require("dotenv").config({ path: ".env" });
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");4

const { connection } = require("./database/database");

const app = express();

app.use(bodyParser.json());

app.use(cors());

const studentRoutes = require("./routes/student.Routes")
const otherRoutes = require("./routes/other.Routes")


// Routes
app.use("/api/students", studentRoutes);
app.use("/api", otherRoutes);



app.listen(process.env.PORT, () => {
	console.log(`Server is running on port ${process.env.PORT}`);
});



