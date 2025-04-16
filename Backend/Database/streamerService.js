const { getStreamerByUsername, createStreamer } = require('../queries/streamer'); 

const addStreamerIfNotExists = async (username) => {
    try {
        return await getStreamerByUsername(username);
    } catch (error) {
        console.warn("Streamer not found, creating new one...");
        try {
            return await createStreamer(username);
        } catch (createError) {
            console.error("Failed to create streamer:", createError);
            return null;
        }
    }
};

module.exports = { addStreamerIfNotExists };
