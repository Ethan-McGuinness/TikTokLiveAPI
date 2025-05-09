const {addStreamerIfNotExists} = require ('../Database/streamerService');
const {addUserIfNotExists} = require ('../Database/userServices');
const { addUserChatMessage } = require('../Database/messageService');
const { checkForRestrictedWord } = require('../Database/wordService');

const {incrementCount} = require('./chatCounterService');
const { incrementCount2 } = require('./followerCounterService');
const { incrementCount3 } = require('./giftCounterService');

const { WebcastPushConnection } = require("tiktok-live-connector");

// Function to connect to TikTok Live and handle events for a given username
const connectToTikTok = (username, ws) => {
    const tiktokLiveConnection = new WebcastPushConnection(username);

    //function to handle connection errors
    tiktokLiveConnection.connect()
        .then(state => {
            console.info(`Connected to TikTok Live - Room ID: ${state.roomId}`);
            //addStreamerIfNotExists(username);
        })
        .catch(err => {
            console.error("Failed to connect:", err);
            ws.send(JSON.stringify({ type: "error", message: "Failed to connect to TikTok live stream" }));
        });


    // Handle chat messages
    tiktokLiveConnection.on("chat", async (data) => {
        if (ws.readyState === 1) {
            incrementCount();

            const hasRestricted = await checkForRestrictedWord(data.comment);
            if (!hasRestricted) {
                ws.send(JSON.stringify({ type: "chat", data }));

                // Remove functions for database operations
                // await addUserIfNotExists(data.uniqueId);
                // await addUserChatMessage(data.uniqueId, username, data.comment);
            }
        }
    });


     // Handle gift events
    tiktokLiveConnection.on("gift", (data) => {
        if (ws.readyState === 1) {
            incrementCount3();
            ws.send(JSON.stringify({ type: "gift", data }));
        }
    });

    // Handle follow events
    tiktokLiveConnection.on("follow", (data) => {
        if (ws.readyState === 1) {
            incrementCount2();
            ws.send(JSON.stringify({ type: "follow", data }));
        }
    });

};

module.exports = { connectToTikTok };
