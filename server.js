const express = require('express');
const path = require('path');
const Rollbar = require("rollbar");

let rollbar = new Rollbar({
    accessToken: "ec5c2c5891774868946da8086e39a6c1",
    captureUncaught: true,
    captureUnhandledRejections: true
});

const app = express();

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "/public/index.html"));
    rollbar.info("HTML file served successfully!");
});

const port = process.env.PORT || 4000;

app.listen(port, () => console.log(`Listening on port ${port}`));