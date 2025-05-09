const { createMessage } = require("../queries/message");
const { getStreamerByUsername } = require('../queries/streamer');
const { getUserByUsername } = require("../queries/user");

//function to add chat message to the database
const addUserChatMessage = async (User, streamer, content) => {
    try {

        //fetch the user and streamer from the database
        const username = await getUserByUsername(User);
        const StreamerName = await getStreamerByUsername(streamer);

        //check if the user and streamer exist
        if (!username || !StreamerName) {
            console.warn("Could not find the user or streamer to save the chat message");
            return;
        }

        //fetch the user and streamer IDs
        const userId = username.user_id;
        const streamerId = StreamerName.streamer_id;

        //check if the user id and streamer id were fetched successfully
        if (!userId || !streamerId) {
            console.error("Invalid user or streamer ID");
            return;
        }

       //create the message in the database
        await createMessage(userId, streamerId, content);
    

    } catch (err) {
        console.error("Error saving chat message:", err);
    }
};

module.exports = { addUserChatMessage };
