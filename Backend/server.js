const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const WebSocket = require("ws");
const { connectToTikTok } = require("./Services/tiktokservices"); // Import the TikTok service
const restrictedWordRoutes = require("./Services/restrictedWordsService");
const { router: chatCounterRouter } = require("./Services/chatCounterService");



const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use("/restricted-words", restrictedWordRoutes);
app.use("/chat-counter", chatCounterRouter);


// Create HTTP server
const server = app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

// WebSocket setup
const wss = new WebSocket.Server({ server });

// Keep track of active stream connections
const activeConnections = new Map(); // username => ws

wss.on("connection", (ws) => {
    console.log("New WebSocket connection established.");

    ws.on("message", async (message) => {
        try {
            const { username } = JSON.parse(message);

            if (!username) {
                console.warn("No username received in WebSocket message.");
                return;
            }

            console.log(`Attempting to connect to @${username}`);

            // Avoid duplicate connections for same streamer
            if (!activeConnections.has(username)) {
                activeConnections.set(username, ws);
                await connectToTikTok(username, ws);
            } else {
                console.log(`Already connected to @${username}, skipping duplicate connection.`);
            }

        } catch (error) {
            console.error("Failed to process WebSocket message:", error);
        }
    });

    ws.on("close", () => {
        console.log("WebSocket connection closed.");

        // Optionally remove closed connections from the map
        for (const [username, socket] of activeConnections.entries()) {
            if (socket === ws) {
                activeConnections.delete(username);
                console.log(`Removed ${username} from active connections.`);
            }
        }
    });
});

// Test route
app.get("/", (req, res) => {
    res.send("WebSocket Server is running.");
});
