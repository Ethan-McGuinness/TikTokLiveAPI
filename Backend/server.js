const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const WebSocket = require("ws");

const { connectToTikTok } = require("./Services/tiktokservices");
const restrictedWordRoutes = require("./Services/restrictedWordsService");
const { router: chatCounterRouter } = require("./Services/chatCounterService");
const { router: followerCounterRouter } = require("./Services/followerCounterService");
const { router: giftCounterRouter } = require("./Services/giftCounterService");

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use("/restricted-words", restrictedWordRoutes);
app.use("/chat-counter", chatCounterRouter);
app.use("/follower-counter", followerCounterRouter);
app.use("/gift-counter", giftCounterRouter);

// Create HTTP server
const server = app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

// WebSocket setup
const wss = new WebSocket.Server({ server });

// Track active stream connections
const activeConnections = new Map(); // username => ws

wss.on("connection", (ws) => {
    ws.on("message", async (message) => {
        try {
            const { username } = JSON.parse(message);

            if (!username) return;

            if (!activeConnections.has(username)) {
                activeConnections.set(username, ws);
                await connectToTikTok(username, ws);
            }

        } catch (error) {
            // Silently fail on malformed messages or connection errors
        }
    });

    ws.on("close", () => {
        for (const [username, socket] of activeConnections.entries()) {
            if (socket === ws) {
                activeConnections.delete(username);
            }
        }
    });
});

// Test route
app.get("/", (req, res) => {
    res.send("WebSocket Server is running.");
});
