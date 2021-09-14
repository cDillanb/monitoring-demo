const express = require('express');
const path = require('path');
const Rollbar = require("rollbar");

let rollbar = new Rollbar({
    accessToken: "ec5c2c5891774868946da8086e39a6c1",
    captureUncaught: true,
    captureUnhandledRejections: true
});

const students = [];
const app = express();

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "/public/index.html"));
    rollbar.info("HTML file served successfully!");
});

app.post("/api/student", (req, res) => {
    let { student } = req.body;
    student = student.trim();
    students.push(student);

    rollbar.log("student added successfully", {author: "Cade", type: "Manual entry"});
    res.status(200).send(students);
});

const port = process.env.PORT || 4000;

app.use(rollbar.errorHandler());

app.listen(port, () => console.log(`Listening on port ${port}`));