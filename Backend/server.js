const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const WebSocket = require("ws");

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Create HTTP server
const server = app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

// WebSocket setup
const wss = new WebSocket.Server({ server });

wss.on("connection", (ws) => {
    console.log("New WebSocket connection established.");

    ws.send(JSON.stringify({ message: "Connected to WebSocket server!" }));

    ws.on("message", (data) => {
        console.log("Received from client:", data.toString());
    });

    ws.on("close", () => {
        console.log("WebSocket connection closed.");
    });
});

// Test route
app.get("/", (req, res) => {
    res.send("WebSocket Server is running.");
});
