const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const WebSocket = require("ws");
const { connectToTikTok } = require("./Services/tiktokservices"); // Import the TikTok service

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

    // When a message is received (username), attempt to connect to TikTok live
    ws.on("message", async (message) => {
        const { username } = JSON.parse(message);
        if (username) {
            console.log(`Attempting to connect to @${username}`);
            connectToTikTok(username, ws); // Call the function from tiktokservices.js
        }
    });

    // WebSocket connection close
    ws.on("close", () => {
        console.log("WebSocket connection closed.");
    });
});

// Test route to check if server is working
app.get("/", (req, res) => {
    res.send("WebSocket Server is running.");
});
