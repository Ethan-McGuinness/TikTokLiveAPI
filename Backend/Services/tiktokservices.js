const {addStreamerIfNotExists} = require ('../Database/streamerService');
const {addUserIfNotExists} = require ('../Database/userServices');
const { addUserChatMessage } = require('../Database/messageService');

const { WebcastPushConnection } = require("tiktok-live-connector");

const connectToTikTok = (username, ws) => {
    const tiktokLiveConnection = new WebcastPushConnection(username);

    tiktokLiveConnection.connect()
        .then(state => {
            console.info(`[✅] Connected to TikTok Live - Room ID: ${state.roomId}`);
            //addStreamerIfNotExists(username);
        })
        .catch(err => {
            console.error("[❌] Failed to connect:", err);
            ws.send(JSON.stringify({ type: "error", message: "Failed to connect to TikTok live stream" }));
        });

    // Listen for chat events
    tiktokLiveConnection.on("chat", (data) => {
        if (ws.readyState === 1) { // WebSocket OPEN state
            ws.send(JSON.stringify({ type: "chat", data }));
            console.log(`[💬] Chat from @${data.uniqueId}: "${data.comment}"`);
            //addUserIfNotExists(data.uniqueId);
            //addUserChatMessage(data.uniqueId,username,data.comment);
        } else {
            console.warn("[⚠️] WebSocket closed. Chat message not sent.");
        }
    });

    // Listen for gift events
    tiktokLiveConnection.on("gift", (data) => {
        if (ws.readyState === 1) { // WebSocket OPEN state
            ws.send(JSON.stringify({ type: "gift", data }));
            console.log(`[🎁] Gift from @${data.uniqueId} (Gift ID: ${data.giftId})`);
        } else {
            console.warn("[⚠️] WebSocket closed. Gift message not sent.");
        }
    });

    // Listen for Follow events
    tiktokLiveConnection.on("follow", data => {
        if (ws.readyState === 1) {
            ws.send(JSON.stringify({type: "follow", data}));
            console.log(`[➕] @${data.uniqueId} followed the streamer`);
        } else {
            console.warn("Websocket closed. follow message not sent");
        }
    });




};

module.exports = { connectToTikTok };
