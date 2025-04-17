const { createMessage } = require("../queries/message");
const { getStreamerByUsername } = require('../queries/streamer');
const { getUserByUsername } = require("../queries/user");

const addUserChatMessage = async (User, streamer, content) => {
    try {
        const username = await getUserByUsername(User);
        const StreamerName = await getStreamerByUsername(streamer);

        // Check if user and streamer are found
        if (!username || !StreamerName) {
            console.warn("Could not find the user or streamer to save the chat message");
            return;
        }

        // Ensure that user_id and streamer_id are valid numbers before saving
        const userId = username.user_id;
        const streamerId = StreamerName.streamer_id;

        if (!userId || !streamerId) {
            console.error("Invalid user or streamer ID");
            return;
        }

        // Save the chat message to the database
        await createMessage(userId, streamerId, content);

        console.log("Chat message saved successfully");

    } catch (err) {
        console.error("Error saving chat message:", err);
    }
};

module.exports = { addUserChatMessage };
