const { WebcastPushConnection } = require('tiktok-live-connector'); // Import the TikTok Live Connector

// Function to start the TikTok live connection
const connectToTikTok = (username, ws) => {
    // Create a new WebcastPushConnection instance with the TikTok username
    const tiktokLiveConnection = new WebcastPushConnection(username);

    // Connect to the live stream and handle events
    tiktokLiveConnection.connect()
        .then(state => {
            console.info(`Connected to roomId ${state.roomId}`);
        })
        .catch(err => {
            console.error("Failed to connect", err);
            ws.send(JSON.stringify({ type: "error", message: "Failed to connect to TikTok live stream" }));
        });

    // Listen for chat events
    tiktokLiveConnection.on('chat', data => {
        console.log(`${data.uniqueId} (userId:${data.userId}) writes: ${data.comment}`);
        ws.send(JSON.stringify({ type: "chat", data }));
    });

    // Listen for gift events
    tiktokLiveConnection.on('gift', data => {
        console.log(`${data.uniqueId} (userId:${data.userId}) sends ${data.giftId}`);
        ws.send(JSON.stringify({ type: "gift", data }));
    });
};

// Export the function to use in server.js
module.exports = { connectToTikTok };
